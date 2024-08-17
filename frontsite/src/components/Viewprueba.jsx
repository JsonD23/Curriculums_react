import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EscuelaList = () => {
    const [escuelas, setEscuelas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEscuelas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/escuela/1');
                setEscuelas(response.data);
            } catch (error) {
                console.error('Error fetching escuelas:', error);
            }
        };

        fetchEscuelas();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-escuela/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/escuela/${id}`);
            setEscuelas(escuelas.filter((escuela) => escuela.id !== id));
        } catch (error) {
            console.error('Error deleting escuela:', error);
        }
    };

    return (
        <div>
            <h1>Lista de Escuelas</h1>
            <button onClick={() => navigate('/create-escuela')}>Crear Nueva Escuela</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Grado</th>
                        <th>Escuela</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {escuelas.map((escuela) => (
                        <tr key={escuela.id}>
                            <td>{escuela.id}</td>
                            <td>{escuela.grado}</td>
                            <td>{escuela.escuela}</td>
                            <td>
                                <button onClick={() => handleEdit(escuela.id)}>Editar</button>
                                <button onClick={() => handleDelete(escuela.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EscuelaList;
