import { site } from "@/lib/site";

export function isAdminEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() === site.email.toLowerCase();
}
