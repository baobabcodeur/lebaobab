import React, { useState } from "react";
import axios from "axios";
import { Button } from "../../../components/button/Button";
import { Head } from "../../../components/head/Head";
import { Input } from "../../../components/input/Input";
import "./identify.scss";

export const Identify = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      console.log("Email envoyé :", email);

      const response = await axios.post("http://127.0.0.1:8000/api/password/reset/request", {
        email: email,
      });

      console.log("Réinitialisation du mot de passe réussie :", response.data);
      setSuccessMessage("Un lien de réinitialisation a été envoyé à votre adresse e-mail.");

      // Rediriger vers la page de récupération avec l'email en paramètre
      setTimeout(() => {
        window.location.href = `/recovery?email=${encodeURIComponent(email)}`; // Encode email pour éviter les problèmes de caractères
      }, 2000);
    } catch (error: any) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message || "Une erreur est survenue. Veuillez réessayer.");
        } else if (error.request) {
          setError("Erreur réseau. Aucune réponse du serveur.");
        }
      } else {
        setError("Erreur inconnue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="identify">
      <Head />
      <div className="container">
        <p>
          Saisissez votre adresse e-mail de
          LeBaobab <br /> pour que nous puissions
          réinitialiser votre mot de passe.
        </p>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Button
            name="Suivant"
            bg="#1A8B62"
            border="none"
            color=""
            type="submit"
          />
        </form>
        <div className="sign">
          LeBaobab 2024 - Powered & designed by <a href="mailto:jeanamekpod@gmail.com">jeanamekpod@gmail.com</a>
        </div>
      </div>
    </div>
  );
};
