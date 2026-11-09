"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import Magnetic from "@/common/Magnetic";
import ScrollArrow from "@/common/ScrollArrow";
import { copy, type Language, localizedHref } from "@/lib/i18n";
export default function Description({ lang }: { lang: Language }) {
  const t = copy[lang];
  const container = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".intro-title, .intro-aside", {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 88%",
            once: true,
          },
        });
      }, container);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <section ref={container} className="intro section-shell">
      <h2 className="intro-title">{t.intro}</h2>
      <div className="intro-aside">
        <p>{t.introBody}</p>
        <Magnetic>
          <Link className="circle-link" href={localizedHref("/about", lang)}>
            {t.aboutMe}
            <ScrollArrow />
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
