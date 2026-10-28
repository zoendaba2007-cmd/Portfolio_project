import Container from "@/components/Container";
import CTABand from "@/components/CTABand";
import Eyebrow from "@/components/Eyebrow";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <>
      <Container className="py-16">
        <h1 className="mt-3 font-display text-5xl font-semibold text-ink">
          Projects
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          [Introduce the work you want to be known for, your areas of focus,
          and the approach you bring to each project.]
        </p>

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

        <p className="mt-8 rounded-md border border-line bg-tint p-4 text-sm text-muted">
          <span className="font-mono text-xs uppercase tracking-widest">
            Code links:{" "}
          </span>
          Replace each repository URL with the project’s source code link. Use
          the cards to describe your own contribution and the technology used.
        </p>
      </Container>

      <CTABand
        heading="Have something in mind?"
        text="[Invite visitors to discuss a role, project, or collaboration.]"
        label="Contact me"
        href="/contact"
      />
    </>
  );
}