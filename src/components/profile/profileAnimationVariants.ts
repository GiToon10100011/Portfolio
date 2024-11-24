export const profileAnimationVariants = {
  strengths: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
      },
    },
  },
  strengthsChildren: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, type: "tween" },
    },
  },
  aboutMainCard: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "tween" },
    },
  },
  aboutSubCard: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, type: "tween", staggerChildren: 0.1 },
    },
  },
  aboutSubCardChildren: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, type: "tween" },
    },
  },
  tools: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, type: "tween", staggerChildren: 0.06 },
    },
  },
  toolsChildren: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, type: "tween" },
    },
  },
  certificates: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, type: "tween", staggerChildren: 0.2 },
    },
  },
  certificatesChildren: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "tween" },
    },
  },
  contact: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, type: "tween", staggerChildren: 0.2 },
    },
  },
  contactChildren: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "tween", staggerChildren: 0.2 },
    },
  },
  contactChildrenDepth: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "tween" },
    },
  },
  footer: {
    hidden: { opacity: 0, x: -400 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, type: "spring", damping: 10 },
    },
  },
};
