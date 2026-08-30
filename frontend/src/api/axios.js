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

export function logout(navigate) {
  api
    .post('/logout')
    .then(() => {
      localStorage.removeItem('token');
      navigate('/');
      window.location.reload();
    })
    .catch((err) => console.error(err));
}

export default api;