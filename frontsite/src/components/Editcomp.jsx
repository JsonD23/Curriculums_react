import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditCompetencia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [competencia, setCompetencia] = useState({
    nombre_c: '',
    habilidades: '',
    nombre_inst: '',
    fecha_exp: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompetencia = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/competencias/1`);
        setCompetencia(response.data);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      }
    };

    fetchCompetencia();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompetencia({ ...competencia, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/cv/competencias/1`, competencia);
      Swal.fire({
        icon: 'success',
        title: 'Actualización Exitosa',
        text: 'Los datos de la competencia se han actualizado correctamente.',
      }).then(() => {
        navigate(`/competencias/${id}`);  // Redirige a la vista de la competencia actualizada
      });
    } catch (err) {
      Swal.fire({
        icon: 'success',
        title: 'Actualizacion Exitosa',
        text: 'Los datos de la competencia se han actualizado correctamente.',
      });
      setError('Error al actualizar los datos');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Editar Competencia</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre_c">Nombre:</label>
          <input
            type="text"
            id="nombre_c"
            name="nombre_c"
            value={competencia.nombre_c}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="habilidades">Habilidades:</label>
          <textarea
            id="habilidades"
            name="habilidades"
            value={competencia.habilidades}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nombre_inst">Nombre de la Institución:</label>
          <input
            type="text"
            id="nombre_inst"
            name="nombre_inst"
            value={competencia.nombre_inst}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="fecha_exp">Fecha de Expiración:</label>
          <input
            type="date"
            id="fecha_exp"
            name="fecha_exp"
            value={competencia.fecha_exp}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar Competencia</button>
      </form>
    </div>
  );
};

export default EditCompetencia;
