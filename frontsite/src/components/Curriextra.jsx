import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Curriextra.css'; // Asegúrate de que este archivo exista y tenga los estilos necesarios

const ExtraInfoForm = () => {
    const [borned, setBorned] = useState('');
    const [dataCont, setDataCont] = useState('');
    const [networks1, setNetworks1] = useState('');
    const [networks2, setNetworks2] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProgress(0); // Resetear el progreso al inicio de la solicitud

        try {
            const response = await axios.post('http://127.0.0.1:8000/cv/userinfoextra', {
                borned,
                data_cont: dataCont,
                networks1,
                networks2
            }, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted); // Actualiza el progreso
                }
            });

            setSuccess('Información almacenada correctamente');
            setError(null);
            setProgress(100); // Completa el progreso al terminar la solicitud

            // Redirigir a "form 3" después de una inserción exitosa
            navigate('/form3');
        } catch (err) {
            setError('Hubo un error al almacenar la información');
            setSuccess(null);
            setProgress(0); // Resetear el progreso en caso de error
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
            <h1>Parte1. Datos Personales</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Fecha de Nacimiento:
                    <input
                        type="date"
                        value={borned}
                        onChange={(e) => setBorned(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Nombre Completo:
                    <input
                        type="text"
                        value={dataCont}
                        onChange={(e) => setDataCont(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Red Social 1:
                    <input
                        type="text"
                        value={networks1}
                        onChange={(e) => setNetworks1(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Red Social 2:
                    <input
                        type="text"
                        value={networks2}
                        onChange={(e) => setNetworks2(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => navigate('/form3')} style={{ marginLeft: '10px' }}>
                   Siguiente
                </button>
            </form>
            
       
        </div>
    );
};

export default ExtraInfoForm;
