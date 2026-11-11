export type ContactState = {
  status: "idle" | "success" | "error";
  error?: string;
  values?: { name: string; email: string; subject: string; message: string };
};