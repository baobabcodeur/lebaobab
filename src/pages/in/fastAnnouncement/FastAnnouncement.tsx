import { InAnnouncementGrid } from "../../../components/inAnnouncementGrid/InAnnouncementGrid"
import "./fastAnnouncement.scss"
import React, { useState } from "react";

export const FastAnnouncement = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

   // Fonction pour ajouter une notification
   const addNotification = (message: string) => {
    const newNotifications = [...notifications, message];
    setNotifications(newNotifications);
    localStorage.setItem("notifications", JSON.stringify(newNotifications)); // Optionnel : stocker dans le localStorage
  };
  return (


    <div className="fastAnnouncement">
   
      <InAnnouncementGrid />
      </div>
  )
}
