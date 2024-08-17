import React, { useState } from 'react';
import axios from 'axios';

const PhotoViewer = ({ filename }) => {
  const [imageSrc, setImageSrc] = useState('');

  const fetchImage = async () => {
    try {
      // Solicitar la imagen al servidor
      const response = await axios.get(`http://127.0.0.1:8000/cv/photo/${filename}`, {
        responseType: 'blob', // Importante para obtener la imagen como un blob
      });

      // Crear una URL de objeto para mostrar la imagen
      const imageObjectUrl = URL.createObjectURL(response.data);
      setImageSrc(imageObjectUrl);
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
  };

  // Cargar la imagen cuando el componente se monta
  React.useEffect(() => {
    fetchImage();
  }, [filename]);

  return (
    <div>
      <h2>Vista de la Imagen</h2>
      {imageSrc ? (
        <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
};

export default PhotoViewer;
