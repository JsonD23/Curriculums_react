import React, { useState } from 'react';

const ImageUploadForm = () => {
    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setResponseMessage('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/utils/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setResponseMessage(`Imagen subida con éxito: ${result.filename}`);
            } else {
                setResponseMessage(`Error: ${result.detail || 'Error al subir la imagen'}`);
            }
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Subir Imagen</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de Usuario:</label><br />
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br /><br />

                <label htmlFor="file">Seleccionar imagen:</label><br />
                <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                /><br /><br />

                <button type="submit">Subir Imagen</button>
            </form>

            {responseMessage && <div>{responseMessage}</div>}
        </div>
    );
};

export default ImageUploadForm;
