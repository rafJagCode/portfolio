const states = {
  INITIAL_STATE: 'INITIAL_STATE',
  PLAYING: 'PLAYING',
  GAME_PAUSED: 'GAME_PAUSED',
  GAME_ENDED: 'GAME_ENDED',
  GAME_WON: 'GAME_WON',
  GAME_LOST: 'GAME_LOST',
};

const actions = {
  START_GAME: 'START_GAME',
  PAUSE_GAME: 'PAUSE_GAME',
  END_GAME: 'END_GAME',
  RESET_GAME: 'RESET_GAME',
  WIN_GAME: 'WIN_GAME',
  LOSE_GAME: 'LOSE_GAME',
};

const transitions = {
  [states.INITIAL_STATE]: {
    [actions.START_GAME]: states.PLAYING,
  },
  [states.PLAYING]: {
    [actions.PAUSE_GAME]: states.GAME_PAUSED,
    [actions.END_GAME]: states.GAME_ENDED,
    [actions.RESET_GAME]: states.INITIAL_STATE,
    [actions.WIN_GAME]: states.GAME_WON,
    [actions.LOSE_GAME]: states.GAME_LOST,
  },
  [states.GAME_PAUSED]: {
    [actions.START_GAME]: states.PLAYING,
    [actions.RESET_GAME]: states.INITIAL_STATE,
    [actions.END_GAME]: states.GAME_ENDED,
  },
  [states.GAME_ENDED]: {
    [actions.RESET_GAME]: states.INITIAL_STATE,
  },
  [states.GAME_WON]: {
    [actions.RESET_GAME]: states.INITIAL_STATE,
    [actions.END_GAME]: states.GAME_ENDED,
  },
  [states.GAME_LOST]: {
    [actions.RESET_GAME]: states.INITIAL_STATE,
    [actions.END_GAME]: states.GAME_ENDED,
  },
};

const transition = (currentState, action) => {
  const nextState = transitions[currentState][action];
  return nextState || currentState;
};

const getUpdatedState = (currentState, action) => {
  return transition(currentState, action);
};

const compareState = (currentState, state) => currentState === state;

export { states as gameStates, actions as gameActions, getUpdatedState as getUpdatedGameState, compareState as compareGameState };
