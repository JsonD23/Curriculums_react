import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 
const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({
        full_name: '',
        email: '',
        tipo: ''
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users/users')
            .then(response => {
                setUsers(response.data.usuarios);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los usuarios:', error);
            });
    }, []);

    const openEditModal = (user) => {
        setCurrentUser(user);
        setUpdatedUser({
            full_name: user.full_name,
            email: user.email,
            tipo: user.tipo
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentUser(null);
    };

    const openDeleteModal = (user) => {
        setCurrentUser(user);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setCurrentUser(null);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/users/users/${currentUser.id}`, updatedUser)
            .then(response => {
                // Actualiza la lista de usuarios con los datos actualizados
                setUsers(users.map(user => user.id === currentUser.id ? response.data : user));
                closeEditModal();
            })
            .catch(error => {
                console.error('Error al editar el usuario:', error);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/users/users/${currentUser.id}`)
            .then(() => {
                // Actualiza la lista de usuarios eliminando el usuario
                setUsers(users.filter(user => user.id !== currentUser.id));
                closeDeleteModal();
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#FFA500' }}>Lista de Usuarios</h1>
            <table border="1" width="100%" style={{ borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#FFD700' }}>
                        <th>ID</th>
                        <th>Nombre Completo</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Fecha de Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.full_name}</td>
                            <td>{user.email}</td>
                            <td>{user.tipo}</td>
                            <td>{new Date(user.created_at).toLocaleString()}</td>
                            <td>
                                <button
                                    style={{ backgroundColor: '#FFA500', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    onClick={() => openEditModal(user)}
                                >
                                    Editar
                                </button>
                                <button
                                    style={{ backgroundColor: '#FF6347', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', marginLeft: '10px' }}
                                    onClick={() => openDeleteModal(user)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para Editar Usuario */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel="Editar Usuario"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#FFF5E1', // Fondo amarillo claro
                        border: '1px solid #FFA500', // Borde naranja
                        borderRadius: '8px'
                    }
                }}
            >
                <h2 style={{ color: '#FFA500' }}>Editar Usuario</h2>
                {currentUser && (
                    <form onSubmit={handleEdit}>
                        <label>
                            Nombre Completo:
                            <input
                                type="text"
                                name="full_name"
                                value={updatedUser.full_name}
                                onChange={handleInputChange}
                                style={{ marginBottom: '10px' }}
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={updatedUser.email}
                                onChange={handleInputChange}
                                style={{ marginBottom: '10px' }}
                            />
                        </label>
                        <br />
                        <label>
                            Tipo:
                            <input
                                type="text"
                                name="tipo"
                                value={updatedUser.tipo}
                                onChange={handleInputChange}
                                style={{ marginBottom: '10px' }}
                            />
                        </label>
                        <br />
                        <button
                            type="submit"
                            style={{ backgroundColor: '#FFA500', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer' }}
                        >
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            onClick={closeEditModal}
                            style={{ backgroundColor: '#FF6347', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer', marginLeft: '10px' }}
                        >
                            Cancelar
                        </button>
                    </form>
                )}
            </Modal>

            {/* Modal para Confirmar Eliminación */}
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Confirmar Eliminación"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#FFF5E1', // Fondo amarillo claro
                        border: '1px solid #FFA500', // Borde naranja
                        borderRadius: '8px'
                    }
                }}
            >
                <h2 style={{ color: '#FFA500' }}>Confirmar Eliminación</h2>
                {currentUser && (
                    <div>
                        <p>¿Estás seguro de que deseas eliminar al usuario <strong>{currentUser.full_name}</strong>?</p>
                        <button
                            onClick={handleDelete}
                            style={{ backgroundColor: '#FFA500', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer' }}
                        >
                            Eliminar
                        </button>
                        <button
                            onClick={closeDeleteModal}
                            style={{ backgroundColor: '#FF6347', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer', marginLeft: '10px' }}
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UsersList;
