import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './projectsTable.scss';

interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
    user_id: number;
    imgFile: File | null;
    budget: number;
    type: string;
}

const OngoingProjectsTable: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur depuis le localStorage
    const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur depuis le localStorage

    // Récupérer les projets en cours
    const fetchOngoingProjects = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/projects', {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le token Bearer dans l'en-tête
                },
            });

            // Filtrer les projets pour n'afficher que ceux avec le statut "en cours"
            // et appartenant à l'utilisateur connecté (en utilisant user_id)
            const ongoingProjects = response.data.filter((project: Project) =>
                project.status === 'en cours' && project.user_id === parseInt(userId || '0')
            );

            setProjects(ongoingProjects);
        } catch (error) {
            console.error('Erreur lors de la récupération des projets en cours', error);
            setErrorMessages(['Erreur lors de la récupération des projets']);
        }
    };

    useEffect(() => {
        if (token && userId) {
            fetchOngoingProjects();
        } else {
            console.log('Token ou ID utilisateur manquants, veuillez vous connecter.');
        }
    }, [token, userId]);

    return (
        <div className="projects-table">
            <h2>Projets en Cours</h2>

            {errorMessages.length > 0 && (
                <div className="error-messages">
                    {errorMessages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>
            )}

            {projects.length === 0 ? (
                <p>Aucun projet en cours</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Budget</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>{project.budget}</td>
                                <td>{project.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OngoingProjectsTable;
