// src/services/messageService.ts
import api from './axiosConfig';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

type Message = {
  id?: number;
  user_id: number;
  project_id: number;
  content: string;
  created_at?: string;
  updated_at?: string;
};

// Obtenir les messages d'un projet spécifique
export const getMessagesByProject = async (projectId: number) => {
  const response = await api.get(`/messages/${projectId}`);
  return response.data;
};

// Envoyer un nouveau message
export const createMessage = async (messageData: Message) => {
  const response = await api.post('/messages', messageData);
  return response.data;
};

// Lister tous les messages
export const listAllMessages = async () => {
  const response = await api.get('/messages');
  return response.data;
};

// Fonction pour récupérer toutes les discussions (chats)
export const getAllChats = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/chats`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de toutes les discussions:", error);
    throw error;
  }
};