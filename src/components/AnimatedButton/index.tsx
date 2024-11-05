"use client";

import { motion } from "framer-motion";
import styles from "./Button.module.scss";

interface AnimatedButtonProps {
  onClick: () => void; 
  text: string; 
}

export function AnimatedButton({ onClick, text }: AnimatedButtonProps) {
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
