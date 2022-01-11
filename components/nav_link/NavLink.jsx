import './NavLink.module.scss';

export default function NavLink() {
	return (
		<a className="nav-link" href="#">
			<div className="nav-link__icon"></div>
			<p className="nav-link__name"></p>
		</a>
	)
}
