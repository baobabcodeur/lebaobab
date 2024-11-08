import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './inAnnouncementGrid.scss';

interface Announcement {
    id: number;
    title: string;
    description: string;
    price: number;
    city: string;
    type: 'en ligne' | 'présentiel';
    number: string;
    file_path: string;
    valid_until: string;
    user_id: string;
}

export const InAnnouncementGrid: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
        title: '',
        description: '',
        price: 0,
        city: '',
        type: 'en ligne',
        number: '',
        valid_until: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');

    const itemsPerPage = 8;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get<Announcement[]>('http://127.0.0.1:8000/api/urgent-ads', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Filtrer les annonces par user_id
            const filteredAnnouncements = response.data.filter(
                announcement => parseInt(announcement.user_id) === parseInt(userId!)
            );

            setAnnouncements(filteredAnnouncements);
        } catch (error) {
            console.error('Erreur lors de la récupération des annonces', error);
        }
    };

    useEffect(() => {
        if (token && userId) {
            fetchAnnouncements();
        } else {
            console.log('Token ou User ID manquant, veuillez vous connecter.');
        }
    }, [token, userId]);

    // Fonction pour supprimer une annonce
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/urgent-ads/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchAnnouncements();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'annonce', error);
        }
    };

    // Fonction pour soumettre la nouvelle annonce
    const handleCreateAnnouncement = async () => {
        try {
            // Validation des champs avant soumission
            if (!newAnnouncement.title || !newAnnouncement.description || !newAnnouncement.price || !newAnnouncement.city || !newAnnouncement.number || !newAnnouncement.valid_until) {
                setError("Tous les champs sont requis.");
                return;
            }

            const formData = new FormData();
            formData.append('title', newAnnouncement.title!);
            formData.append('description', newAnnouncement.description!);
            formData.append('price', newAnnouncement.price!.toString());
            formData.append('city', newAnnouncement.city!);
            formData.append('type', newAnnouncement.type!);
            formData.append('number', newAnnouncement.number!);
            formData.append('valid_until', newAnnouncement.valid_until!);
            formData.append('user_id', userId!); // Assigner l'ID utilisateur

            if (imageFile) {
                formData.append('file', imageFile);
            }

            const response = await axios.post('http://127.0.0.1:8000/api/urgent-ads', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setAnnouncements([...announcements, response.data]);

            // Planifier la suppression automatique après 24 heures
            const announcementId = response.data.id;
            setTimeout(() => {
                handleDelete(announcementId);
            }, 0 * 2 * 60 * 1000); // 24 heures en millisecondes

            setShowModal(false);
            setNewAnnouncement({
                title: '',
                description: '',
                price: 0,
                city: '',
                type: 'en ligne',
                number: '',
                valid_until: '',
            });
            setImageFile(null);
        } catch (error: any) {
            console.error('Erreur lors de la création de l\'annonce:', error.response?.data);
            setError("Erreur lors de la création de l'annonce.");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    };

    return (
        <div className="announcement-grid">
            <h2>Mes Annonces</h2>
            <input 
                type="text" 
                placeholder="Filtrer par titre ou ville" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
            />
            <div className="grid">
                {announcements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((announcement) => (
                    <div className="card" key={announcement.id}>
                        {announcement.file_path && (
                            <img src={announcement.file_path} alt={announcement.title} className="announcement-image" />
                        )}
                        <h3>{announcement.title}</h3>
                        <p>{announcement.description}</p>
                        <p>Prix : {announcement.price} FCFA</p>
                        <p>Ville : {announcement.city}</p>
                        <p>Type : {announcement.type}</p>
                        <button onClick={() => handleDelete(announcement.id)}>Supprimer</button>
                    </div>
                ))}
            </div>

            <button onClick={() => setShowModal(true)}>Créer une Nouvelle Annonce</button>

            {showModal && (
                <div className="modal">
                    <h2>Nouvelle Annonce</h2>
                    <input type="text" placeholder="Titre" value={newAnnouncement.title || ''} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} />
                    <textarea placeholder="Description" value={newAnnouncement.description || ''} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}></textarea>
                    <input type="number" placeholder="Prix" value={newAnnouncement.price || 0} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, price: parseFloat(e.target.value) })} />
                    <input type="text" placeholder="Ville" value={newAnnouncement.city || ''} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, city: e.target.value })} />
                    <input type="text" placeholder="Type" value={newAnnouncement.type || 'en ligne'} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value as 'en ligne' | 'présentiel' })} />
                    <input type="text" placeholder="Numéro de contact" value={newAnnouncement.number || ''} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, number: e.target.value })} />
                    <input type="date" value={newAnnouncement.valid_until || ''} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, valid_until: e.target.value })} />
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleCreateAnnouncement}>Enregistrer</button>
                    <button onClick={() => setShowModal(false)}>Annuler</button>
                </div>
            )}

            <div className="pagination">
                {Array.from({ length: Math.ceil(announcements.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>{index + 1}</button>
                ))}
            </div>
        </div>
    );
};
