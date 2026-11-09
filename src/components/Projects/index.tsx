"use client";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollArrow from "@/common/ScrollArrow";
import { type ProjectType, projects } from "@/Data/Projects";
import { copy, type Language, localizedHref } from "@/lib/i18n";

export default function Projects({
  lang = "pt",
  items = projects,
  heading = true,
  showViewToggle = false,
}: {
  lang?: Language;
  items?: ProjectType[];
  heading?: boolean;
  showViewToggle?: boolean;
}) {
  const [active, setActive] = useState<ProjectType | null>(null);
  const [view, setView] = useState<"list" | "grid">("list");
  const preview = useRef<HTMLDivElement>(null);
  const move = useRef<{
    x: (value: number) => void;
    y: (value: number) => void;
  } | null>(null);
  const t = copy[lang];
  useEffect(() => {
    if (
      !preview.current ||
      !matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const element = preview.current;
    const x = gsap.quickTo(element, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(element, "y", { duration: 0.45, ease: "power3" });
    move.current = { x, y };
    return () => {
      x.tween.kill();
      y.tween.kill();
      move.current = null;
    };
  }, []);
  return (
    <section className="project-section section-shell" id="selected-work">
      {heading && (
        <div className="section-heading">
          <h2 className="eyebrow">{t.recent}</h2>
          <span className="eyebrow">01 — 0{items.length}</span>
        </div>
      )}
      {showViewToggle && (
        <div
          className="project-view-toggle"
          role="group"
          aria-label={
            lang === "pt" ? "Visualização dos projetos" : "Project view"
          }
        >
          {(["list", "grid"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={view === mode}
              onClick={() => setView(mode)}
            >
              {mode === "list"
                ? lang === "pt"
                  ? "Lista"
                  : "List"
                : lang === "pt"
                  ? "Grade"
                  : "Grid"}
            </button>
          ))}
        </div>
      )}
      <div
        className={`project-list${view === "grid" ? " is-grid" : ""}`}
        onPointerLeave={() => setActive(null)}
      >
        {items.map((project, index) => (
          <Link
            className="project-row"
            key={project.slug}
            href={localizedHref(`/work/${project.slug}`, lang)}
            onPointerEnter={(event) => {
              if (event.pointerType !== "mouse" || !move.current) return;
              move.current.x(event.clientX);
              move.current.y(event.clientY);
              setActive(project);
            }}
            onPointerMove={(event) => {
              move.current?.x(event.clientX);
              move.current?.y(event.clientY);
            }}
            onBlur={() => setActive(null)}
          >
            <span className="project-number">0{index + 1}</span>
            <div
              className="project-mobile-image"
              style={{ background: project.color }}
            >
              <Image
                src={project.cover}
                alt=""
                width={960}
                height={640}
                sizes="(max-width: 760px) 90vw, 1px"
              />
            </div>
            <div className="project-name">
              <h3>{project.title}</h3>
              <p>{project.summary[lang]}</p>
            </div>
            <span className="project-category">
              {project.category === "Web Development" ? t.web : t.games}
            </span>
            <ScrollArrow className="project-arrow" />
          </Link>
        ))}
      </div>
      <div
        ref={preview}
        className={`project-preview ${active ? "is-active" : ""}`}
        aria-hidden="true"
      >
        {active && (
          <>
            <div className="preview-mask">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.slug}
                  className="preview-image"
                  style={{ background: active.color }}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Image src={active.cover} alt="" width={720} height={480} />
                </motion.div>
              </AnimatePresence>
            </div>
            <span>
              {t.view} <ScrollArrow />
            </span>
          </>
        )}
      </div>
    </section>
  );
}
