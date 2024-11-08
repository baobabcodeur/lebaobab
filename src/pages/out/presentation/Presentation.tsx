import React, { useState } from "react"; // Importer useState
import { Button } from "../../../components/button/Button";
import { Carousel } from "../../../components/carousel/Carousel";
import { Input } from "../../../components/input/Input";
import "./presentation.scss";

export const Presentation = () => {
  const images = [
    "Entretien-region-ville.jpg",
    "Sokodé-centre-ville.jpg",
    "1006434-Lomé.jpg",
    "Sokodé-centre-ville.jpg",
    "Entretien-region-ville.jpg",
    "1006434-Lomé.jpg",
    "Entretien-region-ville.jpg",
    "1006434-Lomé.jpg",
    "Entretien-region-ville.jpg",
    "Sokodé-centre-ville.jpg",
    "1006434-Lomé.jpg",
    "1006434-Lomé.jpg",
  ];

  // États pour les champs d'entrée
  const [role, setRole] = useState(""); // Pour le rôle recherché
  const [location, setLocation] = useState(""); // Pour la ville/région

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value); // Met à jour l'état avec la valeur du champ
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value); // Met à jour l'état avec la valeur du champ
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("Recherche pour :", role, "dans :", location);
    // Ici, vous pouvez faire la recherche ou la redirection nécessaire
  };

  return (
    <div className="presentation">
      <div className="container">
        <div className="info">
          <h2>
            Nous connectons les entreprises et les <br />
            particuliers avec les meilleurs experts <br />
            indépendants.
          </h2>
          <p>
            Nous vous permettons de travailler et contractualiser sereinement avec notre <br />
            communauté d'experts indépendants et notre réseau de PME et Start-Up.
          </p>
          <div className="btn">
            <form onSubmit={handleSearch}> {/* Formulaire pour gérer la recherche */}
              <Input
                type="text"
                name="Développeur, peintre"
                value={role}
                onChange={handleRoleChange}
                placeholder="Développeur, peintre"
              />
              <Input
                type="text"
                name="Ville, région"
                value={location}
                onChange={handleLocationChange}
                placeholder="Ville, région"
              />
              <Button
                link="provider" // Vous pouvez changer cette route si nécessaire
                name="Rechercher"
                bg="#343891"
                border="none"
                color=""
                type="submit" // Type submit pour envoyer le formulaire
              />
            </form>
          </div>
        </div>
        <div className="mask">
          <div className="mask1"></div>
        </div>
      </div>

      <div className="partenaire">
        <img src="logoadn.png" alt="Logo Partenaire 1" />
        <img src="logoadn.png" alt="Logo Partenaire 2" />
        <img src="logoadn.png" alt="Logo Partenaire 3" />
        <img src="logoadn.png" alt="Logo Partenaire 4" />
      </div>

      <div className="fonctionnement">
        <div className="qr">
          <h3>Vous souhaitez nous confier votre <br /> recherche?</h3>
          <p>
            Nous mettons notre équipe d’experts à votre service pour 
            qualifier votre besoin et trouver les bonnes ressources en 48h.
          </p>
          <Button
            link="/otp-info"
            name="Confier-nous votre besoin"
            bg="#4caf50"
            border="none"
            color="white"
          />
        </div>
        <div className="arbre">
          <span>MAINTENANT</span>
          <div className="separator"></div>
          <p>Confiez-nous dès <span>maintenant</span>  votre besoin via le formulaire de brief</p>
          <div className="separator"></div>
          <p>Nous vous recontactons en <span>moins de 12h</span>  pour qualifier votre besoin</p>
          <div className="separator"></div>
          <p>Recevez en <span>moins de 48h</span>  des profils prêts à travailler seuls ou en équipe</p>
          <div className="separator"></div>
          <p> <span>Validez</span> votre équipe et profitez de nos outils de gestion de projet en ligne !</p>
          <div className="separator"></div>
          <span>max 2h</span>
        </div>
      </div>

      <div className="prestataire">
        <div className="img">
          <img src="1628849447212.jpg" alt="Prestataire 1" />
          <img src="zuck.jpg" alt="Prestataire 2" />
        </div>
        <div className="presta">
          <h3>Les métiers de nos Prestataires</h3>
          <p>
            Les métiers évoluent rapidement et de nouveaux <br />
            métiers voient le jour. <span>LeBaobab</span> vous permet ici de <br />
            découvrir les métiers de nos experts indépendants.
          </p>
          <Button
            link=""
            name="Tous les Métiers"
            bg="white"
            border="1px solid #1A8B62"
            color="#1A8B62"
          />
        </div>
      </div>

      <div className="offre">
        <div className="of">
          <h3>Trouvez un freelance près de chez vous</h3>
          <a href=""><span>Toutes les villes</span></a>
        </div>
        <Carousel images={images} />
      </div>
    </div>
  );
};
