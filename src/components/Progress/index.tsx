

import { motion } from "framer-motion";
import styles from "./Progress.module.scss";

interface ProgressProps {
  progress: number; 
}

export const Progress = ({ progress }: ProgressProps) => {
  return (
    <div className={styles['progress-container']}>
      <motion.div
        className={styles['progress-bar']}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
