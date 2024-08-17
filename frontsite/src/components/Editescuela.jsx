import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditEscuela = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const navigate = useNavigate(); // Para redirigir después de la actualización
  const [escuela, setEscuela] = useState({
    grado: '',
    escuela: '',
    ubi: '',
    inicio: '',
    fin: '',
    fecha_grad: '',
    cedula: '',
    reconocimientos: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEscuela = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/escuela/1`);
        setEscuela(response.data);
      } catch (err) {
        setError('Error al cargar los datos de la escuela');
        console.error(err);
      }
    };

    fetchEscuela();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEscuela({ ...escuela, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(`http://127.0.0.1:8000/cv/escuela/1`, escuela);
      Swal.fire({
        icon: 'success',
        title: 'Actualización Exitosa',
        text: 'Los datos de la escuela se han actualizado correctamente.',
      }).then(() => {
        navigate(`/escuelas/${id}`); // Redirige a la vista de la escuela después de la actualización
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar los datos de la escuela.',
      });
      setError('Error al actualizar los datos de la escuela');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Editar Escuela</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="grado">Grado:</label>
          <input
            type="text"
            id="grado"
            name="grado"
            value={escuela.grado}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="escuela">Nombre de la Escuela:</label>
          <input
            type="text"
            id="escuela"
            name="escuela"
            value={escuela.escuela}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ubi">Ubicación:</label>
          <input
            type="text"
            id="ubi"
            name="ubi"
            value={escuela.ubi}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="inicio">Fecha de Inicio:</label>
          <input
            type="date"
            id="inicio"
            name="inicio"
            value={escuela.inicio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fin">Fecha de Fin:</label>
          <input
            type="date"
            id="fin"
            name="fin"
            value={escuela.fin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fecha_grad">Fecha de Graduación:</label>
          <input
            type="date"
            id="fecha_grad"
            name="fecha_grad"
            value={escuela.fecha_grad}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={escuela.cedula}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reconocimientos">Reconocimientos:</label>
          <textarea
            id="reconocimientos"
            name="reconocimientos"
            value={escuela.reconocimientos}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Actualizando...' : 'Actualizar Escuela'}
        </button>
      </form>
    </div>
  );
};

export default EditEscuela;
