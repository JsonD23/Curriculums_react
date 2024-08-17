import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EscuelaForm = () => {
    const [grado, setGrado] = useState('');
    const [escuela, setEscuela] = useState('');
    const [ubi, setUbi] = useState('');
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');
    const [fechaGrad, setFechaGrad] = useState('');
    const [cedula, setCedula] = useState('');
    const [reconocimientos, setReconocimientos] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams(); // Obtener ID de la URL si es necesario

    useEffect(() => {
        if (id) {
            // Si hay un ID en la URL, obtener los datos del registro
            axios.get(`http://127.0.0.1:8000/cv/escuela/${id}`)
                .then(response => {
                    const { grado, escuela, ubi, inicio, fin, fecha_grad, cedula, reconocimientos } = response.data;
                    setGrado(grado);
                    setEscuela(escuela);
                    setUbi(ubi);
                    setInicio(inicio);
                    setFin(fin);
                    setFechaGrad(fecha_grad);
                    setCedula(cedula);
                    setReconocimientos(reconocimientos || '');
                })
                .catch(error => {
                    setError('Hubo un error al obtener la información');
                });
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://127.0.0.1:8000/cv/escuela', {
                grado,
                escuela,
                ubi,
                inicio,
                fin,
                fecha_grad: fechaGrad,
                cedula,
                reconocimientos
            });

            setSuccess('Información almacenada correctamente');
            setError(null);

            // Redirigir a otra página si es necesario
            navigate('/form3');
        } catch (err) {
            setError('Hubo un error al almacenar la información');
            setSuccess(null);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: 'auto' }}>
            <h1>{id ? 'Actualizar Información Escolar' : 'Parte 4. Escuela'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Grado:
                    <input
                        type="text"
                        value={grado}
                        onChange={(e) => setGrado(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Escuela:
                    <input
                        type="text"
                        value={escuela}
                        onChange={(e) => setEscuela(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Ubicación:
                    <input
                        type="text"
                        value={ubi}
                        onChange={(e) => setUbi(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Fecha de Inicio:
                    <input
                        type="date"
                        value={inicio}
                        onChange={(e) => setInicio(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Fecha de Fin:
                    <input
                        type="date"
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Fecha de Graduación:
                    <input
                        type="date"
                        value={fechaGrad}
                        onChange={(e) => setFechaGrad(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Cédula:
                    <input
                        type="text"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Reconocimientos:
                    <input
                        type="text"
                        value={reconocimientos}
                        onChange={(e) => setReconocimientos(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Guardar</button>
                <button
                    type="button"
                    onClick={() => navigate('/curriidiomas')}
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

export default EscuelaForm;
