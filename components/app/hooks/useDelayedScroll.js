import { useState, useEffect } from 'react';

const useDelayedScroll = (states, actions, updateState, compareState, currentState) => {
  const [destination, setDestination] = useState(null);

  const repeatScrollWhenAnimationReady = (destination) => {
    setDestination(destination);
    return false;
  };

  const delayScroll = (destination) => {
    updateState(actions.DELAY_SCROLL);
    setDestination(destination);
  };

  useEffect(() => {
    if (!destination || (!compareState(states.SCROLL_ALLOWED) && !compareState(states.ORBITING_ANIMATION_READY))) return;
    fullpage_api.moveTo(destination.anchor);
  }, [currentState, destination]);

  return [repeatScrollWhenAnimationReady, delayScroll];
};

export default useDelayedScroll;
