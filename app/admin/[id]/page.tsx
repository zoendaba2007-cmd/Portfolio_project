import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Container from "@/components/Container";
import ProjectForm from "@/components/ProjectForm";
import { isAdminEmail } from "@/lib/admin";
import type { Project } from "@/lib/projects";
import { createClient } from "@/lib/supabase/server";
import { updateProject } from "../actions";

export const metadata: Metadata = {
  title: "Edit project",
  robots: { index: false },
};

export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) redirect("/login");

  const { data } = await supabase
    .from("projects")
    .select("id,title,summary,live_url,repo_url,image_url,sort_order")
    .eq("id", id)
    .single();
  if (!data) notFound();

  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl font-semibold text-ink">Edit project</h1>
      <div className="mt-8">
        <ProjectForm action={updateProject} submitLabel="Save changes" project={data as Project} />
      </div>
    </Container>
  );
}