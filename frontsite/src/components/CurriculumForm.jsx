import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/cv/userinformation/')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Hubo un error al obtener la información');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const results = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(results);
        } else {
            setFilteredUsers([]);
        }
    }, [searchTerm, users]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
            <h1 style={{ color: '#FFA500' }}>Información Personal</h1>

            <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                id="searchInput"
                name="searchInput"
                style={{ marginBottom: '20px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #FFD700' }}
            />

            {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                    <div key={`${user.id_user}-${index}`} style={{ marginBottom: '40px', borderBottom: '2px solid #FFD700', paddingBottom: '20px' }}>
                        <h2 style={{ marginBottom: '10px', color: '#FF8C00' }}>{user.name} {user.surname}</h2>
                        <p><strong>Ciudad:</strong> {user.city}</p>
                        <p><strong>Municipio:</strong> {user.municipality}</p>
                        <p><strong>Dirección:</strong> {user.address}, {user.colony}, C.P. {user.postalCode}</p>
                        <p><strong>Teléfono:</strong> {user.phone}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        {user.photo ? (
                            <div>
                                <strong>Foto:</strong>
                                <img src={`path/to/your/uploads/${user.photo}`} alt="Foto" style={{ width: '150px', height: 'auto', marginTop: '10px' }} />
                            </div>
                        ) : (
                            <p><strong>Foto:</strong> No disponible</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No se encontraron resultados.</p>
            )}
        </div>
    );
};

export default UserList;
