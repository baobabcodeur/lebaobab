import { useState } from "react";
import { Link } from "react-router-dom";
import "./projectProviderHead.scss";

export const ProjectProviderHead = () => {
  const [activeLink, setActiveLink] = useState(""); // État pour suivre le lien actif

  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Met à jour l'état avec le lien actif
  };

  return (
    <div className="projectProviderHead">
      <Link 
        to=""
        className={activeLink === "offres" ? "active" : ""}
        onClick={() => handleLinkClick("offres")}
      >
        Offres
      </Link>
      
      <Link 
        to="ongoing-provider"
        className={activeLink === "ongoing" ? "active" : ""}
        onClick={() => handleLinkClick("ongoing")}
      >
        Travaux en Cours
      </Link>
      
      <Link 
        to="past-provider"
        className={activeLink === "past" ? "active" : ""}
        onClick={() => handleLinkClick("past")}
      >
        Travaux antérieurs
      </Link>
      
      <Link 
        to="services-provider"
        className={activeLink === "services" ? "active" : ""}
        onClick={() => handleLinkClick("services")}
      >
        Services
      </Link>
      
    
    </div>
  );
};
