import styles from './Signal.module.scss';
import SignalAnimation from './SignalAnimation';
import { useLayoutEffect } from 'react';

export default function Signal({ id, removeSignal }) {
  const animateSignal = async () => {
    await new SignalAnimation(id).startAnimation();
    removeSignal(id);
  };
  useLayoutEffect(() => {
    animateSignal();
  }, []);

  return (
    <img
      id={`signal_${id}`}
      className={styles.image}
      src="/static/images/signal.svg"
      alt="signal"
    />
  );
}
