import { randomUUID } from "node:crypto";

const attempts = new Map<string, { count: number; expires: number }>();
const WINDOW = 15 * 60 * 1000;
const MAX_BYTES = 16000;
const emailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;

function error(code: string, status: number) {
  return Response.json({ error: code }, { status });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const source = new URL(origin);
      const host = request.headers.get("host") || new URL(request.url).host;
      if (
        source.host !== host ||
        !["http:", "https:"].includes(source.protocol)
      )
        return error("invalid_origin", 403);
    } catch {
      return error("invalid_origin", 403);
    }
  }

  // shortcut: limits are per server instance; add a shared gateway limit when deploying across instances, and overwrite client IP headers at the proxy.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires <= now) attempts.delete(key);
  const bucket = attempts.get(ip);
  if (bucket && bucket.count >= 5) return error("rate_limited", 429);
  if (!bucket && attempts.size >= 10000) return error("rate_limited", 429);
  attempts.set(ip, {
    count: (bucket?.count ?? 0) + 1,
    expires: bucket?.expires ?? now + WINDOW,
  });

  if (Number(request.headers.get("content-length")) > MAX_BYTES)
    return error("too_large", 413);
  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error("invalid_input", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return error("too_large", 413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return error("invalid_input", 400);
  }
  if (!input || typeof input !== "object" || Array.isArray(input))
    return error("invalid_input", 400);
  const { name, email, message, website } = input as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    (website !== undefined && website !== "")
  )
    return error("invalid_input", 400);
  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();
  if (
    cleanName.length < 2 ||
    cleanName.length > 100 ||
    /[\r\n]/.test(cleanName) ||
    cleanName.includes("\x00") ||
    cleanEmail.length > 254 ||
    !emailPattern.test(cleanEmail) ||
    cleanMessage.length < 10 ||
    cleanMessage.length > 5000 ||
    cleanMessage.includes("\x00")
  )
    return error("invalid_input", 400);

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "eliotfonse99@gmail.com";
  if (!key || !from || !emailPattern.test(to))
    return error("not_configured", 503);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: cleanEmail,
        subject: `Novo contato do portfólio: ${cleanName}`,
        text: `Nome: ${cleanName}\nE-mail: ${cleanEmail}\n\n${cleanMessage}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return error("delivery_failed", 502);
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id)
      return error("delivery_failed", 502);
    return Response.json({ success: true });
  } catch {
    return error("delivery_failed", 502);
  }
}
