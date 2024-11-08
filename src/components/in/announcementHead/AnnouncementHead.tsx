import { useState } from "react";
import { Link } from "react-router-dom";
import "./announcementHead.scss"; // Assurez-vous d'importer le fichier CSS correspondant

export const AnnouncementHead = () => {
  const [activeLink, setActiveLink] = useState("mesAnnonces"); // État pour suivre le lien actif

  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Mettre à jour l'état avec le lien actif
  };

  return (
    <div className="announcementHead">
    
      <div className="liens">
        <Link
          to="" // Lien vers Mes Annonces
          className={activeLink === "mesAnnonces" ? "active" : ""}
          onClick={() => handleLinkClick("mesAnnonces")}
        >
          Mes Annonces
        </Link>
        <Link
          to="liste-annonces" // Lien vers Liste des Annonces
          className={activeLink === "listeAnnonces" ? "active" : ""}
          onClick={() => handleLinkClick("listeAnnonces")}
        >
          Liste des Annonces
        </Link>
      </div>
    </div>
  );
};
