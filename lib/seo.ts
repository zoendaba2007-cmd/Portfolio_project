import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      type: "website",
      images: [{ url: "/og", width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
    },
  };
}