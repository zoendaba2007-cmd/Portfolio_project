import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-white">
      <div
        aria-hidden="true"
        className="flex h-44 items-center justify-center bg-gradient-to-br from-amethyst/25 to-tint font-mono text-xs text-muted"
      >
        [Project screenshot / preview]
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-ink">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-muted">{project.status}</span>
        </div>
        <p className="mt-2 text-sm text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-line px-2 py-0.5 font-mono text-xs text-ink"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View code for ${project.title}`}
            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary underline"
          >
            View code <span aria-hidden="true">↗</span>
          </a>
          <span className="font-mono text-xs text-muted">
            {project.repoLabel}
          </span>
        </div>
      </div>
    </article>
  );
}