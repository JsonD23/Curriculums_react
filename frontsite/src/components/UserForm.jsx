import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [user, setUser] = useState({
        id_user: '',       // Agregado el campo id_user
        name: '',
        surname: '',
        city: '',
        municipality: '',
        address: '',
        colony: '',
        postalCode: '',
        phone: '',
        email: '',
        photo: ''         // Puede ser una URL de la foto
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/cv/userinformation/', user);
            alert('Información guardada con éxito');
            setUser({
                id_user: '',
                name: '',
                surname: '',
                city: '',
                municipality: '',
                address: '',
                colony: '',
                postalCode: '',
                phone: '',
                email: '',
                photo: ''
            });
        } catch (err) {
            setError('Error al enviar la información: ' + err.message);
        }
    };

    return (
        <div>
            <h1>Formulario de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" name="id_user" placeholder="ID de Usuario" value={user.id_user} onChange={handleChange} required />
                <input type="text" name="name" placeholder="Nombre" value={user.name} onChange={handleChange} required />
                <input type="text" name="surname" placeholder="Apellido" value={user.surname} onChange={handleChange} required />
                <input type="text" name="city" placeholder="Ciudad" value={user.city} onChange={handleChange} required />
                <input type="text" name="municipality" placeholder="Municipio" value={user.municipality} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Dirección" value={user.address} onChange={handleChange} required />
                <input type="text" name="colony" placeholder="Colonia" value={user.colony} onChange={handleChange} required />
                <input type="number" name="postalCode" placeholder="Código Postal" value={user.postalCode} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Teléfono" value={user.phone} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
                <input type="text" name="photo" placeholder="Foto (URL)" value={user.photo} onChange={handleChange} />

                <button type="submit">Guardar</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default UserForm;
