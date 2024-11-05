"use client";

import { motion } from "framer-motion";
import styles from "./Button.module.scss";

interface AnimatedButton {
  onClick: () => void; 
  text: string; 
}

export function AnimatedButton({ onClick, text }: AnimatedButton) {
  return (
    <section className={styles.ButtonContainer}>
      <div className={styles.AnimatedButton}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick} 
        >
          {text} 
        </motion.button>
      </div>
    </section>
  );
}
