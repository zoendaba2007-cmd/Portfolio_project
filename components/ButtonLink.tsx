import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
}: Props) {
  const styles =
    variant === "primary"
      ? "bg-primary text-white hover:bg-ink"
      : "border border-primary bg-white text-primary hover:bg-tint";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors ${styles}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}