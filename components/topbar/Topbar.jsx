import styles from './Topbar.module.scss';
import NavLink from '@/components/navlink/NavLink';
import Hamburger from '@/components/hamburger/Hamburger';
import LanguageController from '@/components/language_controller/LanguageController';
import navigationLinks from '@/configuration/navigation_links';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refsTypes } from '@/types';

export default function Topbar() {
  const topbarMenuRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GLOBAL_REFS', refName: refsTypes.TOPBAR_MENU_REF, ref: topbarMenuRef });
  }, []);

  return (
    <header
      className={styles.container}
      id="topbar"
    >
      <div className={styles.left}>
        <LanguageController />
      </div>
      <div className={styles.right}>
        <nav className="topbar__navigation">
          <ul
            className={styles.menu}
            id="topbarMenu"
            ref={topbarMenuRef}
          >
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
