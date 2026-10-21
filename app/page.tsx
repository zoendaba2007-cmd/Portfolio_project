import ButtonLink from "@/components/ButtonLink";
import Container from "@/components/Container";
import CTABand from "@/components/CTABand";
import Eyebrow from "@/components/Eyebrow";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl font-semibold leading-tight text-ink">
            Hello, I’m {site.name}.
          </h1>
          <p className="mt-4 text-lg font-semibold text-ink">{site.tagline}</p>
          <p className="mt-3 max-w-md text-muted">
            [Introduce your focus, the kinds of problems you enjoy solving, and
            what you bring to a team. Keep this to two or three short
            sentences.]
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects">View projects</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact me
            </ButtonLink>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="flex aspect-square max-w-sm items-center justify-center rounded-2xl bg-gradient-to-br from-amethyst/30 to-tint font-mono text-xs text-muted"
        >
          [Image]
        </div>
      </Container>

      <section className="border-y border-line bg-tint">
        <Container className="py-12">
          <Eyebrow>Key achievements</Eyebrow>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {["Milestone", "Impact"].map((label) => (
              <article
                key={label}
                className="rounded-lg border border-line bg-white p-5"
              >
                <h2 className="font-display text-2xl font-semibold text-ink">
                  [{label}]
                </h2>
                <h3 className="mt-2 text-sm font-semibold text-ink">
                  [Achievement headline]
                </h3>
                <p className="mt-1 text-sm text-muted">
                  [Highlight a meaningful launch, award, or contribution.]
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <Eyebrow>Selected work</Eyebrow>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold text-ink">
            Featured projects
          </h2>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Container>

      <CTABand
        heading="Let’s start a conversation."
        text="[Add a short invitation for relevant roles or collaborations.]"
        label="Get in touch"
        href="/contact"
      />
    </>
  );
}
