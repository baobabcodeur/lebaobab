import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './editAnnouncement.scss';

interface Announcement {
    id: number;
    title: string;
    description: string;
    price: number;
    city: string;
    type: 'en ligne' | 'présentiel';
    number: string;
}

const EditAnnouncement: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAnnouncement = async () => {
            if (!token) {
                console.log('Token manquant, veuillez vous connecter.');
                return;
            }
            try {
                const response = await axios.get<Announcement>(`http://127.0.0.1:8000/api/urgent-ads/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAnnouncement(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'annonce', error);
            }
        };

        fetchAnnouncement();
    }, [id, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (announcement) {
            const { name, value } = e.target;
            setAnnouncement({
                ...announcement,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/urgent-ads/${id}`, announcement, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Annonce modifiée avec succès');
        } catch (error) {
            console.error('Erreur lors de la modification de l\'annonce', error);
        }
    };

    if (!announcement) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="edit-announcement-container">
            <h2>Modifier l'annonce</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={announcement.title}
                    onChange={handleChange}
                    required
                    placeholder="Titre de l'annonce"
                />
                <textarea
                    name="description"
                    value={announcement.description}
                    onChange={handleChange}
                    required
                    placeholder="Description de l'annonce"
                />
                <input
                    type="number"
                    name="price"
                    value={announcement.price}
                    onChange={handleChange}
                    required
                    placeholder="Prix"
                />
                <input
                    type="text"
                    name="city"
                    value={announcement.city}
                    onChange={handleChange}
                    placeholder="Ville"
                />
                <input
                    type="text"
                    name="number"
                    value={announcement.number}
                    onChange={handleChange}
                    required
                    placeholder="Numéro WhatsApp"
                />
                <select name="type" value={announcement.type} onChange={handleChange} required>
                    <option value="en ligne">En ligne</option>
                    <option value="présentiel">Présentiel</option>
                </select>
                <button type="submit">Soumettre</button>
            </form>
        </div>
    );
};

export default EditAnnouncement;
