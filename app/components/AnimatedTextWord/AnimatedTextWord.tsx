import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

import styles from "./AnimatedTextWord.module.css";

interface IAnimatedTextWordProps {
  text: string;
}

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const AnimatedTextWord = ({ text }: IAnimatedTextWordProps) => {
  const ref = useRef(null);
  const control = useAnimation();
  const isInView = useInView(ref);

  const words = text.split(" ");

  useEffect(() => {
    if (isInView) {
      control.start("visible");
      return;
    }

    control.start("hidden");
  }, [control, isInView]);

  return (
    <motion.div
      ref={ref}
      className={styles.AnimatedTextWordWrapper}
      style={{ overflow: "hidden", display: "flex" }}
      variants={container}
      initial="hidden"
      animate={control}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "5px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTextWord;
