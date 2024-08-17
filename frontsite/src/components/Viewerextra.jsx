import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CombinedComponent = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [workingInfo, setWorkingInfo] = useState(null);
  const [competencia, setCompetencia] = useState(null);
  const [escuela, setEscuela] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams(); // Obtener el ID de la URL

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/userinfoextra/1`);
        setUserInfo(response.data);
      } catch (err) {
        setError('Error al obtener los datos del usuario');
        console.error(err);
      }
    };

    const fetchWorkingInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/working/1`);
        setWorkingInfo(response.data);
      } catch (err) {
        setError('Error al obtener los datos de trabajo');
        console.error(err);
      }
    };

    const fetchCompetencia = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/competencias/1`);
        setCompetencia(response.data);
      } catch (err) {
        setError('Error al obtener los datos de la competencia');
        console.error(err);
      }
    };

    const fetchEscuela = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/escuela/1`);
        setEscuela(response.data);
      } catch (err) {
        setError('Error al obtener los datos de la escuela');
        console.error(err);
      }
    };

    fetchUserInfo();
    fetchWorkingInfo();
    fetchCompetencia();
    fetchEscuela();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!userInfo || !workingInfo || !competencia || !escuela) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <div>
        <h2>Detalles del Usuario</h2>
        <p><strong>ID:</strong> {userInfo.id}</p>
        <p><strong>Fecha de Nacimiento:</strong> {userInfo.borned}</p>
        <p><strong>Información de Contacto:</strong> {userInfo.data_cont}</p>
        <p><strong>Redes Sociales 1:</strong> {userInfo.networks1}</p>
        <p><strong>Redes Sociales 2:</strong> {userInfo.networks2}</p>
      </div>
      <div>
        <h2>Detalles del Trabajo</h2>
        <p><strong>ID:</strong> {workingInfo.id}</p>
        <p><strong>Puesto:</strong> {workingInfo.puesto}</p>
        <p><strong>Empresa:</strong> {workingInfo.enterprise}</p>
        <p><strong>Ubicación:</strong> {workingInfo.ubication}</p>
        <p><strong>Fecha Inicio:</strong> {workingInfo.fecha_init}</p>
        <p><strong>Fecha Final:</strong> {workingInfo.fecha_final}</p>
        <p><strong>Funciones:</strong> {workingInfo.functions}</p>
        <p><strong>Recompensas:</strong> {workingInfo.rewards}</p>
      </div>
      <div>
        <h2>Detalles de la Competencia</h2>
        <p><strong>Nombre de la Competencia:</strong> {competencia.nombre_c}</p>
        <p><strong>Habilidades:</strong> {competencia.habilidades}</p>
        <p><strong>Nombre de la Institución:</strong> {competencia.nombre_inst}</p>
        <p><strong>Fecha de Expiración:</strong> {competencia.fecha_exp}</p>
      </div>
      <div>
        <h2>Detalles de la Escuela</h2>
        <p><strong>Grado:</strong> {escuela.grado}</p>
        <p><strong>Escuela:</strong> {escuela.escuela}</p>
        <p><strong>Ubicación:</strong> {escuela.ubi}</p>
        <p><strong>Fecha de Inicio:</strong> {escuela.inicio}</p>
        <p><strong>Fecha de Fin:</strong> {escuela.fin}</p>
        <p><strong>Fecha de Graduación:</strong> {escuela.fecha_grad}</p>
        <p><strong>Cédula:</strong> {escuela.cedula}</p>
        <p><strong>Reconocimientos:</strong> {escuela.reconocimientos || 'Ninguno'}</p>
      </div>
    </div>
  );
};

export default CombinedComponent;
