use goodness_base
CREATE TABLE fotos (
    id INT PRIMARY KEY ,        
    foto LONGBLOB               
);
Create table extrainfo( 
  id INT AUTO_INCREMENT PRIMARY KEY,
  borned date,
  data_cont varchar(255),
  networks1 varchar(255),
networks2 varchar(255)
)
select * from extrainfo

create table working(
 id INT AUTO_INCREMENT PRIMARY KEY,
puesto varchar(255),
enterprise varchar(255),
ubication varchar(255),
fecha_init date ,
fecha_final date,
functions varchar(255),
rewards varchar(255)
)
select * from working

CREATE TABLE curriculum (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    education TEXT,
    workExperience TEXT,
    skills TEXT
);
create table competencias(

nombre_c varchar(255),
habilidades varchar (255),
nombre_inst varchar(255),
fecha_exp date 
)
create table escuela (
 id INT AUTO_INCREMENT PRIMARY KEY,
grado varchar (255),
escuela varchar (255),
ubi varchar(255),
inicio date ,
fin date,
fecha_grad date,
cedula varchar (255) ,
reconocimientos varchar (255)
)
CREATE TABLE idioma (
id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_idioma VARCHAR(255),
    Nivel varchar(255),
    escuela_idioma VARCHAR(255),
    Fecha_idioma date
);