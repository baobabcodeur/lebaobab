// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { getProjectsCount, getAdsCount, getServicesCount} from '../../../dataServices';
import './dashboard.scss';
import { StatsBox } from '../../../components/statsBox/StatsBox';

export const Dashboard = () => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [adsCount, setAdsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Récupération des données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await getProjectsCount();
        const ads = await getAdsCount();
        const services = await getServicesCount();
        // const revenue = await getTotalRevenue();

        setProjectsCount(projects);
        setAdsCount(ads);
        setServicesCount(services);
        // setTotalRevenue(revenue);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-section">
        <StatsBox title="Nombre de Projets" value={projectsCount} description="Nombre total de projets créés" />
      </div>
      <div className="dashboard-section">
        <StatsBox title="Nombre d'Annonces" value={adsCount} description="Nombre total d'annonces publiées" />
      </div>
      <div className="dashboard-section">
        <StatsBox title="Montant Total (Fcfa)" value={totalRevenue} description="Revenu total généré par les projets" />
      </div>
      <div className="dashboard-section">
        <StatsBox title="Nombre de Services" value={servicesCount} description="Nombre total de services proposés" />
      </div>
    </div>
  );
};
