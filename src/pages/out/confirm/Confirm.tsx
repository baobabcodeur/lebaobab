import React, { useState } from "react";
import axios from "axios"; // Importing axios for API requests
import { Button } from "../../../components/button/Button";
import { Head } from "../../../components/head/Head";
import { Input } from "../../../components/input/Input";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import "./confirm.scss";

export const Confirm = () => {
  const location = useLocation(); // Récupérer les données passées
  const { email, name, password } = location.state || {}; // Extraire les données

  const [code, setCode] = useState(""); // State for the recovery code
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value); // Update state with input value
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Set loading to true

    // Data to send in the request
    const data = {
      email: email, // Use the email passed from registration
      otp: code, // OTP code entered by the user
      name: name, // Use the name passed from registration
      password: password, // Use the password passed from registration
      password_confirmation: password, // Confirm password
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/otp/verify", data);
      console.log("Response:", response.data);
      // Redirect to the dashboard upon successful verification
      navigate("/login"); // Change to the actual path of your dashboard
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred"); // Set error message
      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="confirm">
      <Head />
      <div className="containerC">
        <p>
          Un code de récupération vous a été envoyé à <br /> l’adresse {email}
        </p>
        <form onSubmit={handleSubmit}> {/* Form for handling submission */}
          <Input
            type="text"
            name="Saisir le code"
            value={code} // Controlled value
            onChange={handleCodeChange} // Change handler
            required // Make this field required
          />
          <Button
            link=""
            name={loading ? "Envoi..." : "Suivant"} // Change button text based on loading state
            bg="#1A8B62"
            border="none"
            color=""
            type="submit" // Submit type for the form
            disabled={loading} // Disable button while loading
          />
        </form>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <div className="sign">
          LeBaobab 2024 - Powered & designed by <a href="mailto:jeanamekpod@gmail.com">jeanamekpod@gmail.com</a>
        </div>
      </div>
    </div>
  );
};
