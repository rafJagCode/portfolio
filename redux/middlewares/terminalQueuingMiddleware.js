import actions from 'redux/actions';
import types from 'redux/types';

const terminalQueueingMiddleware = (store) => (next) => (action) => {
  if (action.type !== types.QUEUE_COMMAND) return next(action);

  const command = getCommandWithPromise(action);

  if (isQueueEmpty(store)) {
    next(actions.queueCommand(command));
    next(actions.displayCommand(command));
    removeFromQueueWhenTypingFinished(next, command);
  } else {
    const lastQueuedCommand = getLastQueuedCommand(store);
    next(actions.queueCommand(command));
    displayAfterLastQueuedCommand(next, lastQueuedCommand, command);
    removeFromQueueWhenTypingFinished(next, command);
  }
  return command;
};

const getCommandWithPromise = (action) => {
  const command = {
    text: action.command,
    print: action.print,
    project: action.project,
  };
  command.promise = new Promise((resolve) => (command.resolve = resolve));
  return command;
};

const isQueueEmpty = (store) => {
  if (!store.getState().terminal.queue.length) return true;
  return false;
};

const removeFromQueueWhenTypingFinished = async (next, command) => {
  await command.promise;
  if (command.text === 'clear') next(actions.clearTerminal());
  next(actions.removeCommandFromQueue(command));
};

const getLastQueuedCommand = (store) => {
  return store.getState().terminal.queue.at(-1);
};

const displayAfterLastQueuedCommand = async (next, lastQueuedCommand, command) => {
  await lastQueuedCommand.promise;
  next(actions.displayCommand(command));
};

export default terminalQueueingMiddleware;
