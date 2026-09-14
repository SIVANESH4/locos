import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Access Token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Automatic Refresh Token Handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid infinite refresh loops
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/accounts/login/') &&
      !originalRequest.url?.includes('/accounts/refresh/')
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/accounts/refresh/`, {
            refresh: refreshToken,
          });

          localStorage.setItem('access_token', data.access);
          if (data.refresh) {
            localStorage.setItem('refresh_token', data.refresh);
          }

          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Token refresh failed - clear invalid auth state
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_data');
          window.dispatchEvent(new Event('auth:logout'));
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
