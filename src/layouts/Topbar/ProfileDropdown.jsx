import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAuthContext } from '@/common/context';
import classNames from 'classnames';
import { useToggle } from '@/hooks';

const ProfileDropdown = ({ userTitle, username, menuItems, userImage}) => {
	const { user} = useAuthContext();
	// Estado para la imagen de perfil, inicializando con userImage o una predeterminada
	const [profileImage, setProfileImage] = useState(user?.profileImage || userImage);
	
	const [isOpen, toggleDropdown] = useToggle();

	// Este useEffect detecta si la imagen del perfil en el contexto del usuario cambia
	useEffect(() => {
		// Si la imagen de perfil en el objeto user está definida, actualizamos el estado con la nueva imagen
		if (user?.profileImage) {
			setProfileImage(user?.profileImage);
		}
	}, [user?.profileImage, userImage]);

	return (
		<Dropdown show={isOpen} onToggle={toggleDropdown}>
			<Dropdown.Toggle
				variant="link"
				id="dropdown-profile"
				as={'button'}
				onClick={toggleDropdown}
				className="nav-link dropdown-toggle arrow-none nav-user px-2"
			>
				<span className="account-user-avatar">
					{/* Usamos el estado profileImage para mostrar la imagen actualizada */}
					<img src={profileImage} className="rounded-circle" width={32} alt="user" />
				</span>
				<span className="d-lg-flex flex-column gap-1 d-none">
					<h5 className="my-0">{username}</h5>
					<h6 className="my-0 fw-normal align-self-start">{userTitle}</h6>
				</span>
			</Dropdown.Toggle>
			<Dropdown.Menu align={'end'} className="dropdown-menu-animated profile-dropdown">
				<div onClick={toggleDropdown}>
					<div className="dropdown-header noti-title">
						<h6 className="text-overflow m-0">Welcome !</h6>
					</div>
					{menuItems.map((item, i) => (
						<Link
							to={item.redirectTo}
							className="dropdown-item notify-item"
							key={i + '-profile-menu'}
						>
							<i className={classNames(item.icon, 'me-1')}></i>
							<span>{item.label}</span>
						</Link>
					))}
				</div>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default ProfileDropdown;
