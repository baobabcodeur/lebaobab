import React from "react";
import "./workCard.scss";

interface WorkCardProps {
  image: string;
  projectName: string;
  description: string;
  requiredSkills: string[];
  minBudget: number;
  maxBudget: number;
  projectType: 'en ligne' | 'présentiel';
  duration: string;
  city: string;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  image,
  projectName,
  description,
  requiredSkills,
  minBudget,
  maxBudget,
  projectType,
  duration,
  city,
}) => {
  return (
    <div className="workCard">
      <img src={`http://localhost:8000/storage/${image}`} alt={projectName} className="project-image" />
      <div className="work-info">
        <h2 className="project-name">{projectName}</h2>
        <p className="description">{description}</p>
        <p><strong>Compétences nécessaires :</strong> {requiredSkills.join(", ")}</p>
        <p><strong>Budget :</strong> {minBudget} Fcfa</p>
        <p><strong>Type de projet :</strong> {projectType}</p>
        <p><strong>Durée :</strong> {duration}</p>
        <p><strong>Ville :</strong> {city}</p>
        <button className="apply-button">Postuler</button>
      </div>
    </div>
  );
};
