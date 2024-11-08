import { useState } from "react";
import { Link } from "react-router-dom";
import "./projectHead.scss";

export const ProjectHead = () => {
  const [activeLink, setActiveLink] = useState("client"); // État pour suivre le lien actif

  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Mettre à jour l'état avec le lien actif
  };

  return (
    <div className="projectHead">
      <h1>Projets</h1>
      <div className="liens">
        <Link
          to="/dashboard/project"
          className={activeLink === "client" ? "active" : ""}
          onClick={() => handleLinkClick("client")}
        >
          En Tant Que Client
        </Link>
        <Link
          to="/dashboard/project/prestataire"
          className={activeLink === "prestataire" ? "active" : ""}
          onClick={() => handleLinkClick("prestataire")}
        >
          En Tant Que Prestataire
        </Link>
      </div>
    </div>
  );
};
