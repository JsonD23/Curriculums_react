import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Asegúrate de crear este archivo CSS para los estilos

const Dashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="button-group">
                <button onClick={() => handleNavigation('/edit-personal-data')}>
                    Editar Datos Personales
                </button>
                <button onClick={() => handleNavigation('/edit-work')}>
                    Editar Trabajo
                </button>
                <button onClick={() => handleNavigation('/edit-skills')}>
                    Editar Competencias
                </button>
                <button onClick={() => handleNavigation('/edit-school')}>
                    Editar Escuela
                </button>
                <button onClick={() => handleNavigation('/edit-language')}>
                    Editar Idioma
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
