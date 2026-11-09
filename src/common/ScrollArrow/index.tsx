"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

const angles = { "up-right": 0, "down-right": 90, down: 135, left: 225 };
export default function ScrollArrow({
  direction = "up-right",
  className = "",
}: {
  direction?: keyof typeof angles;
  className?: string;
}) {
  const arrow = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          arrow.current,
          { rotation: -12, y: 4 },
          {
            rotation: 12,
            y: -4,
            ease: "none",
            scrollTrigger: {
              trigger: arrow.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <span
      ref={arrow}
      className={`scroll-arrow ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ transform: `rotate(${angles[direction]}deg)` }}
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5 19 19 5M5 5h14v14" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
