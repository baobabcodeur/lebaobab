import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importer useNavigate au lieu de useHistory
import { Button } from "../../../components/button/Button";
import { Head } from "../../../components/head/Head";
import { Input } from "../../../components/input/Input";
import "./recovery.scss";

export const Recovery = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email :", email, "Code de récupération :", code);

    // Redirection vers la vue `Password` avec email et otp dans les paramètres d'URL
    navigate(`/password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(code)}`);
  };

  return (
    <div className="recovery">
      <Head />
      <div className="containerR">
        <p>
          Un code de récupération vous a été envoyé à <br />
          l’adresse {email || "votre adresse e-mail"}
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="Saisir le code"
            value={code}
            onChange={handleCodeChange}
            placeholder="Saisir le code"
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
          LeBaobab 2024 - Powered & design by <a href="mailto:jeanamekpod@gmail.com">jeanamekpod@gmail.com</a>
        </div>
      </div>
    </div>
  );
};
