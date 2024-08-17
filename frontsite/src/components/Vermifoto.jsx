import React, { useState } from 'react';
import axios from 'axios';

const ViewPhotoById = () => {
    const [photoId, setPhotoId] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [fetchStatus, setFetchStatus] = useState('');

    const handleIdChange = (event) => {
        setPhotoId(event.target.value);
    };

    const handleFetchPhoto = async () => {
        if (!photoId) {
            setFetchStatus('Please enter a photo ID.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/cv/photo/0`, {
                responseType: 'blob', // Importante para manejar archivos binarios
            });

            // Crear una URL de objeto para la imagen
            const url = URL.createObjectURL(response.data);
            setImageURL(url);
            setFetchStatus('Photo fetched successfully.');
        } catch (error) {
            console.error('There was an error fetching the photo!', error);
            setFetchStatus('Failed to fetch photo. Please check the console for more details.');
        }
    };

    return (
        <div>
          
          
    

            {imageURL && (
                <div>
                  
                    <img 
                        src={imageURL} 
                        alt="Fetched Photo" 
                        style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            borderRadius: '50%', // Hace la imagen circular
                            objectFit: 'cover', // Asegura que la imagen ocupe toda la forma circular
                        }} 
                    />
                </div>
            )}

      
        </div>
    );
};

export default ViewPhotoById;
