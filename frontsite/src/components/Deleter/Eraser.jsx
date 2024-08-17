import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DeleteDataView = () => {
  const navigate = useNavigate();

  const handleDelete = async (type, id) => {
    try {
      const confirmed = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar este registro de ${type}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
      });

      if (confirmed.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/cv/${type}/${id}`);
        Swal.fire(
          'Eliminado',
          `El registro de ${type} ha sido eliminado.`,
          'success'
        ).then(() => {
          navigate(`/`);
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error al eliminar el registro de ${type}`,
      });
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Eliminar Datos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <div className="card">
          <h3>Eliminar Información del Usuario</h3>
          <button onClick={() => handleDelete('userinfoextra', 1)}>Eliminar</button>
        </div>
        <div className="card">
          <h3>Eliminar Información de Trabajo</h3>
          <button onClick={() => handleDelete('working', 1)}>Eliminar</button>
        </div>
        <div className="card">
          <h3>Eliminar Información de Escuela</h3>
          <button onClick={() => handleDelete('escuela', 1)}>Eliminar</button>
        </div>
        <div className="card">
          <h3>Eliminar Habilidades</h3>
          <button onClick={() => handleDelete('skills', 1)}>Eliminar</button>
        </div>
        <div className="card">
          <h3>Eliminar Idiomas</h3>
          <button onClick={() => handleDelete('languages', 1)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDataView;
