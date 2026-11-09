"use client";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./styles.module.scss";

export default function Curve() {
  const reduced = useReducedMotion();
  const initialPath = "M100 0 L100 1000 Q-100 500 100 0";
  const targetPath = "M100 0 L100 1000 Q100 500 100 0";
  return (
    <svg
      className={styles.svgCurve}
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      data-curve="menu"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path
        initial={{ d: reduced ? targetPath : initialPath }}
        animate={{ d: targetPath }}
        exit={{ d: reduced ? targetPath : initialPath }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
    </svg>
  );
}
