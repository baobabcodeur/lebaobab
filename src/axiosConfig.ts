// src/axiosConfig.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Remplacez par l'URL de votre backend Laravel
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour inclure le token dans chaque requête
api.interceptors.request.use(
  (config) => {
    // Obtenez le token depuis le stockage (localStorage ou autre)
    const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké ici
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
