import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const ModernTemplate = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [workingInfo, setWorkingInfo] = useState(null);
  const [competencia, setCompetencia] = useState(null);
  const [escuela, setEscuela] = useState(null);
  const [idioma, setIdioma] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const [colors, setColors] = useState({
    header: '#2d3436',
    section: '#00b894',
    background: '#ffffff',
    text: '#2d3436',
    sidebar: '#f0f0f0',
  });

  const printRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, workingResponse, competenciaResponse, escuelaResponse, idiomaResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/cv/userinfoextra/1'),
          axios.get('http://127.0.0.1:8000/cv/working/1'),
          axios.get('http://127.0.0.1:8000/cv/competencias/1'),
          axios.get('http://127.0.0.1:8000/cv/escuela/1'),
          axios.get('http://127.0.0.1:8000/cv/idiomas/1'),
        ]);

        setUserInfo(userResponse.data);
        setWorkingInfo(workingResponse.data);
        setCompetencia(competenciaResponse.data);
        setEscuela(escuelaResponse.data);
        setIdioma(idiomaResponse.data);

        // Obtener la foto automáticamente
        const photoResponse = await axios.get(`http://localhost:8000/cv/photo/0`, {
          responseType: 'blob', // Importante para manejar archivos binarios
        });

        // Crear una URL de objeto para la imagen
        const url = URL.createObjectURL(photoResponse.data);
        setPhotoURL(url);
      } catch (err) {
        setError('Error al obtener los datos');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setColors((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
  };

  const exportToPDF = () => {
    html2canvas(printRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [210, 297], // Tamaño A4 en milímetros
      });
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight - pageHeight;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      if (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
      }

      pdf.save('curriculum.pdf');
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!userInfo || !workingInfo || !competencia || !escuela || !idioma) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2>Configuración de Colores</h2>
        <label>
          Color del Encabezado:
          <input type="color" name="header" value={colors.header} onChange={handleColorChange} />
        </label>
        <br />
        <label>
          Color de Sección:
          <input type="color" name="section" value={colors.section} onChange={handleColorChange} />
        </label>
        <br />
        <label>
          Color de Fondo:
          <input type="color" name="background" value={colors.background} onChange={handleColorChange} />
        </label>
        <br />
        <label>
          Color de Texto:
          <input type="color" name="text" value={colors.text} onChange={handleColorChange} />
        </label>
        <br />
        <label>
          Color de Fondo (Barra Lateral):
          <input type="color" name="sidebar" value={colors.sidebar} onChange={handleColorChange} />
        </label>
        <br />
        
        <button onClick={exportToPDF} style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#00b894',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>Exportar como PDF</button>
        
        <button onClick={() => navigate('/felicidades')} style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#e74c3c',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>Regresar a Felicidades</button>
      </div>
      
      <div style={{
        display: 'flex',
        maxWidth: '210mm', // Ajuste para caber en una página A4
        maxHeight: '297mm',
        overflow: 'hidden',
        margin: '0 auto',
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        border: `1px solid ${colors.sidebar}`,
        borderRadius: '8px',
      }} ref={printRef}>
        
        <div style={{
          width: '30%',
          backgroundColor: colors.sidebar,
          padding: '20px',
          borderRadius: '8px',
        }}>
          {photoURL && (
            <img 
              src={photoURL} 
              alt="Foto del Currículum" 
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '20px',
              }} 
            />
          )}
          <h2 style={{ fontSize: '22px', color: colors.header }}>Información Personal</h2>
          <p><strong>Nombre:</strong> {userInfo.data_cont}</p>
          <p><strong>Fecha de Nacimiento:</strong> {userInfo.borned}</p>
          <p><strong>Redes Sociales 1:</strong> {userInfo.networks1}</p>
          <p><strong>Redes Sociales 2:</strong> {userInfo.networks2}</p>
        </div>
        
        <div style={{ width: '70%', marginLeft: '20px' }}>
          <h1 style={{
            borderBottom: `2px solid ${colors.section}`,
            paddingBottom: '10px',
            fontSize: '32px',
            color: colors.header
          }}>Currículum Vitae</h1>
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{
              borderBottom: `2px solid ${colors.section}`,
              paddingBottom: '5px',
              fontSize: '24px',
              color: colors.section
            }}>Experiencia Profesional</h2>
            <p><strong>Puesto:</strong> {workingInfo.puesto}</p>
            <p><strong>Empresa:</strong> {workingInfo.enterprise}</p>
            <p><strong>Ubicación:</strong> {workingInfo.ubication}</p>
            <p><strong>Fecha Inicio:</strong> {workingInfo.fecha_init}</p>
            <p><strong>Fecha Final:</strong> {workingInfo.fecha_final}</p>
            <p><strong>Funciones:</strong> {workingInfo.functions}</p>
            <p><strong>Recompensas:</strong> {workingInfo.rewards}</p>
          </section>
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{
              borderBottom: `2px solid ${colors.section}`,
              paddingBottom: '5px',
              fontSize: '24px',
              color: colors.section
            }}>Educación</h2>
            <p><strong>Grado:</strong> {escuela.grado}</p>
            <p><strong>Escuela:</strong> {escuela.escuela}</p>
            <p><strong>Ubicación:</strong> {escuela.ubi}</p>
            <p><strong>Fecha de Inicio:</strong> {escuela.inicio}</p>
            <p><strong>Fecha de Fin:</strong> {escuela.fin}</p>
            <p><strong>Fecha de Graduación:</strong> {escuela.fecha_grad}</p>
            <p><strong>Cédula:</strong> {escuela.cedula}</p>
            <p><strong>Reconocimientos:</strong> {escuela.reconocimientos || 'Ninguno'}</p>
          </section>
          <section>
            <h2 style={{
              borderBottom: `2px solid ${colors.section}`,
              paddingBottom: '5px',
              fontSize: '24px',
              color: colors.section
            }}>Idiomas</h2>
            <p><strong>Nombre del Idioma:</strong> {idioma.nombre_idioma}</p>
            <p><strong>Nivel:</strong> {idioma.Nivel}</p>
            <p><strong>Escuela de Idioma:</strong> {idioma.escuela_idioma || 'Ninguna'}</p>
            <p><strong>Fecha del Idioma:</strong> {idioma.Fecha_idioma || 'No disponible'}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
