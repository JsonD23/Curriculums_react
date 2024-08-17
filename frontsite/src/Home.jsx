import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Importa el archivo de estilos

const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/Forms" className="nav-link">FORM </Link>
          </li>
          <li className="nav-item">
            <Link to="/user-list" className="nav-link">CRUD </Link>
          </li>
      
        </ul>
      </nav>
      <div className="content">
    
        <h1>BIENVENIDO A CURRIEASY  </h1>
        <h2>El mejor sitio para crear tus curriculums   </h2>
        <div className="button-container">
          <Link to="/curri2" className="start-button">Comenzar a llenar formulario</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
