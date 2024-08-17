import React, { useState } from 'react';
import axios from 'axios';

const UploadAndViewPhoto = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setUploadStatus('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedFile);

        try {
            const response = await axios.post('http://localhost:8000/cv/upload-photo/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Asignar URL de la imagen a la vista previa (esto dependerá de cómo almacenes y sirvas las imágenes)
            setImageURL(URL.createObjectURL(selectedFile));
            setUploadStatus('Photo uploaded successfully.');
        } catch (error) {
            console.error('There was an error uploading the file!', error);
            setUploadStatus('Failed to upload photo.');
        }
    };

    return (
        <div>
            <h2>Subir y preview</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Choose Photo:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </div>
                <button type="submit">Subir foto</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
            {imageURL && (
                <div>
                    <h3>Preview:</h3>
                    <img src={imageURL} alt="Preview" style={{ maxWidth: '500px', maxHeight: '500px' }} />
                </div>
            )}
        </div>
    );
};

export default UploadAndViewPhoto;
