import Link from "next/link";
import { site } from "@/lib/site";
import Container from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-bold text-ink">{site.name}</p>
            <p className="text-sm text-muted">{site.role}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="space-y-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-ink hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="space-y-1 sm:text-right">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline"
              >
                {site.githubLabel}
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-8 border-t border-line pt-6 font-mono text-xs text-muted">
          © 2026 {site.name}
        </p>
      </Container>
    </footer>
  );
}