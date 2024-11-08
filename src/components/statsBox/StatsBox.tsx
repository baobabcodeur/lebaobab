// src/components/statsBox/StatsBox.tsx
import React from 'react';
import './StatsBox.scss';

interface StatsBoxProps {
  title: string;
  value: number;
  description: string;
}

export const StatsBox: React.FC<StatsBoxProps> = ({ title, value, description }) => {
  return (
    <div className="stats-box">
      <h3>{title}</h3>
      <p className="stats-value">{value}</p>
      <p className="stats-description">{description}</p>
    </div>
  );
};
