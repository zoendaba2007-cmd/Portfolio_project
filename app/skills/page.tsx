import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { skillGroups } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Skills",
  description: "Skills I can back with a project, a commit or a deployed page.",
};

export default function Skills() {
  const link =
    "inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary underline";

  return (
    <Container className="py-16">
      <Eyebrow>Skills /skills</Eyebrow>
      <h1 className="mt-3 font-display text-5xl font-semibold text-ink">Skills</h1>
      <p className="mt-4 max-w-xl text-muted">
        Every skill here links to something you can open and check.
      </p>

      {skillGroups.map((group) => (
        <section key={group.title} className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">{group.title}</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {group.skills.map((skill) => (
              <li key={skill.name} className="rounded-lg border border-line bg-white p-5">
                <h3 className="font-semibold text-ink">{skill.name}</h3>
                <ul className="mt-2">
                  {skill.evidence.map((e) => (
                    <li key={e.href}>
                      {e.href.startsWith("/") ? (
                        <Link href={e.href} className={link}>{e.label} →</Link>
                      ) : (
                        <a href={e.href} target="_blank" rel="noopener noreferrer" className={link}>
                          {e.label} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}