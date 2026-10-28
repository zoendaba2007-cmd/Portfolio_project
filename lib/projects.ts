import { createClient } from "@/lib/supabase/server";

export type Project = {
  id: string;
  title: string;
  summary: string;
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  sort_order: number;
};

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,summary,live_url,repo_url,image_url,sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load projects:", error.message);
    return [];
  }
  return data ?? [];
}