import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './projectsTable.scss';

interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
    user_id: number;
    imgFile?: File | null;
    budget: number;
    type: string;
}

const ProjectsTable: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [newProject, setNewProject] = useState<Project>({
        id: 0,
        title: '',
        description: '',
        status: 'en attente',
        user_id: 1,
        imgFile: null,
        budget: 0,
        type: 'en ligne',
    });
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Récupérer l'ID utilisateur depuis localStorage

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/projects', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Filtrer les projets pour n'afficher que ceux qui correspondent à l'utilisateur connecté
            const filteredProjects = response.data.filter((project: Project) => project.user_id === parseInt(userId || '0'));

            setProjects(filteredProjects);
        } catch (error) {
            console.error('Erreur lors de la récupération des projets', error);
        }
    };

    useEffect(() => {
        if (token && userId) {
            fetchProjects();
        } else {
            console.log('Token ou ID utilisateur manquants, veuillez vous connecter.');
        }
    }, [token, userId]);

    const handleCreate = async () => {
        const formData = new FormData();
        formData.append('title', newProject.title);
        formData.append('description', newProject.description);
        formData.append('status', newProject.status);
        formData.append('user_id', userId || '');  // ID de l'utilisateur
        formData.append('budget', newProject.budget.toString());
        formData.append('type', newProject.type);

        if (newProject.imgFile) {
            formData.append('imgFile', newProject.imgFile);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/projects', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProjects([...projects, response.data]);
            setNewProject({
                id: 0,
                title: '',
                description: '',
                status: 'en attente',
                user_id: parseInt(userId || '1'),
                imgFile: null,
                budget: 0,
                type: 'en ligne',
            });
        } catch (error) {
            console.error('Erreur lors de la création du projet', error);
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setIsEditing(true);
    };

    const handleUpdate = async () => {
        if (!editingProject) return;

        const formData = new FormData();
        formData.append('title', editingProject.title);
        formData.append('description', editingProject.description);
        formData.append('status', editingProject.status);
        formData.append('user_id', userId || '');  // ID de l'utilisateur
        formData.append('budget', editingProject.budget.toString());
        formData.append('type', editingProject.type);

        if (editingProject.imgFile) {
            formData.append('imgFile', editingProject.imgFile);
        }

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/projects/${editingProject.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setProjects(projects.map(proj => (proj.id === editingProject.id ? response.data : proj)));
            setEditingProject(null);
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du projet', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects(projects.filter(project => project.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du projet', error);
        }
    };

    return (
        <div className="projects-table">
            <h2>Gestion des Projets</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>
                                <button onClick={() => handleEdit(project)}>Modifier</button>
                                <button onClick={() => handleDelete(project.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="project-form">
                <h3>{isEditing ? "Modifier le Projet" : "Créer un Nouveau Projet"}</h3>
                <input
                    type="text"
                    placeholder="Titre"
                    value={isEditing ? editingProject?.title || '' : newProject.title}
                    onChange={(e) => isEditing
                        ? setEditingProject({ ...editingProject!, title: e.target.value })
                        : setNewProject({ ...newProject, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={isEditing ? editingProject?.description || '' : newProject.description}
                    onChange={(e) => isEditing
                        ? setEditingProject({ ...editingProject!, description: e.target.value })
                        : setNewProject({ ...newProject, description: e.target.value })}
                />
                <input
                    type="file"
                    onChange={(e) => isEditing
                        ? setEditingProject({ ...editingProject!, imgFile: e.target.files?.[0] || null })
                        : setNewProject({ ...newProject, imgFile: e.target.files?.[0] || null })}
                />
                <input
                    type="number"
                    placeholder="Budget"
                    value={isEditing ? editingProject?.budget || 0 : newProject.budget}
                    onChange={(e) => isEditing
                        ? setEditingProject({ ...editingProject!, budget: +e.target.value })
                        : setNewProject({ ...newProject, budget: +e.target.value })}
                />
                <select
                    value={isEditing ? editingProject?.status || '' : newProject.status}
                    onChange={(e) => isEditing
                        ? setEditingProject({ ...editingProject!, status: e.target.value })
                        : setNewProject({ ...newProject, status: e.target.value })}
                >
                    <option value="en attente">En attente</option>
                    <option value="en cours">En cours</option>
                    <option value="terminé">Terminé</option>
                    <option value="annulé">Annulé</option>
                </select>
                <select
                    value={isEditing ? editingProject?.type || '' : newProject.type}
                    onChange={(e) => isEditing
                        ? setEditingProject({ ...editingProject!, type: e.target.value })
                        : setNewProject({ ...newProject, type: e.target.value })}
                >
                    <option value="en ligne">En ligne</option>
                    <option value="presentiel">Présentiel</option>
                </select>
                <button onClick={isEditing ? handleUpdate : handleCreate}>
                    {isEditing ? "Enregistrer les Modifications" : "Ajouter le Projet"}
                </button>
                {isEditing && <button onClick={() => { setIsEditing(false); setEditingProject(null); }}>Annuler</button>}
            </div>
        </div>
    );
};

export default ProjectsTable;
