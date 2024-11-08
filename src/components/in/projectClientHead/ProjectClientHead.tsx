import { useState } from "react";
import { Link } from "react-router-dom";
import "./projectClientHead.scss";

export const ProjectClientHead = () => {
  const [activeLink, setActiveLink] = useState(""); // État pour suivre le lien actif

  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Met à jour l'état avec le lien actif
  };

  return (
    <div className="projectClientHead">
      <Link 
        to=""
        className={activeLink === "freelance" ? "active" : ""}
        onClick={() => handleLinkClick("freelance")}
      >
        Trouver Freelance
      </Link>
      
      <Link 
        to="client-publish"
        className={activeLink === "publish" ? "active" : ""}
        onClick={() => handleLinkClick("publish")}
      >
        Publier un Projet
      </Link>
      
      <Link 
        to="ongoing-client"
        className={activeLink === "ongoing" ? "active" : ""}
        onClick={() => handleLinkClick("ongoing")}
      >
        Travaux en Cours
      </Link>
      
      <Link 
        to="past-client"
        className={activeLink === "past" ? "active" : ""}
        onClick={() => handleLinkClick("past")}
      >
        Projets passés
      </Link>
      
    
    </div>
  );
};
