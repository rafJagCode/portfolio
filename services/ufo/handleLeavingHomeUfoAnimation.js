import animateToLaunchingPosition from "@/services/ufo/animateToLaunchingPosition";
import swapOrbitingUfoToUfoComponent from "@/services/ufo/swapOrbitingUfoToUfoComponent";
import startUfoEngine from "@/services/ufo/startUfoEngine";

const handleLeavingHomeUfoAnimation = () => {
  const ufoOrbit = document.getElementById("home_image__orbit");
  const ufoContainer = document.getElementById("home__ufo_container");

  const ufoOrbitAnimation = ufoOrbit.getAnimations()[0];
  const ufoContainerAnimation = ufoContainer.getAnimations()[0];
  return animateToLaunchingPosition(ufoOrbitAnimation, ufoContainerAnimation).then(() => {
    swapOrbitingUfoToUfoComponent(ufoContainer);
    startUfoEngine();
  });
};

export default handleLeavingHomeUfoAnimation;
