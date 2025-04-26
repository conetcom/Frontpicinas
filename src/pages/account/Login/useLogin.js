import { authApi } from '@/common/api';
import { useAuthContext, useNotifications } from '@/common/context';
//reparacion
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export const loginFormSchema = yup.object({
	email: yup.string().email('Please enter valid email').required('Please enter email'),
	password: yup.string().required('Please enter password'),
});

export default function useLogin() {
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const { isAuthenticated, saveSession } = useAuthContext();
	const { showNotification } = useNotifications();

	const redirectUrl = useMemo(
		() => (location.state && location.state.from ? location.state.from.pathname : '/'),
		[location.state]
	);

	const login = async (values) => {
		setLoading(true);
		try {
			const res = await authApi.login(values);
			if (res.data.token) {
				
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('user', JSON.stringify(res.data.user));
				console.log('usuario registrado', res.data.user)
				saveSession({ user: res.data.user, token: res.data.token });
				navigate(redirectUrl);
			}
		} catch (error) {
			showNotification({ message: error.toString(), type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	return { loading, login, redirectUrl, isAuthenticated, saveSession };
}
