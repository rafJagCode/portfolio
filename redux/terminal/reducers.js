import types from './types';

const TERMINAL = {
  directory: null,
  queue: [],
  display: [],
};

const terminal = (state = TERMINAL, action) => {
  switch (action.type) {
    case types.QUEUE_COMMAND: {
      const queue = [...state.queue, action.command];
      return { ...state, queue: queue };
    }
    case types.REMOVE_COMMAND_FROM_QUEUE: {
      const queue = state.queue.filter((command) => command !== action.command);
      return { ...state, queue: queue };
    }
    case types.DISPLAY_COMMAND: {
      const display = [...state.display, action.command];
      return { ...state, display: display };
    }
    case types.CLEAR_TERMINAL: {
      if (action.clearOnlyDisplay) return { directory: state.directory, queue: state.queue, display: [] };
      return { ...TERMINAL };
    }
    case types.CHANGE_DIRECTORY: {
      return { ...state, directory: action.directory };
    }
    default:
      return state;
  }
};

const CLICKED_COW = {
  current: null,
  previous: null,
};

const clickedCow = (state = CLICKED_COW, action) => {
  switch (action.type) {
    case types.SET_CLICKED_COW:
      return { current: action.cow, previous: state.current };
    default:
      return state;
  }
};

export default {
  terminal,
  clickedCow,
};
