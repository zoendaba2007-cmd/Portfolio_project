import type { Metadata } from "next";
import Container from "@/components/Container";
import ButtonLink from "@/components/ButtonLink";
import Eyebrow from "@/components/Eyebrow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: who I am and the role I'm looking for.`,
};

const about = {
  intro: "I am a crictical thinker and problem solver, who loves to research and learn about globel issues. ",
  role: "I would like to become a junior developer and work on projects that have a positive impact on society.",
  background:
    "I always wanted to be in the medical field but as I grew older, I realized that I wanted to apply my critical thinking skills to build something tangible. This year I pivoted and joined a 1 year programming course to exlore what life could look like in the tech industry and I have been pleasently surprised by.",
  now: "I am currently doing CSS50 Cybersecurity course. ",
};

const learned = ["HTML and CSS", "JavaScript", "Python", "Databases", "React", "Next.js"];

export default function About() {
  return (
    <Container className="max-w-3xl py-16">
      <Eyebrow>About /about</Eyebrow>
      <h1 className="mt-3 font-display text-5xl font-semibold text-ink">About me</h1>
      <p className="mt-6 text-xl text-ink">{about.intro}</p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">The role I want</h2>
        <p className="mt-3 text-muted">{about.role}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">My background</h2>
        <p className="mt-3 text-muted">{about.background}</p>
        <p className="mt-3 text-muted">I have learned:</p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-muted">
          {learned.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">Right now</h2>
        <p className="mt-3 text-muted">{about.now}</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/projects">See my work</ButtonLink>
        <ButtonLink href="/contact" variant="outline">Contact me</ButtonLink>
      </div>
    </Container>
  );
}