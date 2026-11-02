import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { getProjectBySlug, parseScreenshot } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 whitespace-pre-line text-muted">
        {children}
      </div>
    </section>
  );
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const shots = project.screenshots.map((s) =>
    parseScreenshot(s, project.title),
  );
  const link =
    "inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary underline";

  return (
    <Container className="max-w-3xl py-16">
      <Link href="/projects" className={link}>
        ← All projects
      </Link>
      <div className="mt-6">
        <Eyebrow>{project.is_capstone ? "Capstone case study" : "Case study"}</Eyebrow>
        <h1 className="mt-3 font-display text-5xl font-semibold text-ink">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-5">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className={link}>
              Live site <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className={link}>
              Repository <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.video_url && (
            <a href={project.video_url} target="_blank" rel="noopener noreferrer" className={link}>
              Video <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>

      {project.problem && (
        <Section title="The problem">
          <p>{project.problem}</p>
        </Section>
      )}
      {project.role && (
        <Section title="My role">
          <p>{project.role}</p>
        </Section>
      )}
      {project.stack.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded border border-line bg-white px-3 py-1 font-mono text-sm text-ink">
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}
      {shots.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">Screenshots</h2>
          <div className="mt-4 space-y-6">
            {shots.map((shot) => (
              <figure key={shot.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="w-full rounded-lg border border-line"
                />
              </figure>
            ))}
          </div>
        </section>
      )}
      {project.next_steps && (
        <Section title="What I would do next">
          <p>{project.next_steps}</p>
        </Section>
      )}
    </Container>
  );
}