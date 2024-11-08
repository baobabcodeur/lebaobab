import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { Button } from "../../../components/button/Button";
import { Input } from "../../../components/input/Input";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [error, setError] = useState(""); // État pour gérer les erreurs
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction de gestion de la connexion
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });

      // Si la réponse est réussie, stockez le token, l'ID utilisateur, et le nom
      if (response.data) {
        localStorage.setItem("token", response.data.user.token); // Stocker le token dans le localStorage
        localStorage.setItem("userId", response.data.user.id.toString()); // Stocker l'ID utilisateur
        localStorage.setItem("username", response.data.user.name); // Stocker le nom d'utilisateur
        navigate("/dashboard"); // Redirige vers le tableau de bord
      }
    } catch (error: any) {
      console.error("Erreur de connexion", error); // Journalisez l'erreur
      setError("Email ou mot de passe incorrect."); // Mettez à jour le message d'erreur
    }
  };

  // Gestion des changements d'email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Mettez à jour l'état de l'email
  };

  // Gestion des changements de mot de passe
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // Mettez à jour l'état du mot de passe
  };

  return (
    <div className="login">
      <div className="logo">
        <a href="/">
          <h1>
            <span>Le</span>Baobab
          </h1>
        </a>
        <p>
          Déléguez les tâches et offrez-vous <br /> les meilleurs services de prestation
        </p>
      </div>
      <div className="form">
        <form onSubmit={handleLogin}>
          {error && <p className="error">{error}</p>} {/* Afficher le message d'erreur */}
          <Input
            type="text"
            name="Email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <Input
            type="password" // Champ de mot de passe
            name="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Mot de passe"
          />
          <Button
            type="submit"
            link=""
            name="Se connecter"
            bg="white"
            border="1px solid black"
            color="black"
          />
          <Link to="/identify">Mot de passe oublié?</Link> {/* Lien pour récupérer le mot de passe */}
          <Button
            link="/registration"
            name="Créer un nouveau compte"
            bg="#4caf50"
            border="none"
            color=""
            type="button"
          />
        </form>
      </div>
    </div>
  );
};
