import animateToLaunchingPosition from '@/services/ufo/animateToLaunchingPosition';

const handleLeavingHomeUfoAnimation = async () => {
  const ufoContainer = document.getElementById('home__ufo_container');
  const ufoOrbit = ufoContainer.parentNode;

  const ufoOrbitAnimation = ufoOrbit.getAnimations()[0];
  const ufoContainerAnimation = ufoContainer.getAnimations()[0];
  await animateToLaunchingPosition(ufoOrbitAnimation, ufoContainerAnimation);
  return await delay(500);
};

const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export default handleLeavingHomeUfoAnimation;
