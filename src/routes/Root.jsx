import { Navigate } from 'react-router-dom';

const Root = () => {
	const user = JSON.parse(localStorage.getItem('user')); // o usa useAuthContext() si ya tienes un context

	const getRootUrl = () => {
		if (!user || !user.role) return 'account/login';

		if (user.role === 'admin') {
			return 'dashboard/ecommerce';
		} else if (user.role === 'user') {
			return 'pages/profile';
		} else {
			return 'dashboard/ecommerce'; // valor por defecto si el rol es desconocido
		}
	};

	const url = getRootUrl();

	return <Navigate to={`/${url}`} replace />;
};

export default Root;

