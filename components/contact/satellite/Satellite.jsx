import styles from './Satellite.module.scss';
import Signal from './signal/Signal';
import useSignals from './hooks/useSignals';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Satellite() {
  const dispatch = useDispatch();
  const signalsOn = useSelector((state) => state.signalsOn);
  const [signals, addSignal, removeSignal] = useSignals();
  const sendSignals = () => {
    const calls = 0;
    const intervalID = setInterval(() => {
      addSignal();
      if (calls >= 5) {
        dispatch({ type: 'TURN_SIGNALS_OFF' });
        return clearInterval(intervalID);
      }
      calls += 1;
    }, 300);
  };

  useEffect(() => {
    if (!signalsOn) return;
    sendSignals();
  }, [signalsOn]);

  return (
    <div className={styles.container}>
      {signals.map((signal) => (
        <Signal
          key={signal.signalID}
          id={signal.signalID}
          removeSignal={removeSignal}
        />
      ))}
      <img
        id="satellite"
        className={styles.satellite_image}
        src="/static/images/satellite.svg"
        alt="satellite"
      />
    </div>
  );
}
