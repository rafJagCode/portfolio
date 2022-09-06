const stopUfoEngine = () => {
  const ufoFire = document.getElementById('ufo__fire');
  ufoFire.getAnimations().forEach((animation) => {
    animation.cancel();
  });
};

export default stopUfoEngine;
