export type Evidence = { label: string; href: string };

export type Skill = {
  name: string;
  evidence: [Evidence, ...Evidence[]]; // at least one link is required
};

export type SkillGroup = { title: string; skills: Skill[] };

const repo = "https://github.com/zoendaba2007-cmd/Portfolio_project";

export const skillGroups: SkillGroup[] = [
  {
    title: "Front end",
    skills: [
      {
        name: "Next.js (App Router) and TypeScript",
        evidence: [{ label: "App routes in this site", href: `${repo}/tree/main/app` }],
      },
      {
        name: "Tailwind CSS",
        evidence: [{ label: "Theme tokens", href: `${repo}/blob/main/app/globals.css` }],
      },
    ],
  },
  {
    title: "Back end and data",
    skills: [
      {
        name: "Supabase Row Level Security",
        evidence: [{ label: "Owner-only policies", href: `${repo}/blob/main/supabase/schema.sql` }],
      },
      {
        name: "Supabase Auth",
        evidence: [{ label: "Protected admin proxy", href: `${repo}/blob/main/proxy.ts` }],
      },
    ],
  },
  {
    title: "Tools",
    skills: [
      {
        name: "Deploying on Vercel",
        evidence: [{ label: "This live site", href: "https://portfolio-project-self-eight.vercel.app" }],
      },
    ],
  },
];