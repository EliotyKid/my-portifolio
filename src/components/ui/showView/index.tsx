"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.scss";
export type DataType = {
  title: string;
  src: string;
  color: string;
  category: "Web Development" | "Game Development";
};
export default function ShowView({ data }: { data: DataType[] }) {
  const [category, setCategory] = useState("All");
  return (
    <section className={styles.container}>
      <div className={styles.categoryFilter}>
        {["All", "Web Development", "Game Development"].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setCategory(value)}
            aria-pressed={category === value}
          >
            {value}
          </button>
        ))}
      </div>
      {data
        .filter((item) => category === "All" || item.category === category)
        .map((item) => (
          <article key={item.title}>
            <Image
              src={`/images/${item.src}`}
              alt={item.title}
              width={600}
              height={400}
            />
            <h2>{item.title}</h2>
            <p>{item.category}</p>
          </article>
        ))}
    </section>
  );
}
