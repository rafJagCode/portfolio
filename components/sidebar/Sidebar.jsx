import styles from './Sidebar.module.scss';
import navigationLinks from '@/configuration/navigation_links';
import NavLink from '@/components/navlink/NavLink';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { refsTypes } from '@/types';

export default function Sidebar() {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const topbarMenuRef = useSelector((state) => state.globalRefs[refsTypes.TOPBAR_MENU_REF]);
  const languageControllerRef = useSelector((state) => state.globalRefs[refsTypes.LANGUAGE_CONTROLLER_REF]);
  const sidebarRef = useRef();
  const dispatch = useDispatch();

  const handleClickOutsideSidebar = (e) => {
    if (!isSidebarOpen) return;
    if (topbarMenuRef.current.contains(e.target)) return;
    if (languageControllerRef.current.contains(e.target)) return;
    if (sidebarRef.current.contains(e.target)) return;
    dispatch({ type: 'CHANGE_SIDEBAR_STATE' });
  };

  useEffect(() => {
    if (!topbarMenuRef || !languageControllerRef) return;
    addEventListener('click', handleClickOutsideSidebar, { capture: true });
    return () => {
      removeEventListener('click', handleClickOutsideSidebar, { capture: true });
    };
  }, [topbarMenuRef, languageControllerRef]);

  useEffect(() => {
    if (isSidebarOpen) {
      fullpage_api.setAllowScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
      return;
    }
    fullpage_api.setAllowScrolling(true);
    fullpage_api.setKeyboardScrolling(true);
  }, [isSidebarOpen]);

  return (
    <nav
      className={styles.sidebar}
      data-is-open={isSidebarOpen}
      ref={sidebarRef}
    >
      <ul className={styles.sidebar__menu}>
        {navigationLinks.map((link) => {
          return (
            <li
              key={link.name}
              onClick={() => {
                dispatch({ type: 'CHANGE_SIDEBAR_STATE' });
              }}
            >
              <NavLink link={link} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
