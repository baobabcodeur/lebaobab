import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./providerGrid.scss";
import { ProviderCard } from "../providerCard/ProviderCard";

import { Link } from "react-router-dom";

interface Provider {
  id: number;
  name: string;
  description: string;
  imgFile: string;
  price: string;
  type: string;
}

export const ProviderGrid = () => {
  const [providersData, setProvidersData] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fonction pour récupérer les prestataires depuis l'API
  const fetchProviders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/providers');  // Remplacer par l'URL de votre API
      setProvidersData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des prestataires:", error);
    }
  };

  // Effectuer la récupération des prestataires lors du montage du composant
  useEffect(() => {
    fetchProviders();
  }, []);

  // Fonction pour gérer les changements de recherche
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Fonction pour gérer les changements de prix max
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  // Fonction pour gérer les changements de type de service
  const handleServiceTypeChange = (type: string) => {
    setSelectedServiceType(type === selectedServiceType ? null : type);
  };

  // Filtrage des prestataires selon les critères de recherche
  const filteredProviders = useMemo(() => {
    return providersData.filter((provider) => {
      const matchesSearch =
        (provider.name && provider.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (provider.description && provider.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesPrice = parseFloat(provider.price) <= maxPrice;
      const matchesServiceType = !selectedServiceType || provider.type === selectedServiceType;

      return matchesSearch && matchesPrice && matchesServiceType;
    });
  }, [providersData, searchTerm, maxPrice, selectedServiceType]);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
  const currentProviders = filteredProviders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="providerGrid">
      <aside className="sidebar">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="filter-options">
          <h3>Filtrer par tarif max</h3>
          <input
            type="range"
            min="0"
            max="1000000"
            value={maxPrice}
            onChange={handlePriceChange}
          />
          <span>{maxPrice} Fcfa</span>

          <h3>Filtrer par type de service</h3>
          <label>
            <input
              type="checkbox"
              onChange={() => handleServiceTypeChange('en ligne')}
              checked={selectedServiceType === 'en ligne'}
            />
            En ligne
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleServiceTypeChange('présentiel')}
              checked={selectedServiceType === 'présentiel'}
            />
            Présentiel
          </label>
        </div>
      </aside>

      <main className="grid-wrapper">
        
        <div className="grid-container">
          {currentProviders.map((provider) => (
         <a href="/login"> <ProviderCard key={provider.id} {...provider} /></a>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Précédent
          </button>
          <span>Page {currentPage} sur {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Suivant
          </button>
        </div>
      </main>
    </div>
  );
};
