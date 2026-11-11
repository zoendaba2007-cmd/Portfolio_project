import { site } from "@/lib/site";

type Props = {
  variant?: "button" | "text";
};

export default function CvLink({ variant = "button" }: Props) {
  const styles =
    variant === "button"
      ? "rounded-md border border-primary bg-white px-5 text-primary hover:bg-tint"
      : "text-primary underline";

  return (
    <a
      href={site.cvPath}
      download
      className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors ${styles}`}
    >
      Download CV (PDF)
    </a>
  );
}