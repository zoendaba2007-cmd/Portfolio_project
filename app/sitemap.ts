import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { site } from "@/lib/site";

export const revalidate = 3600;

const pages = ["", "/about", "/projects", "/skills", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = pages.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );
    const { data } = await supabase.from("projects").select("slug").not("slug", "is", null);
    for (const p of data ?? []) {
      entries.push({ url: `${site.url}/projects/${p.slug}`, lastModified: new Date() });
    }
  } catch (e) {
    console.error("Sitemap could not load projects:", e);
  }

  return entries;
}