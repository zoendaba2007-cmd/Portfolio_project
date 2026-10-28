import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-white">
      {project.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image_url}
          alt={`Screenshot of ${project.title}`}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-44 items-center justify-center bg-gradient-to-br from-amethyst/25 to-tint font-mono text-xs text-muted"
        >
          [No image yet]
        </div>
      )}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-ink">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{project.summary}</p>
        {(project.live_url || project.repo_url) && (
          <div className="mt-5 flex flex-wrap gap-5 border-t border-line pt-4">
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
        )}
      </div>
    </article>
  );
}