"use client";

import { useState } from "react";

const field =
  "mt-1 block min-h-11 w-full rounded-md border border-muted bg-white px-3 text-ink placeholder:text-muted";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-lg border border-line bg-white p-6"
    >
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Send a message
        </h2>
        <span className="font-mono text-xs text-muted">* required</span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            className={field}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="text-sm font-semibold">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What would you like to discuss?"
          className={field}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-semibold">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your role or opportunity..."
          className={`${field} py-2`}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-ink"
        >
          Send message <span aria-hidden="true">↗</span>
        </button>
        <p role="status" className="text-sm text-muted">
          {submitted
            ? "Thanks! This form isn’t connected yet, so nothing was sent. Please email me directly."
            : "Your message will be sent to my inbox."}
        </p>
      </div>
    </form>
  );
}