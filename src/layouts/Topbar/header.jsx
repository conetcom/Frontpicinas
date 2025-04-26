import { useNotifications } from '@/common/context/useNotificationContext';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
	const { notifications } = useNotifications();
 

	// Aplana los mensajes agrupados por día
	const flatNotifications = notifications.flatMap(group => group.messages);
  console.log('Notificaciones planas:', flatNotifications);

	return (
		<header className="d-flex justify-content-end align-items-center p-2 bg-light">
			<NotificationDropdown notifications={flatNotifications} />
		</header>
	);
};

export default Header;
