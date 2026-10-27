"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

function fields(fd: FormData) {
  const title = text(fd, "title");
  const summary = text(fd, "summary");
  if (!title || !summary) throw new Error("Title and summary are required.");
  return {
    title,
    summary,
    live_url: url(fd, "live_url"),
    repo_url: url(fd, "repo_url"),
    image_url: url(fd, "image_url"),
    sort_order: Number.parseInt(text(fd, "sort_order"), 10) || 0,
  };
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
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