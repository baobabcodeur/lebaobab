import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./workGrid.scss";
import { WorkCard } from "../workCard/WorkCard";

interface Work {
  id: number;
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

export const WorkGrid = () => {
  const [worksData, setWorksData] = useState<Work[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(5000000);
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const gridRef = useRef<HTMLDivElement>(null);

  // Fonction pour récupérer les données depuis l'API
  const fetchWorks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/projects-all");
      setWorksData(
        response.data.map((project: any) => ({
          id: project.id,
          image: project.imgFile,
          projectName: project.title,
          description: project.description,
          requiredSkills: project.requiredSkills || [],
          minBudget: parseFloat(project.budget),
          maxBudget: parseFloat(project.budget), // Ajuster selon les besoins
          projectType: project.type,
          duration: project.duration || 'Indéfini', // Par défaut, si la durée n'est pas définie
          city: project.city || 'Non spécifiée', // Par défaut, si la ville n'est pas définie
        }))
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMinBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinBudget(Number(e.target.value));
  };

  const handleMaxBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxBudget(Number(e.target.value));
  };

  const handleProjectTypeChange = (type: string) => {
    setSelectedProjectType(type === selectedProjectType ? null : type);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city === selectedCity ? null : city);
  };

  const uniqueCities = Array.from(new Set(worksData.map(work => work.city)));

  const filteredWorks = worksData.filter((work) => {
    const matchesSearch = work.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBudget = work.minBudget >= minBudget && work.maxBudget <= maxBudget;
    const matchesProjectType = !selectedProjectType || work.projectType === selectedProjectType;
    const matchesCity = !selectedCity || work.city === selectedCity;

    return matchesSearch && matchesBudget && matchesProjectType && matchesCity;
  });

  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const currentWorks = filteredWorks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="workGrid">
      <aside className="sidebar">
        <input
          type="text"
          placeholder="Rechercher un projet..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="filter-options">
          <h3>Filtrer par budget</h3>
          <label>
            Budget Min:
            <input
              type="number"
              value={minBudget}
              onChange={handleMinBudgetChange}
            />
          </label>
          <label>
            Budget Max:
            <input
              type="number"
              value={maxBudget}
              onChange={handleMaxBudgetChange}
            />
          </label>

          <h3>Filtrer par type de projet</h3>
          <label>
            <input
              type="checkbox"
              onChange={() => handleProjectTypeChange('en ligne')}
              checked={selectedProjectType === 'en ligne'}
            />
            En ligne
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleProjectTypeChange('présentiel')}
              checked={selectedProjectType === 'présentiel'}
            />
            Présentiel
          </label>

          <h3>Filtrer par ville</h3>
          {uniqueCities.map((city, index) => (
            <label key={`${city}-${index}`}>
              <input
                type="checkbox"
                onChange={() => handleCityChange(city)}
                checked={selectedCity === city}
              />
              {city}
            </label>
          ))}
        </div>
      </aside>

      <main className="grid-wrapper">
        <div className="grid-container" ref={gridRef}>
          {currentWorks.map((work) => (
            <a href="/login">
            <WorkCard key={work.id} {...work} />
            </a>
          ))}
        </div>
        
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
