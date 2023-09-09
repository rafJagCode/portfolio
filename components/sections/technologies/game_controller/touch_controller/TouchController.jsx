import styles from './TouchController.module.scss';
import TouchButton from './touch_button/TouchButton';

export default function TouchController() {
  const buttons = [
    { image: 'left', key: 'a' },
    { image: 'right', key: 'd' },
    { image: 'up', key: 'w' },
    { image: 'down', key: 's' },
    { image: 'rotate-left', key: 'ArrowLeft' },
    { image: 'rotate-right', key: 'ArrowRight' },
    { image: 'fire', key: ' ' },
  ];
  return (
    <div className={styles.container}>
      {buttons.map((button) => (
        <TouchButton key={button.image} button={button} />
      ))}
    </div>
  );
}
