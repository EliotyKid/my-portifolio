"use client";

import styles from "./style.module.scss";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

type ProjectType = {
  title: string;
  src: string;
  color: string;
};

const projects: ProjectType[] = [
  { title: "C2 Montreal", src: "c2montreal.png", color: "#000000" },
  { title: "Office Studio", src: "officestudio.png", color: "#8C8C8C" },
  { title: "Locomotive", src: "locomotive.png", color: "#EFE8D3" },
  { title: "Silencio", src: "silencio.png", color: "#706D63" },
];

export default function Home() {
  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Tempo entre o surgimento de cada card
      },
    },
  };

  // Variantes para cada Card do projeto
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
    },
  };

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.grid}
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }} // Dispara a animação quando entra na tela
        >
          {projects.map((project, i) => (
            <motion.div 
              key={`grid_${i}`} 
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }} // Efeito sutil ao passar o mouse
            >
              <div 
                className={styles.imageWrapper} 
                style={{ backgroundColor: project.color }}
              >
                <Image
                  src={`/images/${project.src}`}
                  alt={project.title}
                  width={500}
                  height={350}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles.projectInfo}>
                <h3>{project.title}</h3>
                <p>Design & Development</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}