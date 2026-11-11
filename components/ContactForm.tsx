"use client";

import { useActionState } from "react";
import { sendMessage } from "@/app/contact/actions";
import type { ContactState } from "@/lib/contact";
import { site } from "@/lib/site";

const field =
  "mt-1 block min-h-11 w-full rounded-md border border-muted bg-white px-3 text-ink placeholder:text-muted";

const initial: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-line bg-white p-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Thank you!
        </h2>
        <p className="mt-2 text-muted">
          Your message has been sent. I will get back to you soon.
        </p>
      </div>
    );
  }

  const v = state.values;

  return (
    <form
      action={action}
      className="rounded-lg border border-line bg-white p-4 sm:p-6"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Send a message
        </h2>
        <span className="font-mono text-xs text-muted">* required</span>
      </div>

      {/* Honeypot: hidden from people and screen readers, bots fill it in */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Company (leave this empty)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">Name *</label>
          <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" defaultValue={v?.name} placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">Email *</label>
          <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" defaultValue={v?.email} placeholder="Your email address" className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="text-sm font-semibold">Subject</label>
        <input id="subject" name="subject" type="text" maxLength={150} defaultValue={v?.subject} placeholder="What would you like to discuss?" className={field} />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-semibold">Message *</label>
        <textarea id="message" name="message" required rows={5} maxLength={5000} defaultValue={v?.message} placeholder="Tell me about your role or opportunity..." className={`${field} py-2`} />
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-5 rounded-md border border-primary bg-tint p-3 text-sm font-semibold text-ink">
          {state.error}{" "}
          <a href={`mailto:${site.email}`} className="text-primary underline">
            Email me instead
          </a>
        </p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-ink disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}