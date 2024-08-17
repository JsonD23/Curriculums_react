// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import UserList from './UserManagement';
import AddUser from './AddUser';
import Login from './Login';
import EditUser from './EditUser';
import CurriculumForm from './components/CurriculumForm';
import UserForm from './components/UserForm';
import Curriextra from './components/Curriextra';
import CurripartII from './components/Currilaboral';
import Curricomp from './components/Curricomp';
import Currischool from './components/Currischool';
import Curriidiomas from './components/Curriidiomas';
import Userimage from './components/Userimage'
import Imagesave from './components/Imagesave'
import { Felicidades } from './components/Felicidades';
import PlantillaCV from './components/PlantillaCV';
import Viewerextra from './components/Viewerextra';
import VerIdioma from './components/Template1';
import VerEscuela from './components/Template2';

import Template2 from './components/Template2'

import Viewprueba from './components/Viewprueba';

import Editwork  from './components/Editwork';

import Uploading2 from './components/Uploading';
import Vermifoto from  './components/Vermifoto'
import EditCv from './components/Editcv';
import Template3 from './components/Template3'
import Editpersonal from './components/Editpersonal';
import EditCompetencia from './components/Editcomp';
import EditEscuela from './components/Editescuela';
import Editidioma from './components/editidioma';
 import Eraser from './components/Deleter/Eraser'
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/viewp" element={<Viewprueba />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/Forms" element={<CurriculumForm />} />
        <Route path="/curriculum" element={<UserForm />} />
        <Route path="/curri2" element={<Curriextra />} />
        <Route path="/form3" element={<CurripartII />} />
        <Route path="/curricomp" element={<Curricomp />} />
        <Route path="/currischool" element={<Currischool />} />
        <Route path="/curriidiomas" element={<Curriidiomas/>} />
        <Route path="/userimage" element={<Userimage/>} />
        <Route path="/imagesave" element={<Imagesave/>} />
        <Route path="/felicidades" element={<Felicidades/>} />
        <Route path="/plantilla1" element={<PlantillaCV/>} />
        <Route path="/viewer2" element={<Viewerextra/>} />
        <Route path="/template1" element={<VerIdioma/>} />
        <Route path="/template3" element={<Template3/>} />
      
        <Route path="/template2" element={<Template2/>} />
        <Route path="/verescuela" element={<VerEscuela/>} />
        <Route path="/prueba" element={<Uploading2/>} />
        <Route path="/prueba2" element={<Vermifoto/>} />

        <Route path="/edit-cv" element={<EditCv/>} />
        <Route path="/edit-work" element={<Editwork/>} />
        <Route path="/edit-personal-data" element={<Editpersonal/>} />
        <Route path="/edit-skills" element={<EditCompetencia/>} />
        <Route path="/edit-school" element={<EditEscuela/>} />
        <Route path="/edit-language" element={<Editidioma/>} />
        <Route path="/eraser" element={<Eraser/>} />
      </Routes>
    </Router>
  );
};

export default App;
