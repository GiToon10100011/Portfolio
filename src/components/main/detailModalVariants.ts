export const modalAnimationVariants = {
  title: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, type: "spring", damping: 10 },
    },
  },
  img: {
    hidden: { opacity: 0, x: "-50%", y: 30 },
    visible: {
      opacity: 1,
      x: "-50%",
      y: 0,
      transition: { duration: 0.5, type: "spring", damping: 10, delay: 0.2 },
    },
  },
  stacks: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  stacksChildren: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "tween", bounce: 0.4 },
    },
  },
  troubleshooting: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, type: "tween", staggerChildren: 0.2 },
    },
  },
  troubleshootingChildren: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, type: "tween" },
    },
  },
};
