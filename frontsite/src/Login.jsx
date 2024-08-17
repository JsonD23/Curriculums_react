import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        email: username,
        password,
      });
      Swal.fire({
        title: 'Éxito!',
        text: response.data.msg,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        navigate('/home');
      });
    } catch (error) {
      const errorMessage = error.response?.data.detail || 'Login failed';
      Swal.fire({
        title: 'Error!',
        text: typeof errorMessage === 'string' ? errorMessage : 'Error desconocido',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <div className="login-container">
      <img src="../assets/logo1.png" alt="Logo" className="logo" />

      <button 
        className="register-button" 
        onClick={() => navigate('/register')}
      >
        Registrarse
      </button>

      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
