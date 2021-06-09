IF NOT EXISTS CREATE DATABASE dpasada;

CREATE TABLE clientes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    num_telefono VARCHAR(10)
);

CREATE TABLE chip (
	id INT PRIMARY KEY AUTO_INCREMENT,
    compañia VARCHAR(15) NOT NULL DEFAULT 'No'
);

CREATE TABLE msd (
	id INT PRIMARY KEY AUTO_INCREMENT,
    capacidad INT NOT NULL DEFAULT 0
);

CREATE TABLE modelos (
	id INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(35) NOT NULL
);

CREATE TABLE marcas (
	id INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(15) NOT NULL
);

CREATE TABLE fallas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    descripcion TEXT
);

CREATE TABLE soluciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    falla VARCHAR(25) NOT NULL,
    solucion VARCHAR(25) NOT NULL,
    descripcion TEXT 
);

CREATE TABLE equipos (
	id INT PRIMARY KEY AUTO_INCREMENT,
    marca_id INT NOT NULL, /*FK*/
    modelo_id INT NOT NULL, /*FK*/
    
    FOREIGN KEY (marca_id) REFERENCES marcas(id),
    FOREIGN KEY (modelo_id) REFERENCES modelos(id)
);

CREATE TABLE orden_falla (
	id INT PRIMARY KEY AUTO_INCREMENT,
    orden_id INT NOT NULL, /*FK*/
    falla_id INT NOT NULL, /*FK*/
    
    FOREIGN KEY (orden_id) REFERENCES orden_servicio(id),
    FOREIGN KEY (falla_id) REFERENCES fallas(id)
);

CREATE TABLE orden_servicio (
	id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL, /*FK*/
    equipo_id INT NOT NULL, /*FK*/
    falla_id INT NOT NULL, /*FK*/
    costo INT NOT NULL DEFAULT 0,
    anticipo INT NOT NULL DEFAULT 0,
    resta INT NOT NULL DEFAULT 0,
    chip_id INT NOT NULL, /*FK*/
    msd_id INT NOT NULL, /*FK*/
    contraseña VARCHAR(30),
    fecha_entrega TIMESTAMP,
    nota TEXT,
    dejo_celular BOOLEAN NOT NULL DEFAULT 0,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (equipo_id) REFERENCES equipos(id),
    FOREIGN KEY (chip_id) REFERENCES chip(id),
    FOREIGN KEY (msd_id) REFERENCES msd(id)
);

INSERT INTO clientes (nombre, num_telefono) 
VALUES ('Brian Zaragoza', 6141735464);

INSERT INTO chip (compañia)
VALUES ('Telcel'), ('Movistar'), ('Unefon'), ('AT&T'), ('Pillofon');
SELECT * FROM chip;

INSERT INTO msd (capacidad)
VALUES (2), (4), (8), (16), (32), (64), (0);
SELECT * FROM msd;

INSERT INTO marcas (marca)
VALUES ('Motorola'), ('Samsung'), ('Apple'), ('Xiaomi'), ('LG'), ('Huawei');
SELECT * FROM marcas;

INSERT INTO modelos (modelo)
VALUES ('iPhone 11'), ('Galaxy A51'), ('Redmi Note 8'), ('Redmi Note 8 Pro'),
('iPhone XR'), ('iPhone 11 Pro Max'), ('Galaxy S20+5G');
SELECT * FROM modelos;




