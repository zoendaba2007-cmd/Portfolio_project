"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import Container from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
      <Container>
        <nav
          aria-label="Main"
          className="flex items-center justify-between py-2"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <Link href="/" className="flex min-h-11 items-center gap-3">
            <span aria-hidden="true" className="h-5 w-5 rounded-sm border-2 border-primary" />
            <span className="font-bold text-ink">{site.name}</span>
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-line px-3 text-sm font-semibold text-ink md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>

          <ul
            id="nav-menu"
            className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col border-b border-line bg-white p-4 md:static md:flex md:flex-row md:gap-1 md:border-0 md:p-0`}
          >
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`inline-flex min-h-11 w-full items-center px-3 text-sm font-semibold transition-colors hover:text-primary ${
                      active
                        ? "text-primary underline decoration-2 underline-offset-8"
                        : "text-ink"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}