import React, { useEffect, useState } from "react";
import axios from "axios";
import "./header.scss";

export const Header = () => {
  const [username, setUsername] = useState(""); // État pour stocker le nom d'utilisateur
  const [notificationCount, setNotificationCount] = useState(0); // Nombre de notifications non lues
  const [notifications, setNotifications] = useState<string[]>([]); // Liste des notifications

  useEffect(() => {
    // Récupérer le nom d'utilisateur depuis le local storage ou une source d'API
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Met à jour l'état avec le nom stocké
    }
    // Récupérer les notifications depuis le localStorage ou API
    const storedNotifications = JSON.parse(localStorage.getItem("notifications") || '[]');
    setNotifications(storedNotifications);
    setNotificationCount(storedNotifications.length);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    console.log("Token avant déconnexion:", token);

    if (!token) {
      console.error("Aucun token trouvé. L'utilisateur est peut-être déjà déconnecté.");
      alert("Aucun token trouvé. Vous êtes peut-être déjà déconnecté.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Déconnexion réussie :", response.data);
      localStorage.removeItem("token");
      localStorage.removeItem("username"); // Supprime également le nom d'utilisateur du stockage local
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Erreur de déconnexion :", error);
      if (error.response) {
        console.error("Détails de l'erreur :", error.response.data);
        if (error.response.status === 401) {
          alert("Session expirée ou non valide. Veuillez vous reconnecter.");
        } else {
          alert("Erreur lors de la déconnexion. Veuillez réessayer.");
        }
      } else {
        console.error("Erreur réseau ou serveur :", error.message);
        alert("Erreur réseau. Veuillez réessayer plus tard.");
      }
    }
  };

  // Fonction pour ajouter une nouvelle notification
  const addNotification = (message: string) => {
    const newNotifications = [...notifications, message];
    setNotifications(newNotifications);
    setNotificationCount(newNotifications.length);
    // Enregistrer les notifications dans le localStorage
    localStorage.setItem("notifications", JSON.stringify(newNotifications));
  };

  return (
    <div className="header">
      <div className="logo">
        <a href="/dashboard">
          <h1>
            <span>Le</span>Baobab
          </h1>
        </a>
      </div>
      <div className="icons">
        <div className="notification" onClick={() => alert('Notifications')}>
          <img src="/notifications.svg" alt="Notifications" />
          <span>{notificationCount}</span>
        </div>
        <div className="user">
          <img src="/zuck.jpg" alt="profil" />
          <span>{username || "Utilisateur"}</span> {/* Affiche le nom d'utilisateur */}
        </div>
        <img
          src="/icons8-sortie-16.png"
          alt="Déconnexion"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
