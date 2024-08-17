import React, { useState } from 'react';
import axios from 'axios';

const CreateUserInformation = () => {
  const [idUser, setIdUser] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [address, setAddress] = useState('');
  const [colony, setColony] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id_user', idUser);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('city', city);
    formData.append('municipality', municipality);
    formData.append('address', address);
    formData.append('colony', colony);
    formData.append('postal_code', postalCode);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('photo', photo);

    try {
      const response = await axios.post('http://localhost:8000/cv/userfirst', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Información del usuario creada correctamente');
    } catch (error) {
      setMessage(error.response?.data.detail || 'Error al crear información del usuario');
    }
  };

  return (
    <div>
      <h2>Crear Información del Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idUser">ID Usuario:</label>
          <input
            type="text"
            id="idUser"
            value={idUser}
            onChange={(e) => setIdUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="surname">Apellido:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">Ciudad:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="municipality">Municipio:</label>
          <input
            type="text"
            id="municipality"
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="colony">Colonia:</label>
          <input
            type="text"
            id="colony"
            value={colony}
            onChange={(e) => setColony(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Código Postal:</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Foto:</label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Crear Información de Usuario</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateUserInformation;
