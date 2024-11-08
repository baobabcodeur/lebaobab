import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './servicesTable.scss';

interface Service {
    id: number;
    name: string;  // Remplacer title par name
    description: string;
    status: string;
    freelancerId: number;  // L'ID du freelancer (utilisateur connecté)
    imgFile?: File | null;
    price: number;
    category: string;
    type: string;  // Le type (en ligne, présentiel)
}

const ServicesTable: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [newService, setNewService] = useState<Service>({
        id: 0,
        name: '',  // Remplacer title par name
        description: '',
        status: 'en attente',
        freelancerId: 0,  // Initialisé à 0 mais mis à jour à partir du localStorage
        imgFile: null,
        price: 0,
        category: 'en ligne',
        type: 'en ligne',
    });
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem('token');
    const freelancerId = localStorage.getItem('userId');  // Récupérer l'ID de l'utilisateur connecté (freelancerId)

    // Effectuer la récupération des services
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/services', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Filtrer les services pour n'afficher que ceux de l'utilisateur connecté
            const filteredServices = response.data.filter((service: Service) => service.freelancerId === parseInt(freelancerId || '0'));
            setServices(filteredServices);
        } catch (error) {
            console.error('Erreur lors de la récupération des services', error);
        }
    };

    // Charger les services au chargement du composant
    useEffect(() => {
        if (token && freelancerId) {
            fetchServices();
        } else {
            console.log('Token ou ID utilisateur manquants, veuillez vous connecter.');
        }
    }, [token, freelancerId]);

    // Créer un nouveau service
    const handleCreate = async () => {
        const formData = new FormData();
        formData.append('name', newService.name);  // Utilisation de name
        formData.append('description', newService.description);
        formData.append('status', newService.status);
        formData.append('freelancerId', freelancerId || '');  // Assurez-vous que freelancerId est bien passé
        formData.append('price', newService.price.toString());
        formData.append('category', newService.category);
        formData.append('type', newService.type);

        if (newService.imgFile) {
            formData.append('imgFile', newService.imgFile);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/services', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setServices([...services, response.data]);
            setNewService({
                id: 0,
                name: '',  // Utilisation de name
                description: '',
                status: 'en attente',
                freelancerId: parseInt(freelancerId || '1'),  // Utiliser freelancerId ici
                imgFile: null,
                price: 0,
                category: 'en ligne',
                type: 'en ligne',
            });
        } catch (error) {
            console.error('Erreur lors de la création du service', error);
        }
    };

    // Modifier un service existant
    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsEditing(true);
    };

    // Mettre à jour un service
    const handleUpdate = async () => {
        if (!editingService) return;

        const formData = new FormData();
        formData.append('name', editingService.name);  // Utilisation de name
        formData.append('description', editingService.description);
        formData.append('status', editingService.status);
        formData.append('freelancerId', freelancerId || '');  // Assurez-vous que freelancerId est bien passé
        formData.append('price', editingService.price.toString());
        formData.append('category', editingService.category);
        formData.append('type', editingService.type);

        if (editingService.imgFile) {
            formData.append('imgFile', editingService.imgFile);
        }

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/services/${editingService.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setServices(services.map(serv => (serv.id === editingService.id ? response.data : serv)));
            setEditingService(null);
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du service', error);
        }
    };

    // Supprimer un service
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/services/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServices(services.filter(service => service.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du service', error);
        }
    };

    return (
        <div className="services-table">
            <h2>Gestion des Services</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>  {/* Affichage de name */}
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.name}</td>  {/* Affichage de name */}
                            <td>{service.description}</td>
                            <td>
                                <button onClick={() => handleEdit(service)}>Modifier</button>
                                <button onClick={() => handleDelete(service.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="service-form">
                <h3>{isEditing ? "Modifier le Service" : "Créer un Nouveau Service"}</h3>
                <input
                    type="text"
                    placeholder="Nom"  
                    value={isEditing ? editingService?.name || '' : newService.name}
                    onChange={(e) => isEditing
                        ? setEditingService({ ...editingService!, name: e.target.value })
                        : setNewService({ ...newService, name: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={isEditing ? editingService?.description || '' : newService.description}
                    onChange={(e) => isEditing
                        ? setEditingService({ ...editingService!, description: e.target.value })
                        : setNewService({ ...newService, description: e.target.value })}
                />
                <input
                    type="file"
                    onChange={(e) => isEditing
                        ? setEditingService({ ...editingService!, imgFile: e.target.files?.[0] || null })
                        : setNewService({ ...newService, imgFile: e.target.files?.[0] || null })}
                />
                <input
                    type="number"
                    placeholder="Prix"
                    value={isEditing ? editingService?.price || 0 : newService.price}
                    onChange={(e) => isEditing
                        ? setEditingService({ ...editingService!, price: +e.target.value })
                        : setNewService({ ...newService, price: +e.target.value })}
                />
                <select
                    value={isEditing ? editingService?.status || '' : newService.status}
                    onChange={(e) => isEditing
                        ? setEditingService({ ...editingService!, status: e.target.value })
                        : setNewService({ ...newService, status: e.target.value })}
                >
                    <option value="en attente">En attente</option>
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                </select>
                <select
                    value={isEditing ? editingService?.category || '' : newService.category}
                    onChange={(e) => isEditing
                        ? setEditingService({ ...editingService!, category: e.target.value })
                        : setNewService({ ...newService, category: e.target.value })}
                >
                    <option value="en ligne">En ligne</option>
                    <option value="présentiel">Présentiel</option>
                </select>
              
                <button onClick={isEditing ? handleUpdate : handleCreate}>
                    {isEditing ? 'Mettre à jour' : 'Créer'}
                </button>
            </div>
        </div>
    );
};

export default ServicesTable;
