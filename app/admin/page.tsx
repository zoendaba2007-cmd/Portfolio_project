import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import ProjectForm from "@/components/ProjectForm";
import { getProjects } from "@/lib/projects";
import { isAdminEmail } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";
import { createProject, deleteProject } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false },
};

export default async function Admin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) redirect("/login");

  const projects = await getProjects();

  return (
    <Container className="py-16">
      <Eyebrow>Admin</Eyebrow>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
        Manage projects
      </h1>
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <p className="text-sm text-muted">Signed in as {user.email}</p>
        <form action={logout}>
          <button type="submit" className="min-h-11 text-sm font-semibold text-primary underline">
            Sign out
          </button>
        </form>
      </div>

      <ul className="mt-8 divide-y divide-line rounded-lg border border-line bg-white">
        {projects.length === 0 && (
          <li className="p-4 text-sm text-muted">No projects yet. Add one below.</li>
        )}
        {projects.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <span className="font-semibold text-ink">
              {p.title} <span className="font-mono text-xs text-muted">#{p.sort_order}</span>
            </span>
            <span className="flex items-center gap-4">
              <Link href={`/admin/${p.id}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline">
                Edit
              </Link>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" aria-label={`Delete ${p.title}`} className="min-h-11 text-sm font-semibold text-primary underline">
                  Delete
                </button>
              </form>
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-2xl font-semibold text-ink">
        Add a project
      </h2>
      <div className="mt-4">
        <ProjectForm action={createProject} submitLabel="Add project" />
      </div>
    </Container>
  );
}