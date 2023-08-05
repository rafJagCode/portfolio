import { useState } from 'react';

const useScrollMachineState = () => {
  const states = {
    isOrbitingAnimationNotReady: 'orbitingAnimationNotReady',
    isOrbitingAnimationReady: 'orbitingAnimationReady',
    isScrollHandled: 'scrollHandled',
    isScrollDelayed: 'scrollDelayed',
    isScrollAllowed: 'scrollAllowed',
  };

  const [currentState, setCurrentState] = useState(states.isOrbitingAnimationNotReady);

  const transitions = {
    [states.isOrbitingAnimationNotReady]: {
      ORBITING_ANIMATION_READY: states.isOrbitingAnimationReady,
    },
    [states.isOrbitingAnimationReady]: {
      HANDLE_SCROLL: states.isScrollHandled,
      DELAY_SCROLL: states.isScrollDelayed,
      ALLOW_SCROLL: states.isScrollAllowed,
    },
    [states.isScrollHandled]: {
      DELAY_SCROLL: states.isScrollDelayed,
      ALLOW_SCROLL: states.isScrollAllowed,
    },
    [states.isScrollDelayed]: {
      ALLOW_SCROLL: states.isScrollAllowed,
    },
    [states.isScrollAllowed]: {
      HANDLE_SCROLL: states.isScrollHandled,
    },
  };

  const transition = (currentState, action) => {
    const nextState = transitions[currentState][action];
    return nextState || currentState;
  };

  const updateState = (action) => {
    setCurrentState((currentState) => transition(currentState, action));
  };

  const compareState = (state) => state === currentState;

  return [states, updateState, compareState, currentState];
};

export default useScrollMachineState;
