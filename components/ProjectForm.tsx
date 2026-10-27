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

      <div>
        <label htmlFor="title" className="text-sm font-semibold">Title *</label>
        <input id="title" name="title" required defaultValue={project?.title} className={field} />
      </div>
      <div>
        <label htmlFor="summary" className="text-sm font-semibold">Summary *</label>
        <textarea id="summary" name="summary" required rows={4} defaultValue={project?.summary} className={`${field} py-2`} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="live_url" className="text-sm font-semibold">Live URL</label>
          <input id="live_url" name="live_url" type="url" defaultValue={project?.live_url ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="repo_url" className="text-sm font-semibold">Repository URL</label>
          <input id="repo_url" name="repo_url" type="url" defaultValue={project?.repo_url ?? ""} className={field} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="image_url" className="text-sm font-semibold">Image URL</label>
          <input id="image_url" name="image_url" type="url" defaultValue={project?.image_url ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="sort_order" className="text-sm font-semibold">Order (lowest first)</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} className={field} />
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