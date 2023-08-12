const particlesConfig = {
  autoPlay: true,
  background: {
    opacity: 0,
  },
  fullScreen: {
    enable: false,
    zIndex: 1,
  },
  detectRetina: true,
  interactivity: {
    resize: true,
  },
  particles: {
    move: {
      enable: true,
      outModes: {
        default: 'out',
        bottom: 'out',
        left: 'out',
        right: 'out',
        top: 'out',
      },
      speed: 0.1,
    },
    number: {
      density: {
        enable: true,
        area: 1000,
        factor: 1000,
      },
      value: 50,
    },
    opacity: {
      random: {
        enable: true,
        minimumValue: 0.1,
      },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
        destroy: 'none',
        startValue: 'random',
      },
    },
  },
  pauseOnBlur: true,
};

export default particlesConfig;
