import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlantillaCV = ({ id }) => {
  const [working_info, setWorkingInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/working/1`);
        setWorkingInfo(response.data);
      } catch (err) {
        setError('Error al obtener los datos');
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!working_info) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h2>Detalles del Trabajo</h2>
      <p><strong>ID:</strong> {working_info.id}</p>
      <p><strong>Puesto:</strong> {working_info.puesto}</p>
      <p><strong>Empresa:</strong> {working_info.enterprise}</p>
      <p><strong>Ubicación:</strong> {working_info.ubication}</p>
      <p><strong>Fecha Inicio:</strong> {working_info.fecha_init}</p>
      <p><strong>Fecha Final:</strong> {working_info.fecha_final}</p>
      <p><strong>Funciones:</strong> {working_info.functions}</p>
      <p><strong>Recompensas:</strong> {working_info.rewards}</p>
    </div>
  );
};

export default PlantillaCV;
