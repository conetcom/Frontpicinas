import HttpClient from '../helpers/httpClient';

function AuthService() {
	return {
		login: (values) => {
			return HttpClient.post('usuarios/login/', values);
		},
		logout() {
			return HttpClient.post('usuarios/logout/', {});
		},
		register: (values) => {
			return HttpClient.post('usuarios/register/', values);
		},
		forgetPassword: (values) => {
			return HttpClient.post('usuarios/forget-password/', values);
		},
	};
}

export default AuthService();
