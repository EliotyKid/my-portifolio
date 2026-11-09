"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

interface CurvedRevealProps {
  mask?: ReactNode;
  reveal: ReactNode;
}
export default function CurvedReveal({ mask, reveal }: CurvedRevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start center"],
  });
  const flatPath = "M0 0 L1000 0 Q500 0 0 0 Z";
  const path = useTransform(
    scrollYProgress,
    [0, 1],
    ["M0 0 L1000 0 Q500 180 0 0 Z", flatPath],
  );
  const y = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  return (
    <>
      {mask}
      <div ref={container} className={styles.curvedContainer}>
        <svg
          className={styles.svgCurve}
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          data-curve="footer"
          aria-hidden="true"
          focusable="false"
        >
          <motion.path d={reduced ? flatPath : path} />
        </svg>
        <motion.div style={{ y: reduced ? 0 : y }}>{reveal}</motion.div>
      </div>
    </>
  );
}
