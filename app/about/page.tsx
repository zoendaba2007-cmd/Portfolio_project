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
  intro: "WRITE: who you are in one or two sentences.",
  role: "WRITE: the exact role you want, and what kind of team or product.",
  background: "WRITE: how you got here: what you studied, built or achieved so far.",
  now: "WRITE: what you're working on or learning at the moment.",
};

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