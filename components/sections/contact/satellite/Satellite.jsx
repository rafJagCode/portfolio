import styles from './Satellite.module.scss';
import Signal from './signal/Signal';
import useSignals from './hooks/useSignals';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

export default function Satellite() {
  const intervalID = useRef();
  const continueSignals = useRef(true);
  const signalsOn = useSelector((state) => state.signalsOn);
  const [signals, addSignal, removeSignal] = useSignals();

  const sendSignals = async () => {
    const MIN_SIGNALS_COUNT = 3;
    let currSingalsCount = 0;
    let minSignalsIntervalID;
    continueSignals.current = true;
    await new Promise((resolve) => {
      minSignalsIntervalID = setInterval(() => {
        if (currSingalsCount++ < MIN_SIGNALS_COUNT) addSignal();
        else {
          clearInterval(minSignalsIntervalID);
          resolve();
        }
      }, 300);
    });
    if (continueSignals.current) intervalID.current = setInterval(addSignal, 300);
  };

  useEffect(() => {
    if (signalsOn) sendSignals();
    else {
      continueSignals.current = false;
      clearInterval(intervalID.current);
    }
  }, [signalsOn]);

  return (
    <div className={styles.container}>
      {signals.map((signal) => (
        <Signal key={signal.signalID} id={signal.signalID} removeSignal={removeSignal} />
      ))}
      <img id='satellite' className={styles.image} src='/static/images/satellite.svg' alt='satellite' />
    </div>
  );
}
