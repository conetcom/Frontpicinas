import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const ErrorCodeMessages = {
  401: 'Invalid credentials',
  403: 'Access Forbidden',
  404: 'Resource or page not found',
};

function HttpClient() {
  const _errorHandler = (error) => {
    const status = error?.response?.status;

    // Si es 401, limpiar sesión y redirigir
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirigir al login automáticamente
      return Promise.reject('Session expired. Redirecting to login.');
    }
// ✅ Rechaza el error original para mantener la estructura del error de Axios
return Promise.reject(error);

   /* return Promise.reject(
      Object.keys(ErrorCodeMessages).includes(String(status))
        ? ErrorCodeMessages[status]
        : error.response?.data?.message
          ? error.response.data.message
          : error.message || error
    );*/
  };

  const _httpClient = axios.create({
    baseURL: apiUrl,
    timeout: 6000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  _httpClient.interceptors.response.use(
    (response) => response.data,
    _errorHandler
  );

  return {
    get: (url, config = {}) => _httpClient.get(url, config),
    post: (url, data, config = {}) => _httpClient.post(url, data, config),
    patch: (url, config = {}) => _httpClient.patch(url, config),
    put: (url, config = {}) => _httpClient.put(url, config),
    delete: (url, config = {}) => _httpClient.delete(url, config),
    client: _httpClient,
  };
}

export default HttpClient();
