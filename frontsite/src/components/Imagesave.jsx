import React, { useEffect, useState } from 'react';

const ImageViewer = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/photos');
                if (response.ok) {
                    const data = await response.json();
                    setImages(data);
                } else {
                    setError('Error al cargar las imágenes.');
                }
            } catch (error) {
                setError('Error al conectarse al servidor.');
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            <h2>Imágenes Guardadas</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={`http://127.0.0.1:8000/utils/photos/${image}`}
                            alt={`Imagen ${index}`}
                            style={{ maxWidth: '200px', height: 'auto', border: '1px solid #ccc', padding: '5px' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageViewer;
