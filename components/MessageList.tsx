import { deleteMessage } from "@/app/admin/actions";

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
};

function formatDate(iso: string) {
  // The server runs in UTC. Change timeZone if you prefer your own.
  return (
    new Date(iso).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }) + " UTC"
  );
}

export default function MessageList({ messages }: { messages: Message[] }) {
  if (messages.length === 0) {
    return <p className="text-sm text-muted">No messages yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {messages.map((m) => (
        <li key={m.id} className="rounded-lg border border-line bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-ink">{m.name}</p>
              <a
                href={`mailto:${m.email}`}
                className="inline-flex min-h-11 items-center break-all text-sm font-semibold text-primary underline"
              >
                {m.email}
              </a>
            </div>
            <form action={deleteMessage}>
              <input type="hidden" name="id" value={m.id} />
              <button
                type="submit"
                aria-label={`Delete message from ${m.name}`}
                className="min-h-11 text-sm font-semibold text-primary underline"
              >
                Delete
              </button>
            </form>
          </div>

          <p className="font-mono text-xs text-muted">
            {formatDate(m.created_at)}
            {m.subject ? ` · ${m.subject}` : ""}
          </p>
          <p className="mt-3 whitespace-pre-line break-words text-sm text-ink">
            {m.message}
          </p>
        </li>
      ))}
    </ul>
  );
}