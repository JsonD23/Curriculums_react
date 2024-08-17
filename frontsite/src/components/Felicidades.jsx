import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/ViewFelicidades.css'; // Asegúrate de crear este archivo CSS para los estilos

export const Felicidades = () => {
    const navigate = useNavigate();

    const handleTemplateSelect = (template) => {
        if (template === 'Template 1') {
            navigate('/template1');
        } else if (template === 'Template 2') {
            navigate('/template2');
        } else if (template === 'Template 3') {
            navigate('/template3');
        }
    };

    const handleEditCV = () => {
        navigate('/edit-cv'); // Asegúrate de que esta ruta exista en tu aplicación
    };

    const handleCRUD = () => {
        navigate('/eraser'); // Asegúrate de que esta ruta exista en tu aplicación
    };

    return (
        <div className="felicidades-container">
            <h1>¡Felicidades!</h1>
            <p>Has completado todos los formularios exitosamente.</p>
            <div className="template-selection">
                <h2>Selecciona una plantilla:</h2>
                <div className="template-options">
                    <div className="template-option" onClick={() => handleTemplateSelect('Template 1')}>
                        <h3>Plantilla 1</h3>
                        <p>Plantilla-Ejecutiva</p>
                    </div>
                    <div className="template-option" onClick={() => handleTemplateSelect('Template 2')}>
                        <h3>Plantilla 2</h3>
                        <p>Plantilla-Estudiantil</p>
                    </div>
                    <div className="template-option" onClick={() => handleTemplateSelect('Template 3')}>
                        <h3>Plantilla 3</h3>
                        <p>Easy-Plantilla</p>
                    </div>
                </div>
            </div>
            <div className="edit-cv-section">
                <p>¿Aún le falta algo a tu CV?</p>
                <button className="edit-cv-button" onClick={handleEditCV}>
                    Editar CV
                </button>
            </div>
            <div className="crud-section">
                <button className="crud-button" onClick={handleCRUD}>
                  Borrar mis datos 
                </button>
            </div>
        </div>
    );
};
