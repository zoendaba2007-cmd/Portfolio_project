import ButtonLink from "./ButtonLink";
import Container from "./Container";

type Props = {
  heading: string;
  text: string;
  label: string;
  href: string;
};

export default function CTABand({ heading, text, label, href }: Props) {
  return (
    <section className="border-y border-line bg-tint">
      <Container className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold text-ink">
            {heading}
          </h2>
          <p className="mt-2 text-muted">{text}</p>
        </div>
        <ButtonLink href={href} variant="outline">
          {label}
        </ButtonLink>
      </Container>
    </section>
  );
}