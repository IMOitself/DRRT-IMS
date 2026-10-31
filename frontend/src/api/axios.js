import axios from 'axios';
import { toast } from 'react-toastify';

let isLocal = window.location.hostname === 'localhost';

isLocal = false; // TODO: remove me :D

const api = axios.create({
  baseURL: isLocal
    ? 'http://localhost:8000/api'
    : 'https://drrt-ims-backend.onrender.com/api',
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
    toast.error(err?.response?.data?.message || err?.message || "Logout failed");
  } finally {
    localStorage.removeItem('token');
    if (navigate) {
      navigate('/');
    }
    window.location.reload();
  }
}

export default api;