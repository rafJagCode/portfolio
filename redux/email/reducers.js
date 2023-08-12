import types from './types';

const DIALOG = {
  message: null,
  isVisible: false,
};

const dialog = (state = DIALOG, action) => {
  switch (action.type) {
    case types.SHOW_DIALOG: {
      return { message: action.message, isVisible: true };
    }
    case types.HIDE_DIALOG: {
      return { message: null, isVisible: false };
    }
    default:
      return state;
  }
};

const SIGNALS_ON = false;

const signalsOn = (state = SIGNALS_ON, action) => {
  switch (action.type) {
    case types.TURN_SIGNALS_ON: {
      return true;
    }
    case types.TURN_SIGNALS_OFF: {
      return false;
    }
    default:
      return state;
  }
};

export default {
  dialog,
  signalsOn,
};
