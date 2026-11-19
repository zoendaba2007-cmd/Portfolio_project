import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Container from "@/components/Container";
import ProjectForm from "@/components/ProjectForm";
import { isAdminEmail } from "@/lib/admin";
import { pageMeta } from "@/lib/seo";
import { PROJECT_COLUMNS, type Project } from "@/lib/projects";
import { createClient } from "@/lib/supabase/server";
import { updateProject } from "../actions";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    ...pageMeta({
      title: "Edit project",
      description:
        "Only the admin user can gain access to the project editing interface.",
      path: `/admin/${id}`,
    }),
    robots: { index: false },
  };
}

export default async function EditProject({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) redirect("/login");

  const { data } = await supabase
    .from("projects")
    .select(PROJECT_COLUMNS)
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