import { authApi } from '@/common/api';
import { useAuthContext, useNotifications } from '@/common/context';

import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function useRegister() {
	const [loading, setLoading] = useState(false);

	const { t } = useTranslation();
	const navigate = useNavigate();

	const { isAuthenticated } = useAuthContext();
	const { showNotification } = useNotifications();

	const schema = yup.object().shape({
		username: yup.string().required(t('Please enter name')),
		lastname: yup.string().required(t('Please enter Last name')),
		email: yup.string().email('Please enter valid email').required(t('Please enter email')),
		password1: yup
			.string()
			.required(t('Please enter password'))
			.min(8, 'Password is too short - should be 8 chars minimum')
			.matches(/[a-zA-Z]/, 'Password can only contain latin letters'),
		password2: yup.string().oneOf([yup.ref('password1')], 'Passwords must match'),
		rol: yup
  		.string()
 		.oneOf(['admin', 'user'], t('Role must be admin or user'))
  		.required(t('Please select a role')),	
		});

	const register = async (data ) => {
		const { username, lastname, email, password1, rol} = data;
		setLoading(true);
		try {
			const res = await authApi.register({
				username,
				lastname,
				email,
				password: password1,
				rol,
			});
			if (res.data) {
				showNotification({
					message: 'Registration successful. Welcome aboard!',
					type: 'success',
				});
				navigate('/account/confirm-mail');
			}
	} catch (e) {
  const status = e.response?.status;
  const fallback = e.response?.data?.message || e.message || 'Error desconocido';

  const messages = {
    401: 'Credenciales inválidas',
    403: 'Acceso denegado',
    404: 'Recurso no encontrado',
  };

  const errorMsg = messages[status] || fallback;

  showNotification({ message: errorMsg, type: 'error' });
}
		 finally {
			setLoading(false);
		}
	};

	return { loading, register, isAuthenticated, schema };
}
