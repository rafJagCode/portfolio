import animateToLaunchingPosition from '@/services/ufo/animateToLaunchingPosition';

const handleLeavingHomeUfoAnimation = async () => {
  const ufoOrbit = document.getElementById('home_image__orbit');
  const ufoContainer = document.getElementById('home__ufo_container');

  const ufoOrbitAnimation = ufoOrbit.getAnimations()[0];
  const ufoContainerAnimation = ufoContainer.getAnimations()[0];
  return await animateToLaunchingPosition(ufoOrbitAnimation, ufoContainerAnimation);
};

export default handleLeavingHomeUfoAnimation;
