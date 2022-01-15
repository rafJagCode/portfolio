import styles from './Sidebar.module.scss';
import navigationLinks from '@/configuration/navigation_links';
import NavLink from '@/components/navlink/NavLink';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useRef} from 'react';

export default function Sidebar() {
	const sidebarOpen = useSelector(state => state.sidebarOpen);
	const isSidebarOpen = useRef();
	isSidebarOpen.current = sidebarOpen;

	const dispatch = useDispatch();
	const sidebarRef = useRef();

	const fullpageApi = useSelector(state => state.fullpageApi);
	if(fullpageApi){
		if(sidebarOpen){
			fullpageApi.setAllowScrolling(false);
			fullpageApi.setKeyboardScrolling(false);
		}else{
			fullpageApi.setAllowScrolling(true);
			fullpageApi.setKeyboardScrolling(true);
		}
	}

	useEffect(() => {
		const topbar = document.querySelector('#topbar');

		const handleClickOutsideSidebar = (e) => {
			if(!isSidebarOpen.current) return;
			if(topbar.contains(e.target)) return;
			if(sidebarRef.current.contains(e.target)) return;
			dispatch({type: 'CHANGE_SIDEBAR_STATE'});
		}

		document.addEventListener('click', handleClickOutsideSidebar, {capture: true})
		return () => {
			document.removeEventListener('click', handleClickOutsideSidebar)
		}
	}, []);

	return (
		<nav className={styles.sidebar} data-is-open={sidebarOpen} ref={sidebarRef}>
			<ul className={styles.sidebar__menu}>
				{
					navigationLinks.map((link) =>{
						return (
							<li key={link.name} onClick={()=>{dispatch({type: 'CHANGE_SIDEBAR_STATE'})}}>
								<NavLink link={link}/>
							</li>
						)
					})
				}
			</ul>
		</nav>
	)
}
