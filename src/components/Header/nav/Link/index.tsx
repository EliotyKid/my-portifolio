"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { scale, slide } from "../../animation";
import styles from "./style.module.scss";

type LinkItemProps = {
  data: { title: string; href: string; index: number };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
  current?: boolean;
  onNavigate?: () => void;
};
export default function LinkItem({
  data,
  isActive,
  setSelectedIndicator,
  current,
  onNavigate,
}: LinkItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`${styles.link} menu-link`}
      custom={data.index}
      variants={slide}
      initial={reduced ? false : "initial"}
      animate={reduced ? { x: 0 } : "enter"}
      exit={reduced ? { x: 0 } : "exit"}
    >
      <Link
        href={data.href}
        aria-current={current ? "page" : undefined}
        onNavigate={onNavigate}
        onMouseEnter={() => setSelectedIndicator(data.href)}
        onFocus={() => setSelectedIndicator(data.href)}
      >
        {data.title}
      </Link>
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        transition={{ duration: reduced ? 0 : 0.3 }}
        className={`${styles.indicator} menu-indicator`}
        aria-hidden="true"
      />
    </motion.div>
  );
}
