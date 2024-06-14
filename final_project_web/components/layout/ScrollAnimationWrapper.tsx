import { motion, MotionProps } from "framer-motion";
import React, { ReactNode } from "react";

interface ScrollAnimationWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;