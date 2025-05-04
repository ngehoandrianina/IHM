import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000/materielle/api/auth/';

const login = async (username, password) => {
  const response = await axios.post(API_URL + 'login/', {
    username,
    password
  });
  
  if (response.data.access) {
    Cookies.set('access_token', response.data.access, { secure: true, sameSite: 'strict' });
    Cookies.set('refresh_token', response.data.refresh, { secure: true, sameSite: 'strict' });
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    localStorage.removeItem('user');
  };
  
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
const refreshToken = async () => {
    const refresh = Cookies.get('refresh_token');
    if (!refresh) {
      throw new Error('No refresh token available');
    }
    
    try {
      const response = await axios.post(API_URL + 'refresh/', {
        refresh
      });
      
      if (response.data.access) {
        Cookies.set('access_token', response.data.access, { secure: true, sameSite: 'strict' });
        return response.data.access;
      }
    } catch (error) {
      logout();
      throw error;
    }
  };
const register = async (userData) => {
    try {
      const response = await api.post('/auth/register/', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

const authService = {
    login,
    logout,
    getCurrentUser,
    refreshToken,
    register,
  };
  
export default authService;