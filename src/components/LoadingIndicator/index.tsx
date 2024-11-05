import { motion } from "framer-motion";
import styles from "./LoadingIndicator.module.scss";

export const LoadingIndicator = () => {
  return (
    <motion.div
      className={styles.loader}
      animate={{
        scale: [1, 1.5, 1], 
        opacity: [1, 0.5, 1], 
      }}
      transition={{
        duration: 0.6, 
        repeat: Infinity, 
        ease: "easeInOut",
      }}
    />
  );
};
