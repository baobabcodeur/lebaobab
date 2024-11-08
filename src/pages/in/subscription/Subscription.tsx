// src/pages/Subscription.tsx
import React, { useState } from 'react';
import './subscription.scss';

interface SubscriptionFormData {
  name: string;
  email: string;
  plan: string;
}

const Subscription = () => {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: '',
    email: '',
    plan: 'basic', // plan par défaut
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation de l'envoi des données via une API
      console.log('Form Submitted:', formData);
      // Simuler un délai avant de passer à l'état de succès
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionSuccess(true);
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="subscription">
      <div className="subscription-container">
        <h1>S'abonner à un Plan</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Entrez votre nom"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Entrez votre email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="plan">Choisir un Plan :</label>
            <select
              id="plan"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              required
            >
              <option value="basic">Basique</option>
              <option value="premium">Premium</option>
              <option value="pro">Pro</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'S\'abonner'}
          </button>

          {submissionSuccess && <p className="success-message">Abonnement réussi !</p>}
        </form>
      </div>
    </div>
  );
};

export default Subscription;
