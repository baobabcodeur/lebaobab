import "./createAdModal.scss";
import { useState } from 'react';
import axios from 'axios';

// Définir le type des props
type CreateAdModalProps = {
    onClose: () => void; // Fonction qui ne prend pas d'arguments et ne retourne rien
};

export const CreateAdModal = ({ onClose }: CreateAdModalProps) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        city: '',
        type: 'en ligne',
        number: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/urgent-ads', formData);
            alert('Annonce créée avec succès');
            onClose();
        } catch (error) {
            console.error('Erreur lors de la création de l\'annonce', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Créer une nouvelle annonce</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Titre" onChange={handleChange} required />
                    <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
                    <input type="number" name="price" placeholder="Prix" onChange={handleChange} required />
                    <input type="text" name="city" placeholder="Ville" onChange={handleChange} />
                    <input type="text" name="number" placeholder="Numéro WhatsApp" onChange={handleChange} required />
                    <select name="type" onChange={handleChange}>
                        <option value="en ligne">En ligne</option>
                        <option value="présentiel">Présentiel</option>
                    </select>
                    <button type="submit">Soumettre</button>
                    <button type="button" onClick={onClose}>Annuler</button>
                </form>
            </div>
        </div>
    );
};
