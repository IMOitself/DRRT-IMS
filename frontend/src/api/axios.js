import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

// Attach the token to every request automatically, once logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function logout(navigate) {
  try {
    await api.post('/logout');
  } catch (err) {
    console.error(err);
  } finally {
    localStorage.removeItem('token');
    if (navigate) {
      navigate('/');
    }
    window.location.reload();
  }
}

export default api;