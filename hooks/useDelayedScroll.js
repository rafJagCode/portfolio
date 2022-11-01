import { useState, useEffect } from 'react';

const useDelayedScroll = (states, updateState, compareState, currentState) => {
  const [destination, setDestination] = useState(null);

  const repeatScrollWhenAnimationReady = (destination) => {
    setDestination(destination);
    return false;
  };

  const delayScroll = (destination) => {
    updateState('DELAY_SCROLL');
    setDestination(destination);
  };

  useEffect(() => {
    if (!destination || (!compareState(states.isScrollAllowed) && !compareState(states.isOrbitingAnimationReady))) return;
    fullpage_api.moveTo(destination.anchor);
  }, [currentState, destination]);

  return [repeatScrollWhenAnimationReady, delayScroll];
};

export default useDelayedScroll;
