import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../../components/button/Button";
import { Head } from "../../../components/head/Head";
import { Input } from "../../../components/input/Input";
import "./password.scss";

export const Password = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");
    const otpParam = queryParams.get("otp");

    if (emailParam) setEmail(emailParam);
    if (otpParam) setOtp(otpParam);
  }, [location]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/password/reset", {
        email: email,
        otp: otp,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      console.log("Réinitialisation réussie :", response.data);
      
      // Rediriger vers la page de connexion
      navigate("/login");
      
    } catch (error: any) {
      console.error("Erreur de réinitialisation :", error);
      setError("Une erreur est survenue lors de la réinitialisation.");
    }
  };

  return (
    <div className="password">
      <Head />
      <div className="containerP">
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            name="Saisir un nouveau mot de passe"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Entrez votre nouveau mot de passe" // Placeholder ajouté
          />
          <Input
            type="password"
            name="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirmez votre nouveau mot de passe" // Placeholder ajouté
          />
          {error && <p className="error">{error}</p>}
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
