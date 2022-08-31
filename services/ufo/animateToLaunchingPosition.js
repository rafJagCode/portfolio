const animateToLaunchingPosition = (ufoOrbitAnimation, ufoContainerAnimation) => {
  const ufoOrbitAnimationPromise = new Promise((resolve) => {
    ufoOrbitAnimation.onfinish = () => {
      revertUfoOrbitAnimationModification(ufoOrbitAnimation);
      ufoOrbitAnimation.pause();
      resolve();
    };
  });

  const ufoContainerAnimationPromise = new Promise((resolve) => {
    ufoContainerAnimation.onfinish = () => {
      revertUfoContainerAnimationModification(ufoContainerAnimation);
      ufoContainerAnimation.pause();
      resolve();
    };
  });

  modifyAnimations(ufoOrbitAnimation, ufoContainerAnimation);

  return Promise.all([ufoOrbitAnimationPromise, ufoContainerAnimationPromise]);
};

const modifyAnimations = (ufoOrbitAnimation, ufoContainerAnimation) => {
  ufoOrbitAnimation.updatePlaybackRate(4);
  ufoContainerAnimation.updatePlaybackRate(4);

  const ufoOrbitAnimationEffect = ufoOrbitAnimation.effect;
  const ufoContainerAnimationEffect = ufoContainerAnimation.effect;
  const ufoOrbitTiming = ufoOrbitAnimationEffect.getComputedTiming();
  const ufoContainerTiming = ufoContainerAnimationEffect.getComputedTiming();

  ufoOrbitAnimationEffect.updateTiming({ ...ufoOrbitTiming, iterations: ufoOrbitTiming.currentIteration + 1 });
  ufoContainerAnimationEffect.updateTiming({ ...ufoContainerTiming, iterations: ufoContainerTiming.currentIteration + 1 });
};

const revertUfoOrbitAnimationModification = (ufoOrbitAnimation) => {
  ufoOrbitAnimation.updatePlaybackRate(1);
  const ufoOrbitAnimationEffect = ufoOrbitAnimation.effect;
  const ufoOrbitTiming = ufoOrbitAnimationEffect.getComputedTiming();
  ufoOrbitAnimationEffect.updateTiming({ ...ufoOrbitTiming, iterations: Infinity });
};

const revertUfoContainerAnimationModification = (ufoContainerAnimation) => {
  ufoContainerAnimation.updatePlaybackRate(1);
  const ufoContainerAnimationEffect = ufoContainerAnimation.effect;
  const ufoContainerTiming = ufoContainerAnimationEffect.getComputedTiming();
  ufoContainerAnimationEffect.updateTiming({ ...ufoContainerTiming, iterations: Infinity });
};

export default animateToLaunchingPosition;
