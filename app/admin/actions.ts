"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

function text(fd: FormData, key: string) {
  return String(fd.get(key) ?? "").trim();
}

function url(fd: FormData, key: string) {
  const value = text(fd, key);
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) {
    throw new Error(`${key} must start with http:// or https://`);
  }
  return value;
}

function lines(fd: FormData, key: string) {
  return text(fd, key)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function list(fd: FormData, key: string) {
  return text(fd, key)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fields(fd: FormData) {
  const title = text(fd, "title");
  const summary = text(fd, "summary");
  if (!title || !summary) throw new Error("Title and summary are required.");

  const screenshots = lines(fd, "screenshots");
  for (const line of screenshots) {
    const src = line.split("|")[0].trim();
    if (!/^(https?:\/\/|\/)/i.test(src)) {
      throw new Error("Each screenshot must start with / or http(s)://");
    }
  }

  return {
    title,
    summary,
    slug: slugify(text(fd, "slug") || title),
    problem: text(fd, "problem") || null,
    role: text(fd, "role") || null,
    stack: list(fd, "stack"),
    next_steps: text(fd, "next_steps") || null,
    live_url: url(fd, "live_url"),
    repo_url: url(fd, "repo_url"),
    video_url: url(fd, "video_url"),
    image_url: text(fd, "image_url") || null,
    screenshots,
    is_capstone: fd.get("is_capstone") === "on",
    sort_order: Number.parseInt(text(fd, "sort_order"), 10) || 0,
  };
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) redirect("/login");
  return supabase;
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function createProject(fd: FormData) {
  const supabase = await requireUser();
  const { error } = await supabase.from("projects").insert(fields(fd));
  if (error) throw new Error(error.message);
  refresh();
  redirect("/admin");
}

export async function updateProject(fd: FormData) {
  const supabase = await requireUser();
  const { data, error } = await supabase
    .from("projects")
    .update(fields(fd))
    .eq("id", text(fd, "id"))
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Nothing was updated.");
  refresh();
  redirect("/admin");
}

export async function deleteProject(fd: FormData) {
  const supabase = await requireUser();
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", text(fd, "id"))
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Nothing was deleted.");
  refresh();
  redirect("/admin");
}

export async function deleteMessage(fd: FormData) {
  const supabase = await requireUser();
  const { data, error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", text(fd, "id"))
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Nothing was deleted.");
  revalidatePath("/admin");
}