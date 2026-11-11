"use server";

import { createClient } from "@/lib/supabase/server";
import type { ContactState } from "@/lib/contact";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(
  _prev: ContactState,
  fd: FormData,
): Promise<ContactState> {
  const get = (key: string) => String(fd.get(key) ?? "").trim();

  // Honeypot: real visitors never see this field. Bots fill it in.
  // Pretend it worked so the bot learns nothing, and save nothing.
  if (get("company")) return { status: "success" };

  const values = {
    name: get("name"),
    email: get("email"),
    subject: get("subject"),
    message: get("message"),
  };
  const fail = (error: string): ContactState => ({
    status: "error",
    error,
    values,
  });

  if (!values.name || values.name.length > 100)
    return fail("Please enter your name (100 characters at most).");
  if (!EMAIL.test(values.email) || values.email.length > 254)
    return fail("Please enter a valid email address.");
  if (values.subject.length > 150)
    return fail("The subject must be 150 characters or fewer.");
  if (!values.message || values.message.length > 5000)
    return fail("Please write a message (5000 characters at most).");

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: values.name,
    email: values.email,
    subject: values.subject || null,
    message: values.message,
  });

  if (error) {
    console.error("Contact insert failed:", error.message);
    return fail("Sorry, your message could not be sent. Please email me directly.");
  }
  return { status: "success" };
}