import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './allAnnouncement.scss';

// Interface pour définir le type d'une annonce
interface Announcement {
    id: number;
    title: string;
    description: string;
    price: string; // Le prix est une chaîne de caractères selon votre échantillon JSON
    city: string;
    type: 'en ligne' | 'présentiel';
    number: string; // Numéro de téléphone pour identifier l'utilisateur
    file_path: string; // URL de l'image
}

export const AllAnnouncement: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [filter, setFilter] = useState<string>(''); // Filtre de recherche
    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [announcementsPerPage] = useState<number>(10); // Nombre d'annonces par page
    const token = localStorage.getItem('token'); // Token pour l'autorisation
    const currentUserNumber = localStorage.getItem('userNumber'); // Numéro de téléphone de l'utilisateur connecté

    // Fonction pour récupérer les annonces depuis l'API
    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get<Announcement[]>('http://127.0.0.1:8000/api/urgent-ads', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAnnouncements(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des annonces', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAnnouncements();
        } else {
            console.log('Token manquant, veuillez vous connecter.');
        }
    }, [token]);

    // Filtrer les annonces en fonction de l'entrée utilisateur et exclure les annonces de l'utilisateur connecté
    const filteredAnnouncements = announcements.filter(announcement => 
        (announcement.title.toLowerCase().includes(filter.toLowerCase()) ||
         announcement.city.toLowerCase().includes(filter.toLowerCase())) &&
        announcement.number !== currentUserNumber // Exclure les annonces de l'utilisateur connecté
    );

    // Obtenir les annonces actuelles selon la page actuelle
    const indexOfLastAnnouncement = currentPage * announcementsPerPage;
    const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
    const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

    // Changer de page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);

    return (
        <div className="all-announcement">
            <h2>Toutes les Annonces</h2>
            <input className='large'
                type="text" 
                placeholder="Filtrer par titre ou ville" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
            />
            <div className="announcement-list">
                {currentAnnouncements.length > 0 ? (
                    currentAnnouncements.map((announcement) => (
                        <div className="announcement-item" key={announcement.id}>
                            {announcement.file_path && ( // Utiliser file_path pour l'image
                                <img src={announcement.file_path} alt={announcement.title} className="announcement-image" />
                            )}
                            <h3>{announcement.title}</h3>
                            <p>{announcement.description}</p>
                            <p>Prix : {announcement.price} FCFA</p>
                            <p>Ville : {announcement.city}</p>
                            <p>Type : {announcement.type}</p>
                            <a href={`https://wa.me/${announcement.number}`}>
                               <span> Contacter l'annonceur</span>
                                <img src="/icons8-whatsapp.png" alt="logo-whatsapp" />
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Aucune annonce trouvée.</p>
                )}
            </div>
            {/* Contrôles de pagination */}
            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index + 1} 
                        onClick={() => paginate(index + 1)} 
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
