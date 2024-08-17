import React, { useState } from 'react';
import axios from 'axios';

const CrearIdioma = () => {
    const [nombreIdioma, setNombreIdioma] = useState('');
    const [nivel, setNivel] = useState('');
    const [escuelaIdioma, setEscuelaIdioma] = useState('');
    const [fechaIdioma, setFechaIdioma] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');

        try {
            await axios.post('http://localhost:8000/cv/idiomas/', {
                nombre_idioma: nombreIdioma,
                Nivel: nivel,
                escuela_idioma: escuelaIdioma,
                Fecha_idioma: fechaIdioma,
            });
            setMensaje('Idioma creado con éxito');
            // Opcionalmente, puedes limpiar los campos después de la creación
            setNombreIdioma('');
            setNivel('');
            setEscuelaIdioma('');
            setFechaIdioma('');
        } catch (error) {
            console.error('Error al crear idioma:', error);
            setError('Error al crear el idioma. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Idioma</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Idioma:</label>
                    <input
                        type="text"
                        value={nombreIdioma}
                        onChange={(e) => setNombreIdioma(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nivel:</label>
                    <input
                        type="text"
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Escuela del Idioma:</label>
                    <input
                        type="text"
                        value={escuelaIdioma}
                        onChange={(e) => setEscuelaIdioma(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha del Idioma:</label>
                    <input
                        type="date"
                        value={fechaIdioma}
                        onChange={(e) => setFechaIdioma(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear Idioma</button>

                <button type="button" onClick={() => navigate('/form3')} style={{ marginLeft: '10px' }}>
                   Siguiente
                </button>
                
            </form>
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CrearIdioma;
