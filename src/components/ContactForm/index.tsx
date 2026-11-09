"use client";
import { type FormEvent, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import ScrollArrow from "@/common/ScrollArrow";
import type { Language } from "@/lib/i18n";

const messages = {
  pt: {
    name: "Qual é o seu nome?",
    nameHint: "Seu nome",
    email: "Qual é o seu e-mail?",
    emailHint: "voce@empresa.com",
    message: "O que vamos criar juntos?",
    messageHint: "Conte um pouco sobre seu projeto…",
    send: "Enviar mensagem",
    pending: "Enviando…",
    success: "Mensagem enviada!",
    successDetail: "Obrigado pelo contato. Vou responder no e-mail informado.",
    sendAnother: "Enviar outra mensagem",
    error: "Não foi possível enviar. Tente novamente em alguns instantes.",
    limited: "Muitas tentativas. Aguarde 15 minutos antes de tentar novamente.",
    invalid:
      "Confira os campos: nome, e-mail válido e mensagem de 10 a 5.000 caracteres.",
    privacy: "Seus dados serão usados apenas para responder ao seu contato.",
  },
  en: {
    name: "What is your name?",
    nameHint: "Your name",
    email: "What is your email?",
    emailHint: "you@company.com",
    message: "What shall we create together?",
    messageHint: "Tell me a little about your project…",
    send: "Send message",
    pending: "Sending…",
    success: "Message sent!",
    successDetail:
      "Thank you for getting in touch. I'll reply to the email you provided.",
    sendAnother: "Send another message",
    error: "Your message could not be sent. Please try again in a moment.",
    limited: "Too many attempts. Please wait 15 minutes before trying again.",
    invalid:
      "Check your name, a valid email and a message between 10 and 5,000 characters.",
    privacy: "Your details will only be used to reply to your inquiry.",
  },
};
export default function ContactForm({ lang }: { lang: Language }) {
  const id = useId();
  const t = messages[lang];
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  const [status, setStatus] = useState("");
  const sending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setState("pending");
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setState("error");
        setStatus(
          response.status === 429
            ? t.limited
            : response.status === 400
              ? t.invalid
              : t.error,
        );
        return;
      }
      setState("success");
      setStatus(t.success);
      form.reset();
    } catch {
      setState("error");
      setStatus(t.error);
    } finally {
      sending.current = false;
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-busy={state === "pending"}
    >
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div hidden={state === "success"}>
        <div className="form-field">
          <label htmlFor={`${id}-name`}>
            <span>01</span>
            {t.name}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            placeholder={t.nameHint}
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
          />
        </div>
        <div className="form-field">
          <label htmlFor={`${id}-email`}>
            <span>02</span>
            {t.email}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            placeholder={t.emailHint}
            autoComplete="email"
            required
            maxLength={254}
          />
        </div>
        <div className="form-field">
          <label htmlFor={`${id}-message`}>
            <span>03</span>
            {t.message}
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            placeholder={t.messageHint}
            required
            minLength={10}
            maxLength={5000}
            rows={5}
          />
        </div>
        <button
          className="circle-link form-submit"
          type="submit"
          disabled={state === "pending"}
        >
          <span className="circle-label">
            {state === "pending" ? t.pending : t.send}
          </span>
          <ScrollArrow />
        </button>
      </div>
      <output className="form-status" aria-live="polite" data-state={state}>
        {state === "success" && (
          <svg
            className="form-success-icon"
            viewBox="0 0 52 52"
            aria-hidden="true"
          >
            <circle cx="26" cy="26" r="24" pathLength={1} />
            <path d="M15 27l8 8 15-17" pathLength={1} />
          </svg>
        )}
        {status}
        {state === "success" && <small>{t.successDetail}</small>}
      </output>
      {state === "success" ? (
        <button
          className="form-success-reset"
          type="button"
          // Keeps keyboard focus in place when the submit button is hidden.
          ref={(button) => button?.focus()}
          onClick={() => {
            flushSync(() => {
              setState("idle");
              setStatus("");
            });
            document.getElementById(`${id}-name`)?.focus();
          }}
        >
          {t.sendAnother}
        </button>
      ) : (
        <p className="form-privacy">{t.privacy}</p>
      )}
    </form>
  );
}
