import { site } from "./site";

export type Project = {
  title: string;
  status: string;
  description: string;
  tags: string[];
  repoUrl: string;
  repoLabel: string;
};

export const projects: Project[] = ["A", "B", "C", "D"].map((letter) => ({
  title: `Project ${letter}`,
  status: "Placeholder",
  description:
    "Describe the problem, what you built, and the outcome in two short sentences.",
  tags: ["Tech 1", "Tech 2", "Tech 3"],
  repoUrl: site.github,
  repoLabel: `${site.githubLabel}/project-${letter.toLowerCase()}`,
}));