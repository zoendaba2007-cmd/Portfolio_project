import type { Metadata } from "next";
import Container from "@/components/Container";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

const field =
  "mt-1 block min-h-11 w-full rounded-md border border-muted bg-white px-3 text-ink";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <Container className="max-w-md py-16">
      <h1 className="font-display text-4xl font-semibold text-ink">Sign in</h1>
      <form
        action={login}
        className="mt-8 space-y-5 rounded-lg border border-line bg-white p-6"
      >
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className={field} />
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-primary">
            Sign in failed. Check your email and password.
          </p>
        )}
        <button
          type="submit"
          className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-white hover:bg-ink"
        >
          Sign in
        </button>
      </form>
    </Container>
  );
}