import types from './types';

const queueCommand = (command, print = null, project = null) => ({ type: types.QUEUE_COMMAND, command, print, project });
const removeCommandFromQueue = (command) => ({ type: types.REMOVE_COMMAND_FROM_QUEUE, command });
const displayCommand = (command) => ({ type: types.DISPLAY_COMMAND, command });
const clearTerminal = () => ({ type: types.CLEAR_TERMINAL });
const changeDirectory = (directory) => ({ type: types.CHANGE_DIRECTORY, directory });
const setClickedCow = (cow) => ({ type: types.SET_CLICKED_COW, cow });

export default {
  queueCommand,
  removeCommandFromQueue,
  displayCommand,
  clearTerminal,
  changeDirectory,
  setClickedCow,
};
