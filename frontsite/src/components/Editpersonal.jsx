import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUserInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    borned: '',
    data_cont: '',
    networks1: '',
    networks2: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cv/userinfoextra/1`);
        setUserInfo(response.data);
      } catch (err) {
        setError('Error al obtener los datos');
        console.error(err);
      }
    };

    fetchUserInfo();
  }, [id]);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/cv/userinfoextra/1`, userInfo);
      navigate(`/userinfo/${id}`); 
    } catch (err) {
      setError('Error al actualizar los datos');
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Editar Información del Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="borned">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="borned"
            name="borned"
            value={userInfo.borned}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="data_cont">Nombre completo :</label>
          <input
            type="text"
            id="data_cont"
            name="data_cont"
            value={userInfo.data_cont}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="networks1">Redes Sociales 1:</label>
          <input
            type="text"
            id="networks1"
            name="networks1"
            value={userInfo.networks1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="networks2">Redes Sociales 2:</label>
          <input
            type="text"
            id="networks2"
            name="networks2"
            value={userInfo.networks2}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditUserInfo;
