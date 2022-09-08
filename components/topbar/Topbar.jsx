import styles from './Topbar.module.scss';
import NavLink from '@/components/navlink/NavLink';
import Hamburger from '@/components/hamburger/Hamburger';
import LanguageController from '@/components/language_controller/LanguageController';
import navigationLinks from '@/configuration/navigation_links';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Topbar() {
  const topbarMenuRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_GLOBAL_REFS', element: 'topbarMenu', ref: topbarMenuRef });
  }, []);

  return (
    <header
      className={styles.topbar}
      id="topbar"
    >
      <div className={styles.topbar__left}>
        <LanguageController />
      </div>
      <div className={styles.topbar__right}>
        <nav className="topbar__navigation">
          <ul
            className={styles.topbar__menu}
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
