type AnimationVariants = {
  offscreen: {
    y: number;
    opacity: number;
  };
  onscreen: (args?: { duration?: number }) => {
    y: number;
    opacity: number;
    transition: {
      type: string;
      duration: number;
    };
  };
};

export default function getScrollAnimation(): AnimationVariants {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: (args = {}) => {
      // Provide a default value for duration here, ensuring args.duration is treated safely
      const { duration = 2 } = args;
      return {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration,
        },
      };
    },
  };
}