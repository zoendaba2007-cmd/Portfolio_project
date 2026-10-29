"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdminEmail } from "@/lib/admin";
import { createClient } from "@/lib/supabase/client";
import { site } from "@/lib/site";
import Container from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setIsAuthenticated(isAdminEmail(session?.user.email));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [pathname]);

  const visibleLinks = isAuthenticated
    ? [...links, { href: "/admin", label: "Admin" }]
    : links;

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
      <Container>
        <nav
          aria-label="Main"
          className="flex items-center justify-between py-2"
        >
          <Link href="/" className="flex min-h-11 items-center gap-3">
            <span
              aria-hidden="true"
              className="h-5 w-5 rounded-sm border-2 border-primary"
            />
            <span className="font-bold text-ink">{site.name}</span>
            <span className="hidden font-mono text-xs uppercase tracking-widest text-muted sm:inline">
              / Portfolio
            </span>
          </Link>
          <ul className="flex gap-1">
            {visibleLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center px-3 text-sm font-semibold transition-colors hover:text-primary ${
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