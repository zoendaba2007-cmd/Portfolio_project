import type { Project } from "@/lib/projects";

const field =
  "mt-1 block min-h-11 w-full rounded-md border border-muted bg-white px-3 text-ink";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  project?: Project;
};

export default function ProjectForm({ action, submitLabel, project }: Props) {
  return (
    <form
      action={action}
      className="space-y-5 rounded-lg border border-line bg-white p-6"
    >
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="text-sm font-semibold">Title *</label>
          <input id="title" name="title" required defaultValue={project?.title} className={field} />
        </div>
        <div>
          <label htmlFor="slug" className="text-sm font-semibold">Slug (URL name)</label>
          <input id="slug" name="slug" defaultValue={project?.slug ?? ""} placeholder="made from the title if empty" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className="text-sm font-semibold">Summary * (shown on the card)</label>
        <textarea id="summary" name="summary" required rows={3} defaultValue={project?.summary} className={`${field} py-2`} />
      </div>
      <div>
        <label htmlFor="problem" className="text-sm font-semibold">The problem</label>
        <textarea id="problem" name="problem" rows={4} defaultValue={project?.problem ?? ""} className={`${field} py-2`} />
      </div>
      <div>
        <label htmlFor="role" className="text-sm font-semibold">My role</label>
        <textarea id="role" name="role" rows={3} defaultValue={project?.role ?? ""} className={`${field} py-2`} />
      </div>
      <div>
        <label htmlFor="stack" className="text-sm font-semibold">Stack (comma separated)</label>
        <input id="stack" name="stack" defaultValue={project?.stack?.join(", ") ?? ""} className={field} />
      </div>
      <div>
        <label htmlFor="next_steps" className="text-sm font-semibold">What I would do next</label>
        <textarea id="next_steps" name="next_steps" rows={3} defaultValue={project?.next_steps ?? ""} className={`${field} py-2`} />
      </div>
      <div>
        <label htmlFor="screenshots" className="text-sm font-semibold">
          Screenshots (one per line: /screenshots/file.png | alt text)
        </label>
        <textarea id="screenshots" name="screenshots" rows={4} defaultValue={project?.screenshots?.join("\n") ?? ""} className={`${field} py-2 font-mono text-sm`} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="image_url" className="text-sm font-semibold">Card image (path or URL)</label>
          <input id="image_url" name="image_url" defaultValue={project?.image_url ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="video_url" className="text-sm font-semibold">Video URL</label>
          <input id="video_url" name="video_url" type="url" defaultValue={project?.video_url ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="live_url" className="text-sm font-semibold">Live URL</label>
          <input id="live_url" name="live_url" type="url" defaultValue={project?.live_url ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="repo_url" className="text-sm font-semibold">Repository URL (public repos only)</label>
          <input id="repo_url" name="repo_url" type="url" defaultValue={project?.repo_url ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="sort_order" className="text-sm font-semibold">Order (lowest first)</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} className={field} />
        </div>
        <div className="flex items-end">
          <label className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold">
            <input type="checkbox" name="is_capstone" defaultChecked={project?.is_capstone} className="h-5 w-5" />
            This is my capstone
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-white hover:bg-ink"
      >
        {submitLabel}
      </button>
    </form>
  );
}