import api from './api';

export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const authService = {
  async login(credentials) {
    const response = await api.post('/accounts/login/', credentials);
    const { access, refresh } = response.data;

    const tokenPayload = parseJwt(access);
    
    // Check if we have registered user info cached locally for role preservation
    const cachedUser = this.getStoredUser();
    const role = (cachedUser && cachedUser.email === credentials.email) 
      ? cachedUser.role 
      : (tokenPayload?.role || 'CUSTOMER');

    const user = {
      user_id: tokenPayload?.user_id || null,
      email: credentials.email,
      role: role,
    };

    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user_data', JSON.stringify(user));

    return { tokens: { access, refresh }, user };
  },

  async register(userData) {
    const response = await api.post('/accounts/register/', {
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      role: userData.role,
    });
    
    // Cache registered user details so role is remembered on immediate login
    const registeredUser = {
      email: response.data.email || userData.email,
      phone: response.data.phone || userData.phone,
      role: response.data.role || userData.role,
    };
    localStorage.setItem('user_data', JSON.stringify(registeredUser));

    return response.data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  },

  getStoredUser() {
    const userStr = localStorage.getItem('user_data');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getAccessToken() {
    return localStorage.getItem('access_token');
  },

  isAuthenticated() {
    const token = this.getAccessToken();
    if (!token) return false;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return false;
    return payload.exp * 1000 > Date.now();
  },
};
