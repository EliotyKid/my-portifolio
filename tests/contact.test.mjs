import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../src/app/api/contact/route.ts";

let counter = 0;
function request(body, headers = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `192.0.2.${++counter}`,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
const valid = {
  name: "A client",
  email: "client@example.com",
  message: "I would like a new interactive website.",
  website: "",
};

test("rejects malformed JSON and invalid fields", async () => {
  for (const body of [
    "{",
    null,
    [],
    {},
    { ...valid, name: " " },
    { ...valid, email: "a\r\nb@example.com" },
    { ...valid, email: "invalid" },
    { ...valid, message: "short" },
    { ...valid, name: "x".repeat(101) },
    { ...valid, message: "x".repeat(5001) },
  ]) {
    assert.equal((await POST(request(body))).status, 400);
  }
});
test("rejects oversized body even without content-length", async () => {
  assert.equal((await POST(request("x".repeat(17000)))).status, 413);
});
test("rejects cross-origin requests", async () => {
  assert.equal(
    (await POST(request(valid, { Origin: "https://unrelated.example" })))
      .status,
    403,
  );
});
test("honeypot does not claim successful delivery", async () => {
  assert.equal(
    (await POST(request({ ...valid, website: "spam" }))).status,
    400,
  );
});
test("absent credentials never returns success", async () => {
  const previous = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    assert.equal((await POST(request(valid))).status, 503);
  } finally {
    if (previous !== undefined) process.env.RESEND_API_KEY = previous;
  }
});
test("rate limits repeated attempts", async () => {
  for (let index = 0; index < 5; index++)
    await POST(request({}, { "x-forwarded-for": "198.51.100.1" }));
  assert.equal(
    (await POST(request({}, { "x-forwarded-for": "198.51.100.1" }))).status,
    429,
  );
});
test("provider failure does not return success; configured recipient and reply-to reach provider", async (context) => {
  const saved = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  };
  Object.assign(process.env, {
    RESEND_API_KEY: "test-key",
    CONTACT_FROM_EMAIL: "Portfolio <hello@example.com>",
    CONTACT_TO_EMAIL: "owner@example.com",
  });
  try {
    let payload;
    const fetchMock = context.mock.method(
      globalThis,
      "fetch",
      async (_url, options) => {
        payload = JSON.parse(options.body);
        return Response.json({ message: "failed" }, { status: 500 });
      },
    );
    assert.equal((await POST(request(valid))).status, 502);
    fetchMock.mock.mockImplementation(async (_url, options) => {
      payload = JSON.parse(options.body);
      return Response.json({ id: "email-id" });
    });
    assert.equal((await POST(request(valid))).status, 200);
    assert.deepEqual(payload.to, ["owner@example.com"]);
    assert.equal(payload.reply_to, valid.email);
    assert.ok(payload.text.includes(valid.message));
    fetchMock.mock.mockImplementation(async () => Response.json({}));
    assert.equal((await POST(request(valid))).status, 502);
    fetchMock.mock.mockImplementation(async () => {
      throw new Error("offline");
    });
    assert.equal((await POST(request(valid))).status, 502);
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("same-origin requests through an HTTPS tunnel reach validation", async () => {
  const response = await POST(
    request(
      {},
      {
        host: "preview.example.com",
        origin: "https://preview.example.com",
        "x-forwarded-proto": "https",
      },
    ),
  );
  assert.equal(response.status, 400);
});
