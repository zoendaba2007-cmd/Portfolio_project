import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import Eyebrow from "@/components/Eyebrow";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <Container className="py-16">
      <Eyebrow>Contact /contact</Eyebrow>
      <h1 className="mt-3 font-display text-5xl font-semibold text-ink">
        Let’s talk.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        [Add a short welcome for potential collaborators and employers. Mention
        the opportunities you would like to hear about.]
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.6fr]">
        <div>
          <Eyebrow>Find me here</Eyebrow>
          <dl className="mt-4 space-y-6">
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                Email
              </dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center text-lg font-semibold text-primary underline"
                >
                  {site.email} <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                GitHub
              </dt>
              <dd>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-lg font-semibold text-primary underline"
                >
                  {site.githubLabel} <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-8 rounded-lg border border-line bg-tint p-5">
            <h2 className="font-display text-lg font-semibold text-ink">
              A good place to start
            </h2>
            <p className="mt-2 text-sm text-muted">
              Share a little about yourself, the opportunity or idea, and what
              you’d like to work on together.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}