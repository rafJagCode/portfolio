import styles from './Topbar.module.scss';
import Hamburger from './hamburger/Hamburger';
import LanguageController from './language_controller/LanguageController';
import NavLink from '../navlink/NavLink';
import navigationLinks from '@/configuration/navigation_links_conf';
import actions from 'redux/actions';
import { refsTypes } from '@/configuration/types_conf';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Topbar() {
  const topbarMenuRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setGlobalRef(refsTypes.TOPBAR_MENU_REF, topbarMenuRef));
  }, []);

  return (
    <header className={styles.container} id='topbar'>
      <div className={styles.left}>
        <LanguageController />
      </div>
      <div className={styles.right}>
        <nav className='topbar__navigation'>
          <ul className={styles.menu} id='topbarMenu' ref={topbarMenuRef}>
            {navigationLinks.map((link) => {
              return (
                <li key={link.name}>
                  <NavLink link={link} />
                </li>
              );
            })}
            <Hamburger />
          </ul>
        </nav>
      </div>
    </header>
  );
}
