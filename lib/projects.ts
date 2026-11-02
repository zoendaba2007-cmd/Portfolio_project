import { createClient } from "@/lib/supabase/server";

export type Project = {
  id: string;
  slug: string | null;
  title: string;
  summary: string;
  problem: string | null;
  role: string | null;
  stack: string[];
  next_steps: string | null;
  live_url: string | null;
  repo_url: string | null;
  video_url: string | null;
  image_url: string | null;
  screenshots: string[];
  is_capstone: boolean;
  sort_order: number;
};

export const PROJECT_COLUMNS =
  "id,slug,title,summary,problem,role,stack,next_steps,live_url,repo_url,video_url,image_url,screenshots,is_capstone,sort_order";

export type Screenshot = { src: string; alt: string };

// Stored as "path-or-url | alt text", one per entry
export function parseScreenshot(line: string, title: string): Screenshot {
  const [src, ...rest] = line.split("|");
  const alt = rest.join("|").trim();
  return { src: src.trim(), alt: alt || `Screenshot of ${title}` };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_COLUMNS)
    .order("is_capstone", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load projects:", error.message);
    return [];
  }
  return (data ?? []) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Could not load project:", error.message);
    return null;
  }
  return data as Project | null;
}
