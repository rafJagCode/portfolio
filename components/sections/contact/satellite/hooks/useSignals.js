import uuid from 'react-uuid';
import { useState } from 'react';

const useSignals = () => {
  const [signals, setSignals] = useState([]);
  const addSignal = () => {
    const newSignal = { signalID: uuid() };
    setSignals((signals) => [...signals, newSignal]);
    return newSignal;
  };
  const removeSignal = (signalID) => {
    setSignals((signals) => signals.filter((signal) => signal.signalID !== signalID));
  };
  return [signals, addSignal, removeSignal];
};

export default useSignals;
