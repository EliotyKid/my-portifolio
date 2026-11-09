"use client";
import gsap from "gsap";
import { type ReactNode, useEffect, useRef } from "react";
export default function Magnetic({ children }: { children: ReactNode }) {
  const magnetic = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = magnetic.current;
    if (!el) return;
    const media = gsap.matchMedia();
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const xTo = gsap.quickTo(el, "x", {
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
        const yTo = gsap.quickTo(el, "y", {
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
        const move = (event: MouseEvent) => {
          const box = el.getBoundingClientRect();
          xTo((event.clientX - box.left - box.width / 2) * 0.25);
          yTo((event.clientY - box.top - box.height / 2) * 0.25);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        return () => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
          xTo.tween.kill();
          yTo.tween.kill();
          gsap.set(el, { clearProps: "transform" });
        };
      },
    );
    return () => media.revert();
  }, []);
  return <div ref={magnetic}>{children}</div>;
}
