import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pendingProjectsGrid.scss';

interface Project {
  id: number;
  title: string;
  description: string;
  user_id: number;
  status: string;
  imgFile: string;
  budget: number;
  type: string;
}

const PendingProjectsGrid: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
  const [totalPages, setTotalPages] = useState<number>(1); // Nombre total de pages
  const [itemsPerPage] = useState<number>(5); // Nombre d'éléments par page (fixé)
  
  const [searchTerm, setSearchTerm] = useState<string>(''); // Recherche
  const [selectedType, setSelectedType] = useState<string>(''); // Filtre par type
  
  const token = localStorage.getItem('token');

  // Fonction pour récupérer les projets en attente depuis l'API
  const fetchPendingProjects = async (page: number = 1) => {
    setLoading(true); // Démarre le loader
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/projects?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token Bearer dans l'en-tête
        },
      });

      console.log('Réponse de l\'API:', response.data);

      // Filtrer les projets en fonction de leur statut
      if (Array.isArray(response.data)) {
        const pendingProjects = response.data.filter(
          (project: Project) => project.status === 'en attente'
        );

        setProjects(pendingProjects);
        setFilteredProjects(pendingProjects);
        setTotalPages(Math.ceil(pendingProjects.length / itemsPerPage)); // Calculer le nombre total de pages
      } else {
        setErrorMessages(['Les données sont mal formatées ou manquantes.']);
      }
    } catch (error: any) {
      console.error('Erreur lors de la récupération des projets en attente:', error);
      setErrorMessages([error.message || 'Erreur lors de la récupération des projets.']);
    } finally {
      setLoading(false); // Arrêter le loader
    }
  };

  // Utilisation de useEffect pour récupérer les projets à chaque chargement du composant
  useEffect(() => {
    if (token) {
      fetchPendingProjects(currentPage);
    } else {
      setErrorMessages(['Token manquant, veuillez vous connecter.']);
    }
  }, [currentPage, token]);

  // Fonction pour gérer le changement de page
  const handlePagination = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fonction pour filtrer les projets par type et recherche
  const handleSearchAndFilter = () => {
    let filtered = [...projects];

    // Filtrer par type
    if (selectedType) {
      filtered = filtered.filter(project => project.type === selectedType);
    }

    // Filtrer par recherche (titre et description)
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // Mettre à jour le nombre total de pages après filtrage
    setCurrentPage(1); // Réinitialiser à la première page après un nouveau filtre
  };

  // Calculer les projets à afficher pour la page actuelle
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="pending-projects-grid">
      <h2>Liste des offres disponibles</h2>

      {/* Affichage des erreurs */}
      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((msg, index) => (
            <p key={index} className="error">{msg}</p>
          ))}
        </div>
      )}

      {/* Filtrage et recherche */}
      <div className="filters">
        <input 
          type="text" 
          placeholder="Rechercher par titre ou description"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Filtrer par type</option>
          <option value="en ligne">En ligne</option>
          <option value="présentiel">Présentiel</option>
        </select>
        <button onClick={handleSearchAndFilter}>Appliquer</button>
      </div>

      {/* Grille des projets */}
      <div className="grid-container">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <div key={project.id} className="grid-item">
                <img src={` http://127.0.0.1:8000/storage/${project.imgFile}`} alt={project.title} />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p>Status: {project.status}</p>
                <p>Type: {project.type}</p>
                <p>Budget: {project.budget}</p>
                <button>Postuler</button>
              </div>
            ))
          ) : (
            <p>Aucun projet en attente correspondant aux critères.</p>
          )
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default PendingProjectsGrid;
