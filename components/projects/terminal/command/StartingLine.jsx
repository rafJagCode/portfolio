import styles from './StartingLine.module.scss';
import useTranslation from '@/hooks/useTranslation';

export default function StartingLine({ directory }) {
  const { t } = useTranslation();
  return (
    <>
      <span className={styles.starting_line__pc_info}>DEATH_STAR@QUANTUM_PC </span>
      <span className={styles.starting_line__catalog}>
        ~/FLOPPY_COWS
        {!!directory && `/${t(directory)}`}
      </span>
      <br></br>$&nbsp;
    </>
  );
}
