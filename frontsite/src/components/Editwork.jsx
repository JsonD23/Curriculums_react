import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditWorkingInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workingInfo, setWorkingInfo] = useState({
    puesto: '',
    enterprise: '',
    ubication: '',
    fecha_init: '',
    fecha_final: '',
    functions: '',
    rewards: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkingInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/working/1`);
        setWorkingInfo(response.data);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al obtener los datos',
        });
        console.error(err);
      }
    };

    fetchWorkingInfo();
  }, [id]);

  const handleChange = (e) => {
    setWorkingInfo({
      ...workingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/cv/working/1`, workingInfo);
      Swal.fire({
        icon: 'success',
        title: 'Actualización Exitosa',
        text: 'Los datos del trabajo se han actualizado correctamente.',
      }).then(() => {
        navigate(`/working/${id}`); // Redirigir a la vista de detalles o lista
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar los datos',
      });
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Editar Información del Trabajo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="puesto">Puesto:</label>
          <input
            type="text"
            id="puesto"
            name="puesto"
            value={workingInfo.puesto}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="enterprise">Empresa:</label>
          <input
            type="text"
            id="enterprise"
            name="enterprise"
            value={workingInfo.enterprise}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ubication">Ubicación:</label>
          <input
            type="text"
            id="ubication"
            name="ubication"
            value={workingInfo.ubication}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fecha_init">Fecha de Inicio:</label>
          <input
            type="date"
            id="fecha_init"
            name="fecha_init"
            value={workingInfo.fecha_init}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fecha_final">Fecha Final:</label>
          <input
            type="date"
            id="fecha_final"
            name="fecha_final"
            value={workingInfo.fecha_final}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="functions">Funciones:</label>
          <textarea
            id="functions"
            name="functions"
            value={workingInfo.functions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rewards">Recompensas:</label>
          <textarea
            id="rewards"
            name="rewards"
            value={workingInfo.rewards}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditWorkingInfo;
