"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/Data/Projects";
import styles from "./style.module.scss";

type ViewMode = "list" | "grid";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as const },
  },
};

const categories = ["All", "Web Development", "Game Development"] as const;

export default function ProjectsView() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const modalContainer = useRef<HTMLDivElement | null>(null);
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorLabel = useRef<HTMLDivElement | null>(null);

  const xMoveContainer = useRef<((value: number) => void) | null>(null);
  const yMoveContainer = useRef<((value: number) => void) | null>(null);
  const xMoveCursor = useRef<((value: number) => void) | null>(null);
  const yMoveCursor = useRef<((value: number) => void) | null>(null);
  const xMoveCursorLabel = useRef<((value: number) => void) | null>(null);
  const yMoveCursorLabel = useRef<((value: number) => void) | null>(null);

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory,
  );

  useEffect(() => {
    if (!modalContainer.current || !cursor.current || !cursorLabel.current)
      return;

    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (
    active: boolean,
    index: number,
    x: number,
    y: number,
  ) => {
    moveItems(x, y);
    setActiveProject(active ? index : null);
  };

  return (
    <main
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) =>
        moveItems(e.clientX, e.clientY)
      }
      className={styles.projects}
    >
      <div className={styles.header}>
        <div className={styles.controls}>
          <div className={styles.viewToggle}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${
                viewMode === "grid" ? styles.active : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width="6"
                  height="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="11"
                  y="1"
                  width="6"
                  height="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="1"
                  y="11"
                  width="6"
                  height="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="11"
                  y="11"
                  width="6"
                  height="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${
                viewMode === "list" ? styles.active : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <line
                  x1="2"
                  y1="4"
                  x2="16"
                  y2="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="2"
                  y1="9"
                  x2="16"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="2"
                  y1="14"
                  x2="16"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
          <div className={styles.categoryFilter}>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={`${styles.filterBtn} ${
                  activeCategory === cat ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="list"
              className={styles.listContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={`list_${project.title}`}
                  className={styles.listItem}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    manageModal(true, i, e.clientX, e.clientY);
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    manageModal(false, i, e.clientX, e.clientY);
                  }}
                >
                  <h2>{project.title}</h2>
                  <p>{project.category}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className={styles.gridContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={`grid_${project.title}`}
                  className={styles.card}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.12,
                    ease: [0.215, 0.61, 0.355, 1] as const,
                  }}
                >
                  <div className={styles.imageContainer}>
                    <div
                      className={styles.imageWrapper}
                      style={{ backgroundColor: project.color }}
                    >
                      <Image
                        src={`/images/${project.src}`}
                        alt={project.title}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className={styles.projectInfo}>
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={activeProject !== null ? "enter" : "closed"}
        className={styles.modalContainer}
      >
        <div
          style={{ top: activeProject !== null ? `${activeProject * -100}%` : "0%" }}
          className={styles.modalSlider}
        >
          {filteredProjects.map((project) => (
            <div
              className={styles.modal}
              style={{ backgroundColor: project.color }}
              key={`modal_${project.title}`}
            >
              <Image
                src={`/images/${project.src}`}
                width={300}
                height={0}
                alt="image"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        className={styles.cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={activeProject !== null ? "enter" : "closed"}
      />

      <motion.div
        ref={cursorLabel}
        className={styles.cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={activeProject !== null ? "enter" : "closed"}
      >
        View
      </motion.div>
      <div className={styles.blank} />
    </main>
  );
}
