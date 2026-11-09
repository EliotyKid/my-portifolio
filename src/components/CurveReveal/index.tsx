import React, { useRef } from "react";
import styles from "./style.module.scss"
import {motion, useScroll, useTransform} from "framer-motion"

const CurveReveal = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const container = useRef(null);
  const revealContainer = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  const y = useTransform(scrollYProgress, [0,1],[-500,0])

  return ( 
    <div ref={container}>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle} />

        <motion.div style={{ y, z: 0 }} ref={revealContainer} className={styles.revealContainer}>
          {children}
        </motion.div>
      </motion.div>
    </div>
   );
}
 
export default CurveReveal;