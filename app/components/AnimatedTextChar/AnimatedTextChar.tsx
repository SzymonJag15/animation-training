import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

import styles from "./AnimatedTextChar.module.css";

interface IAnimatedTextCharProps {
  text: string;
}

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: -20,
    y: 10,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const AnimatedTextChar = ({ text }: IAnimatedTextCharProps) => {
  const ref = useRef(null);
  const control = useAnimation();
  const isInView = useInView(ref);

  const letters = Array.from(text);

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
      className={styles.AnimatedTextCharWrapper}
      style={{ overflow: "hidden", display: "flex" }}
      variants={container}
      initial="hidden"
      animate={control}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTextChar;
