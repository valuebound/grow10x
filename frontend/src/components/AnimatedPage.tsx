import React from "react"
import { motion } from 'framer-motion';

type AnimatedPageProps = {
  children?: React.ReactNode
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {

  const animationStyles = {
    initial: { height: "100%", opacity: 1 },
    animate: { height: 0 },
    exit: { y: -10, opacity: 0 },
  }

  return (
    <motion.div
      variants={animationStyles}
      transition={{ ease: "circIn", duration: 0.3 }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
};

export default AnimatedPage;
