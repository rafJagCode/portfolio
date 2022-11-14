import types from '../types';

const terminalQueueingMiddleware = (store) => (next) => (action) => {
  if (action.type !== types.QUEUE_COMMAND) return next(action);
  const command = createCommandWithPromise(action);
  if (isQueueEmpty(store)) {
    addCommandToQueue(next, command);
    displayCommand(next, command);
    removeFromQueueWhenTypingFinished(next, command);
  } else {
    const lastQueuedCommand = getLastQueuedCommand(store);
    addCommandToQueue(next, command);
    displayAfterLastQueuedCommand(next, lastQueuedCommand, command);
    removeFromQueueWhenTypingFinished(next, command);
  }
  return command;
};

const createCommandWithPromise = (action) => {
  let resolve;
  const promise = new Promise((res) => (resolve = res));
  const command = {
    text: action.command,
    print: action.print || null,
    directory: action.directory || null,
    promise: promise,
    resolve: resolve,
  };
  return command;
};

const isQueueEmpty = (store) => {
  if (store.getState().terminal.queue.length === 0) return true;
  return false;
};

const addCommandToQueue = (next, command) => {
  next({ type: types.QUEUE_COMMAND, command: command });
};

const displayCommand = (next, command) => {
  next({ type: types.DISPLAY_COMMAND, command: command });
};

const removeCommandFromQueue = (next, command) => {
  next({ type: types.REMOVE_COMMAND_FROM_QUEUE, command: command });
};

const removeFromQueueWhenTypingFinished = async (next, command) => {
  await command.promise;
  if (command.text === 'clear') {
    next({ type: types.CLEAR_TERMINAL, clearOnlyDisplay: true });
    next({ type: types.CHANGE_DIRECTORY, directory: command.directory });
  }
  removeCommandFromQueue(next, command);
};

const getLastQueuedCommand = (store) => {
  return store.getState().terminal.queue.at(-1);
};

const displayAfterLastQueuedCommand = async (next, lastQueuedCommand, command) => {
  await lastQueuedCommand.promise;
  displayCommand(next, command);
};

export default terminalQueueingMiddleware;
