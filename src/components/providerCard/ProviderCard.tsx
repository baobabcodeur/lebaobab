import React from "react";
import "./providerCard.scss";


interface ProviderCardProps {
  id: number;
  name: string;
  description: string;
  imgFile: string;
  price: string;
  type: string;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ name, description, imgFile, price, type }) => {
  return (
    <div className="providerCard">
      <img src={`http://localhost:8000/storage/${imgFile}`} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Type de service : {type}</p>
      <p>Prix : {price} FCFA</p>
    </div>
  );
};
