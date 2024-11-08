// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';
import { getAllChats, getMessagesByProject, createMessage } from '../../messageServices';
import './chat.scss';

type ChatType = {
  id: number;
  project_id: number;
  freelancer_id: number;
  last_message: string;
  last_message_date: string;
};

type MessageType = {
  id: number;
  user_id: number;
  project_id: number;
  content: string;
  created_at: string;
};

const Chat: React.FC<{ projectId: number; userId: number }> = ({ projectId, userId }) => {
  const [chats, setChats] = useState<ChatType[]>([]); // Liste des discussions
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null); // ID de la discussion sélectionnée

  // Charger toutes les discussions de l'utilisateur
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const fetchedChats = await getAllChats(userId);
        setChats(fetchedChats);
      } catch (error) {
        console.error('Erreur lors du chargement des discussions:', error);
      }
    };
    fetchChats();
  }, [userId]);

  // Charger les messages pour la discussion sélectionnée
  useEffect(() => {
    if (selectedChat !== null) {
      const fetchMessages = async () => {
        try {
          const fetchedMessages = await getMessagesByProject(selectedChat);
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Erreur lors du chargement des messages:', error);
        }
      };
      fetchMessages();
    }
  }, [selectedChat]);

  // Fonction pour envoyer un nouveau message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || selectedChat === null) return;

    const messageData = {
      user_id: userId,
      project_id: selectedChat,
      content: newMessage,
    };

    try {
      const newMsg = await createMessage(messageData);
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage('');
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  return (
    <div className="chat-container">
      {/* Liste des discussions */}
      <div className="chat-list">
        <h3>Discussions</h3>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${chat.project_id === selectedChat ? 'active' : ''}`}
            onClick={() => setSelectedChat(chat.project_id)}
          >
            <div className="chat-item-header">
              <span>Projet #{chat.project_id}</span>
            </div>
            <p>{chat.last_message}</p>
            <span className="chat-timestamp">{new Date(chat.last_message_date).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Messages de la discussion sélectionnée */}
      <div className="chat">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.user_id === userId ? 'message-current-user' : ''}`}
            >
              <div className="message-header">
                <span className="message-user">
                  {msg.user_id === userId ? 'Vous' : `User ${msg.user_id}`}
                </span>
                <span className="message-timestamp">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
              <p className="message-content">{msg.content}</p>
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
          />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
