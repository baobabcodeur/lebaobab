// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const TOKEN =  localStorage.getItem('token'); // Remplacez par votre token réel

// Créer une instance axios avec le Bearer Token
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

export default apiInstance;
