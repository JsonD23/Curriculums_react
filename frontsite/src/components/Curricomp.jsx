import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompetenciaForm = () => {
    const [nombreC, setNombreC] = useState('');
    const [habilidades, setHabilidades] = useState('');
    const [nombreInst, setNombreInst] = useState('');
    const [fechaExp, setFechaExp] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/cv/competencias', {
                nombre_c: nombreC,
                habilidades,
                nombre_inst: nombreInst,
                fecha_exp: fechaExp
            });

            setSuccess('Información almacenada correctamente');
            setError(null);
            navigate('/form3');
        } catch (err) {
            setError('Hubo un error al almacenar la información');
            setSuccess(null);
            console.error('Error:', err); // Mostrar detalles del error en la consola
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
            <h1>Parte3. Competencias</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombreC">
                    Nombre de Competencia:
                    <input
                        id="nombreC"
                        name="nombreC"
                        type="text"
                        value={nombreC}
                        onChange={(e) => setNombreC(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label htmlFor="habilidades">
                    Habilidades:
                    <input
                        id="habilidades"
                        name="habilidades"
                        type="text"
                        value={habilidades}
                        onChange={(e) => setHabilidades(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label htmlFor="nombreInst">
                    Nombre de la Institución:
                    <input
                        id="nombreInst"
                        name="nombreInst"
                        type="text"
                        value={nombreInst}
                        onChange={(e) => setNombreInst(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label htmlFor="fechaExp">
                    Fecha de Expiración:
                    <input
                        id="fechaExp"
                        name="fechaExp"
                        type="date"
                        value={fechaExp}
                        onChange={(e) => setFechaExp(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Guardar</button>
                <button
                    type="button"
                    onClick={() => navigate('/currischool')}
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

export default CompetenciaForm;
