import styles from "./style.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "../../animation";

type DataType = {
  title: string;
  href: string;
  index: number;
};

type LinkItemProps = {
  data: DataType;
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
};

export default function LinkItem({
  data,
  isActive,
  setSelectedIndicator,
}: LinkItemProps) {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      />

      <Link href={href}>{title}</Link>
    </motion.div>
  );
}
