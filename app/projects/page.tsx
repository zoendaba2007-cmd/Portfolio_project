import { Suspense } from "react";
import Container from "@/components/Container";
import CTABand from "@/components/CTABand";
import Eyebrow from "@/components/Eyebrow";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

async function ProjectIndex() {
  const projects = await getProjects();

  return (
    <>
      <div className="mt-10 flex items-center justify-between border-t border-line pt-4">
        <Eyebrow>Project index</Eyebrow>
        <Eyebrow>{String(projects.length).padStart(2, "0")} projects</Eyebrow>
      </div>

      {projects.length === 0 ? (
        <p className="mt-6 text-muted">Projects are coming soon.</p>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </>
  );
}

export default function Projects() {
  return (
    <>
      <Container className="py-16">
        <h1 className="mt-3 font-display text-5xl font-semibold text-ink">
          Projects
        </h1>

        <Suspense
          fallback={<p className="mt-10 text-sm text-muted">Loading projects…</p>}
        >
          <ProjectIndex />
        </Suspense>


      </Container>
      <CTABand
        heading="Have something in mind?"
        text="Let's connect and discuss new ideas, potential collaborations, or any questions you may have."
        label="Contact me"
        href="/contact"
      />
    </>
  );
}