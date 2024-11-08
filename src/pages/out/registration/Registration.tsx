import { useState } from "react"; // Importer useState pour gérer l'état
import axios from "axios"; // Assurez-vous que Axios est installé dans votre projet
import { Button } from "../../../components/button/Button";
import { Head } from "../../../components/head/Head"; // Ajout de Head pour une meilleure gestion du document
import { Input } from "../../../components/input/Input";
import { useNavigate } from "react-router-dom"; // Importer useNavigate pour la redirection
import "./registration.scss";

export const Registration = () => {
  // État pour les champs du formulaire
  const [nom, setNom] = useState(""); // Garder uniquement le nom complet
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState(""); // État pour la confirmation du mot de passe
  const [accord, setAccord] = useState(false); // État pour l'accord
  const navigate = useNavigate(); // Initialiser useNavigate

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Validation basique
    if (!nom || !email || !motDePasse || motDePasse !== confirmationMotDePasse || !accord) {
      alert("Veuillez remplir tous les champs, vérifier la confirmation du mot de passe, et accepter les conditions.");
      return;
    }

    // Envoyer les données à l'API
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: nom, // Changer la clé à 'name' selon la structure attendue par l'API
        email,
        password: motDePasse, // Utilisez 'password' comme clé pour l'API
        password_confirmation: confirmationMotDePasse, // Ajouter la confirmation du mot de passe
      });
      
      console.log("Inscription réussie", response.data);
      // Rediriger vers la page de confirmation en passant les informations nécessaires
      navigate("/confirm", { state: { email, name: nom, password: motDePasse } }); // Passer les données à la page de confirmation
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="registration">
   {/* Ajouter Head pour améliorer la structure de la page */}
      <div className="logo">
        <a href="/"><h1><span>Le</span>Baobab</h1></a>  
        <p>Déléguez les tâches et offrez-vous <br /> les meilleurs services de prestation</p>
      </div>
      <form onSubmit={handleSubmit}> {/* Formulaire pour gérer la soumission */}
        <div className="form">
          <Input 
            type="text" 
            name="Nom" 
            placeholder="Nom complet" // Modifier le placeholder
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
            required // Ajouter un champ requis
          />
          <Input 
            type="email" // Utiliser type="email" pour la validation d'email
            name="Email" 
            placeholder="Entrez votre email" // Ajout d'un placeholder
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required // Ajouter un champ requis
          />
          <Input 
            type="password" 
            name="Mot de passe" 
            placeholder="Entrez votre mot de passe" // Ajout d'un placeholder
            value={motDePasse} 
            onChange={(e) => setMotDePasse(e.target.value)} 
            required // Ajouter un champ requis
          />
          <Input 
            type="password" 
            name="Confirmation du mot de passe" 
            placeholder="Confirmez votre mot de passe" // Ajout d'un placeholder
            value={confirmationMotDePasse} 
            onChange={(e) => setConfirmationMotDePasse(e.target.value)} 
            required // Ajouter un champ requis
          />
          
          <div className="accord">
            <input type="checkbox" checked={accord} onChange={() => setAccord(!accord)} required /> {/* Ajouter required ici */}
            <a href="">J'accepte l'Accord Utilisateur et la Politique de Confidentialité de LeBaobab.</a>
          </div>
          
          <Button 
            type="submit" // Définir le type du bouton
            link="" // Le lien peut être utilisé si vous redirigez via ce bouton
            name="Rejoindre LeBaobab" 
            bg="#4caf50" 
            border="none" 
            color="" 
          />
        </div>
      </form>
    </div>
  );
}
