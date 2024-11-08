import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const token = localStorage.getItem("token");

  // Si le token est manquant, redirige vers la page de connexion
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si le token est présent, permet l'accès aux sous-routes
  return <Outlet />;
};

export default AuthRoute;
