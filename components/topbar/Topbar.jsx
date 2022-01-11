import styles from './Topbar.module.scss';

export default function Topbar({navigationLinks}) {
	return (
		<nav className="topbar">
			<div className="topbar__left">
			</div>
			<div className="topbar__right">
			{
				navigationLinks.map((link) =>{
					return link.name;
				})
			}
			</div>
		</nav>
	)
}
