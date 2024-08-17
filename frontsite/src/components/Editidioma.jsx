import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditIdioma = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idioma, setIdioma] = useState({
    nombre_idioma: '',
    Nivel: '',
    escuela_idioma: '',
    Fecha_idioma: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIdioma = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/idiomas/1`);
        setIdioma({
          nombre_idioma: response.data.nombre_idioma,
          Nivel: response.data.Nivel,
          escuela_idioma: response.data.escuela_idioma,
          Fecha_idioma: response.data.Fecha_idioma
        });
        setLoading(false);
      } catch (err) {
        setError('Error al obtener el idioma');
        console.error(err);
        setLoading(false);
      }
    };

    fetchIdioma();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdioma({ ...idioma, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/cv/idiomas/1`, idioma);
      Swal.fire('Éxito', 'Idioma actualizado correctamente', 'success');
      navigate(`/idiomas/${id}`);
    } catch (err) {
      Swal.fire('Error', 'Error al actualizar el idioma', 'error');
      console.error(err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Editar Idioma</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Idioma:</label>
          <input
            type="text"
            name="nombre_idioma"
            value={idioma.nombre_idioma}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nivel:</label>
          <input
            type="text"
            name="Nivel"
            value={idioma.Nivel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Escuela:</label>
          <input
            type="text"
            name="escuela_idioma"
            value={idioma.escuela_idioma}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="Fecha_idioma"
            value={idioma.Fecha_idioma}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar Idioma</button>
      </form>
    </div>
  );
};

export default EditIdioma;
