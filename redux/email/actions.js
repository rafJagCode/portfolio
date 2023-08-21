import types from './types';

const showDialog = (message) => ({ type: types.SHOW_DIALOG, message });
const hideDialog = () => ({ type: types.HIDE_DIALOG });
const turnSignalsOn = () => ({ type: types.TURN_SIGNALS_ON });
const turnSingalsOff = () => ({ type: types.TURN_SIGNALS_OFF });

export default {
  showDialog,
  hideDialog,
  turnSignalsOn,
  turnSingalsOff,
};
