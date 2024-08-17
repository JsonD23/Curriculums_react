import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WorkingForm = () => {
    const [puesto, setPuesto] = useState('');
    const [enterprise, setEnterprise] = useState('');
    const [ubication, setUbication] = useState('');
    const [fechaInit, setFechaInit] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [functions, setFunctions] = useState('');
    const [rewards, setRewards] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/cv/working', {
                puesto,
                enterprise,
                ubication,
                fecha_init: fechaInit,
                fecha_final: fechaFinal || null, // Manejar valor opcional
                functions,
                rewards
            });

            setSuccess('Información almacenada correctamente');
            setError(null);

            // Redirigir a "form 3" después de una inserción exitosa
            navigate('/Curricomp');
        } catch (err) {
            setError('Hubo un error al almacenar la información');
            setSuccess(null);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
            <h1>Agregar Información Laboral</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Puesto:
                    <input
                        type="text"
                        value={puesto}
                        onChange={(e) => setPuesto(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Empresa:
                    <input
                        type="text"
                        value={enterprise}
                        onChange={(e) => setEnterprise(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Ubicación:
                    <input
                        type="text"
                        value={ubication}
                        onChange={(e) => setUbication(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Fecha de Inicio:
                    <input
                        type="date"
                        value={fechaInit}
                        onChange={(e) => setFechaInit(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Fecha de Finalización:
                    <input
                        type="date"
                        value={fechaFinal}
                        onChange={(e) => setFechaFinal(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Funciones:
                    <input
                        type="text"
                        value={functions}
                        onChange={(e) => setFunctions(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Recompensas:
                    <input
                        type="text"
                        value={rewards}
                        onChange={(e) => setRewards(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Guardar</button>
                <button
                    type="button"
                    onClick={() => navigate('/Curricomp')}
                    style={{ marginLeft: '10px' }}
                >
                    Siguiente
                </button>
            </form>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default WorkingForm;