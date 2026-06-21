"use client";

import React from "react";
import styles from "./style.module.scss";

type ProjectProps = {
  index: number;
  title: string;
  manageModal: (active: boolean, index: number, x: number, y: number) => void;
  category: string;
};

export default function Project({ index, title, manageModal, category }: ProjectProps) {
  return (
    <div
      className={styles.project}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
    >
      <h2>{title}</h2>
      <p>{category}</p>
    </div>
  );
}
