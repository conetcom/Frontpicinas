import { useAuthContext, useNotifications } from '@/common/context';
import { authApi } from '@/common/api';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export const loginFormSchema = yup.object({
	email: yup.string().email('Please enter a valid email').required('Please enter email'),
	password: yup.string().required('Please enter password'),
});

export default function useLogin() {
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const { isAuthenticated, saveSession } = useAuthContext();
	const { showNotification } = useNotifications();

	const redirectUrl = useMemo(
		() => (location.state && location.state.from ? location.state.from.pathname : '/'), // El "/" apunta al componente Root
		[location.state]
	);

	const login = async (values) => {
		setLoading(true);
		try {
			const res = await authApi.login(values);
			const user = res.data.user;
			const token = res.data.token;

			if (user && user.role) {
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				saveSession({ user, token });

				navigate('/'); // Redirige al componente <Root />
			} else {
				showNotification({ message: 'Error: Usuario sin rol', type: 'error' });
			}
		} catch (error) {
			showNotification({ message: error.toString(), type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	return { loading, login, redirectUrl, isAuthenticated, saveSession };
}
