"use client";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { projects } from "@/Data/Projects";
import { copy, languageFrom } from "@/lib/i18n";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const previousPath = useRef(pathname);
  const [phase, setPhase] = useState<"idle" | "cover" | "covered" | "reveal">(
    "idle",
  );
  const pendingHref = useRef<string | null>(null);
  const [transitionTitle, setTransitionTitle] = useState("");
  const finishTransition = useCallback(() => {
    if (phase === "cover") {
      setPhase("covered");
    } else if (phase === "reveal") {
      setPhase("idle");
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "covered" || !pendingHref.current) return;
    const frame = requestAnimationFrame(() => {
      const href = pendingHref.current;
      pendingHref.current = null;
      if (href) router.push(href);
    });
    return () => cancelAnimationFrame(frame);
  }, [phase, router]);

  useEffect(() => {
    const navigate = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname
      )
        return;
      event.preventDefault();
      if (phase !== "idle") return;
      const lang = languageFrom(destination.searchParams.get("lang"));
      const t = copy[lang];
      const routeTitles: Record<string, string> = {
        "/": t.home,
        "/work": t.work,
        "/work/webdev": t.web,
        "/work/gamedev": t.games,
        "/about": t.about,
        "/contact": t.contact,
      };
      setTransitionTitle(
        routeTitles[destination.pathname] ??
          projects.find(
            (project) => destination.pathname === `/work/${project.slug}`,
          )?.title ??
          t.work,
      );
      pendingHref.current = `${destination.pathname}${destination.search}${destination.hash}`;
      setPhase("cover");
    };
    document.addEventListener("click", navigate, true);
    return () => document.removeEventListener("click", navigate, true);
  }, [phase]);

  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (!window.location.hash)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (phase === "covered") setPhase("reveal");
  }, [pathname, phase]);
  const hiddenPath = "M0 1000 Q500 1300 1000 1000 L1000 1000 L0 1000 Z";
  const coveredPath = "M0 0 Q500 -300 1000 0 L1000 1000 L0 1000 Z";
  const path =
    phase === "cover" || phase === "covered" ? coveredPath : hiddenPath;
  return (
    <MotionConfig reducedMotion="user">
      <div className="page-content">{children}</div>
      <div className="route-curtain" aria-hidden="true" data-phase={phase}>
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-curve="page"
          focusable="false"
        >
          <motion.path
            initial={{ d: hiddenPath }}
            animate={{ d: path }}
            transition={{
              duration: reduced ? 0 : phase === "cover" ? 0.8 : 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={finishTransition}
          />
        </svg>
        <span hidden={phase !== "covered" && phase !== "reveal"}>
          {transitionTitle}
        </span>
      </div>
    </MotionConfig>
  );
}
