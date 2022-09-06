const startOrbitingAnimation = (ufoContainer) => {
  const ufoOrbit = ufoContainer.parentNode;
  ufoContainer.getAnimations()[0].play();
  ufoOrbit.getAnimations()[0].play();
};

export default startOrbitingAnimation;
