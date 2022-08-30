import styles from './Ufo.module.scss';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

export default function Ufo() {
  return (
	<div className={styles.ufo} id='ufo'>
		<div className={styles.ufo__image}></div>
		<div className={styles.ufo__fire} id='ufo__fire'></div>
	</div>);
}
