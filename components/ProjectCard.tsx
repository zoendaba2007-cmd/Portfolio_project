import Link from "next/link";
import { parseScreenshot, type Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const thumb =
    project.image_url ||
    (project.screenshots[0]
      ? parseScreenshot(project.screenshots[0], project.title).src
      : null);

  return (
    <article className="overflow-hidden rounded-lg border border-line bg-white">
      {thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-video items-center justify-center bg-gradient-to-br from-amethyst/25 to-tint font-mono text-xs text-muted"
        >
          [No image yet]
        </div>
      )}
      <div className="p-5">
        {project.is_capstone && (
          <p className="mb-2 inline-block rounded bg-amber px-2 py-0.5 font-mono text-xs font-medium text-ink">
            Capstone
          </p>
        )}
        <h3 className="font-display text-xl font-semibold text-ink">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-5 border-t border-line pt-4">
          {project.slug && (
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`Read the case study for ${project.title}`}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline"
            >
              Case study →
            </Link>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live site for ${project.title}`}
              className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary underline"
            >
              Live site <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${project.title}`}
              className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary underline"
            >
              View code <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}