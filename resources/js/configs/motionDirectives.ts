export const motionDirectives = {
  // v-motion-fade-in-up
  'fade-in-up': {
    initial: {
      opacity: 0,
      y: -20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: '100',
        delay: 100,
      },
    },
    end: {
      opacity: 1,
      y: 0,
    },
    duration: 150,
    once: true,
  },
  // Add more directives as needed
};
