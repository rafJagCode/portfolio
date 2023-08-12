import { useState } from 'react';

const useScrollMachineState = () => {
  const states = {
    ORBITING_ANIMATION_NOT_READY: 'ORBITING_ANIMATION_NOT_READY',
    ORBITING_ANIMATION_READY: 'ORBITING_ANIMATION_READY',
    SCROLL_HANDLED: 'SCROLL_HANDLED',
    SCROLL_DELAYED: 'SCROLL_DELAYED',
    SCROLL_ALLOWED: 'SCROLL_ALOWED',
  };

  const actions = {
    SET_ORBITING_ANIMATION_TO_READY: 'SET_ORBITING_ANIMATION_TO_READY',
    HANDLE_SCROLL: 'HANDLE_SCROLL',
    DELAY_SCROLL: 'DELAY_SCROLL',
    ALLOW_SCROLL: 'ALLOW_SCROLL',
  };

  const transitions = {
    [states.ORBITING_ANIMATION_NOT_READY]: {
      [actions.SET_ORBITING_ANIMATION_TO_READY]: states.ORBITING_ANIMATION_READY,
    },
    [states.ORBITING_ANIMATION_READY]: {
      [actions.HANDLE_SCROLL]: states.SCROLL_HANDLED,
      [actions.DELAY_SCROLL]: states.SCROLL_DELAYED,
      [actions.ALLOW_SCROLL]: states.SCROLL_ALLOWED,
    },
    [states.SCROLL_HANDLED]: {
      [actions.DELAY_SCROLL]: states.SCROLL_DELAYED,
      [actions.ALLOW_SCROLL]: states.SCROLL_ALLOWED,
    },
    [states.SCROLL_DELAYED]: {
      [actions.ALLOW_SCROLL]: states.SCROLL_ALLOWED,
    },
    [states.SCROLL_ALLOWED]: {
      [actions.HANDLE_SCROLL]: states.SCROLL_HANDLED,
    },
  };
  const [currentState, setCurrentState] = useState(states.ORBITING_ANIMATION_NOT_READY);

  const transition = (currentState, action) => {
    const nextState = transitions[currentState][action];
    return nextState || currentState;
  };

  const updateState = (action) => {
    setCurrentState((currentState) => transition(currentState, action));
  };

  const compareState = (state) => state === currentState;

  return [states, actions, updateState, compareState, currentState];
};

export default useScrollMachineState;
