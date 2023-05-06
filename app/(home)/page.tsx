"use client";

import AnimatedTextWord from "../components/AnimatedTextWord/AnimatedTextWord";
import AnimatedTextChar from "../components/AnimatedTextChar/AnimatedTextChar";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <AnimatedTextWord text="Hello World" />
      <AnimatedTextChar text="Hello World" />
    </main>
  );
}
