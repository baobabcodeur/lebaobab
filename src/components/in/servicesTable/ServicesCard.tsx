import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './servicesCard.scss';

// Définir les interfaces pour Service et User (l'utilisateur/freelance)
interface Service {
    id: number;
    name: string;
    description: string;
    status: string;
    freelancerId: number; // Clé étrangère pointant vers l'utilisateur (freelancer)
    price: number;
    category: string;
    imgFile?: string;
    type: string;
}

interface User {
    id: number;
    name: string; // Nom de l'utilisateur (freelance)
}

const ServicesCard: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [users, setUsers] = useState<User[]>([]); // Stocke les utilisateurs (freelances)
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedType, setSelectedType] = useState(''); // Filtre par type de service (en ligne ou présentiel)

    const token = localStorage.getItem('token');

    // Fonction pour récupérer les services
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/services', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServices(response.data);
            setFilteredServices(response.data);  // Initialement, tous les services sont affichés
        } catch (error) {
            console.error('Erreur lors de la récupération des services', error);
        }
    };

    // Fonction pour récupérer les utilisateurs (freelances)
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs', error);
        }
    };

    // Charger les services et utilisateurs au démarrage du composant
    useEffect(() => {
        fetchServices();
        fetchUsers();
    }, [token]);

    // Fonction pour récupérer le nom de l'utilisateur (freelance) en fonction de l'id
    const getUserName = (userId: number) => {
        const user = users.find((u) => u.id === userId);
        return user ? user.name : 'Inconnu';
    };

    // Filtrer les services en fonction de la recherche et du type
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        const filtered = services.filter((service) => {
            const nameMatch = service.name && service.name.toLowerCase().includes(e.target.value.toLowerCase());
            const categoryMatch = service.category && service.category.toLowerCase().includes(e.target.value.toLowerCase());
            return nameMatch || categoryMatch;
        });
        setFilteredServices(filtered);
        setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
    };

    // Filtrer par type de service (en ligne ou présentiel)
    const handleFilterType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
        const filtered = services.filter((service) => {
            // Si aucun type n'est sélectionné, on affiche tous les services
            if (!e.target.value) return true;
            return service.type.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredServices(filtered);
        setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
    };

    // Calculer les services à afficher pour la page actuelle
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);

    // Changer de page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="services-container">
            <div className="filters">
                <div className="search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Rechercher par nom ou catégorie"
                    />
                </div>

                <div className="type-filter">
                    <select onChange={handleFilterType} value={selectedType}>
                        <option value="">Filtrer par type</option>
                        <option value="en ligne">En ligne</option>
                        <option value="présentiel">Présentiel</option>
                    </select>
                </div>
            </div>

            <div className="services-list">
                {currentServices.map((service) => (
                    <div className="service-card" key={service.id}>
                        <div className="service-card-header">
                            <h3>{service.name}</h3>
                            <span>{getUserName(service.freelancerId)}</span> {/* Récupération du nom du freelance */}
                        </div>
                        <div className="service-card-body">
                            <img
                                src={`http://127.0.0.1:8000/storage/${service.imgFile}`}
                                alt={service.name}
                                className="service-image"
                            />
                            <p>{service.description}</p>
                        </div>
                        <div className="service-card-footer">
                            <span>{service.category}</span>
                            <span>{service.price} Fcfa</span>
                            <span>{service.type}</span> {/* Affichage du type de service */}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Précédent
                </button>
                {Array.from({ length: Math.ceil(filteredServices.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredServices.length / itemsPerPage)}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default ServicesCard;
