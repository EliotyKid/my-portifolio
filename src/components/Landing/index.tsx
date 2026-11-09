"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import ScrollArrow from "@/common/ScrollArrow";
import { copy, type Language, localizedHref } from "@/lib/i18n";

export default function Landing({ lang }: { lang: Language }) {
  const container = useRef<HTMLElement>(null);
  const t = copy[lang];
  const marquee = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          ".hero-portrait",
          { yPercent: 0 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        marquee.current = gsap.to(".hero-marquee-track", {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
        gsap.from(".hero-info", {
          y: 32,
          opacity: 0,
          duration: 0.9,
          delay: 0.45,
          clearProps: "all",
        });
      }, container);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <section ref={container} className="hero" aria-label={t.role}>
      <div className="hero-portrait">
        <Image
          src="/images/eu.jpg"
          alt="Elias Rodrigues"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-location">
        <span>{t.based}</span>
        <span className="globe" aria-hidden="true">
          ◎
        </span>
      </div>
      <div className="hero-info">
        <ScrollArrow className="hero-arrow" direction="down-right" />
        <p>
          {t.freelance}
          <br />
          {t.role}
        </p>
        <Link href={localizedHref("/work", lang)}>
          {t.recent}
          <ScrollArrow />
        </Link>
      </div>
      <h1 className="sr-only">Elias Rodrigues — {t.role}</h1>
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          <span>Elias Rodrigues —&nbsp;</span>
          <span>Elias Rodrigues —&nbsp;</span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>
          {lang === "pt"
            ? "Desenvolvimento criativo & interação"
            : "Creative development & interaction"}
        </span>
        <button
          className="motion-toggle"
          type="button"
          aria-pressed={paused}
          aria-label={
            lang === "pt"
              ? paused
                ? "Retomar letreiro"
                : "Pausar letreiro"
              : paused
                ? "Resume marquee"
                : "Pause marquee"
          }
          onClick={() => {
            marquee.current?.paused(!paused);
            setPaused(!paused);
          }}
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        </button>
        <a href="#selected-work" aria-label={t.recent}>
          <ScrollArrow direction="down" />
        </a>
      </div>
    </section>
  );
}
