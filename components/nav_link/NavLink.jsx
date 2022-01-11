import './NavLink.module.scss';

export default function NavLink({link}) {
	return (
		<a className="nav-link" href={link.link}>
			<div className="nav-link__icon">{link.icon}</div>
			<p className="nav-link__name">{link.name}</p>
		</a>
	)
}
