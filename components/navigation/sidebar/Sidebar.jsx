import styles from './Sidebar.module.scss';
import NavLink from '../navlink/NavLink';
import navigationLinks from '@/configuration/navigation_links_conf';
import actions from 'redux/actions';
import { refsTypes } from '@/configuration/types_conf';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useCallback } from 'react';

export default function Sidebar() {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const topbarMenuRef = useSelector((state) => state.globalRefs[refsTypes.TOPBAR_MENU_REF]);
  const languageControllerRef = useSelector((state) => state.globalRefs[refsTypes.LANGUAGE_CONTROLLER_REF]);
  const isSidebarOpenRef = useRef(isSidebarOpen);
  const sidebarRef = useRef();
  const dispatch = useDispatch();

  const handleClickOutsideSidebar = useCallback(
    (e) => {
      if (!topbarMenuRef || !languageControllerRef) return;
      if (!isSidebarOpenRef.current) return;
      if (topbarMenuRef.current.contains(e.target)) return;
      if (languageControllerRef.current.contains(e.target)) return;
      if (sidebarRef.current.contains(e.target)) return;
      dispatch(actions.changeSidebarState());
    },
    [topbarMenuRef, languageControllerRef],
  );

  useEffect(() => {
    addEventListener('click', handleClickOutsideSidebar, { capture: true });
    return () => {
      removeEventListener('click', handleClickOutsideSidebar, { capture: true });
    };
  }, [topbarMenuRef, languageControllerRef]);

  useEffect(() => {
    isSidebarOpenRef.current = isSidebarOpen;
    if (isSidebarOpen) {
      fullpage_api.setAllowScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
      return;
    }
    fullpage_api.setAllowScrolling(true);
    fullpage_api.setKeyboardScrolling(true);
  }, [isSidebarOpen]);

  return (
    <nav className={styles.container} data-is-open={isSidebarOpen} ref={sidebarRef} id='sidebar'>
      <ul className={styles.menu}>
        {navigationLinks.map((link, index) => {
          return (
            <li
              key={link.name}
              onClick={() => {
                dispatch(actions.changeSidebarState());
              }}>
              <NavLink link={link} index={index} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
