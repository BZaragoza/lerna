DROP TABLE IF EXISTS `chip`;
CREATE TABLE `chip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `compañia` varchar(15) NOT NULL DEFAULT 'No',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9;


LOCK TABLES `chip` WRITE;
INSERT INTO `chip` VALUES (1,'Telcel'),(2,'Movistar'),(3,'Unefon'),(4,'AT&T'),(5,'Pillofon'),(6,'No'),(8,'Virgin');
UNLOCK TABLES;

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `telefono1` varchar(20) NOT NULL,
  `telefono2` varchar(20) DEFAULT NULL,
  `notas` text,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113;



LOCK TABLES `clientes` WRITE;
INSERT INTO `clientes` VALUES (38,'Brian','Zaragoza','Fierro','6141735464',NULL,'Bien guapo',1),(39,'Daniel','Batista','Alvarado','8445916200',NULL,NULL,1),(40,'Jonas','Gibson',NULL,'+9996188305932',NULL,NULL,1),(41,'Flossie','Corwin',NULL,'+6673207770389',NULL,NULL,1),(42,'Zachary','Blick',NULL,'+1732197043348',NULL,NULL,1),(43,'Braden','Ullrich',NULL,'+8985426629563',NULL,NULL,0),(44,'Sallie','Rath',NULL,'+8359287101664',NULL,NULL,0),(45,'Gerardo','Mills',NULL,'+8553510197555',NULL,NULL,1),(46,'Katrina','Pfannerstill',NULL,'+3296789429658',NULL,NULL,1),(94,'Juan','Camaney',NULL,'6141234567',NULL,NULL,1),(108,'Juan','Camaney',NULL,'6141735464',NULL,NULL,1),(109,'Boris','Johnson',' ','6145423781',' ',' ',1),(110,'Jefferson','Gutierritos','X','6141234567','X','X',0),(111,'Isaac','Newton',' ','8441242572',NULL,' Medio rarito',1),(112,'James Clerk','Maxwell',NULL,'6141372522',NULL,NULL,1);
UNLOCK TABLES;

--
-- Table structure for table `fallas`
--

DROP TABLE IF EXISTS `fallas`;
CREATE TABLE `fallas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `falla` varchar(60) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20;

--
-- Dumping data for table `fallas`
--

LOCK TABLES `fallas` WRITE;
INSERT INTO `fallas` VALUES (5,'CC','Centro de carga dañado'),(6,'Pantalla','Pantalla dañada'),(7,'Touch mojado','No funciona touch, humedad presente'),(8,'AT&T','Pertenece a compañia AT&T'),(10,'Google','Equipo bloqueado con cuenta de Google'),(12,'Bocina','En malas condiciones, reemplazar'),(17,'Liberar','Liberación de red'),(19,'Batería','No carga, descalibrada o inflada');
UNLOCK TABLES;


DROP TABLE IF EXISTS `marcas`;
CREATE TABLE `marcas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `marca_UNIQUE` (`marca`)
) ENGINE=InnoDB AUTO_INCREMENT=41;



LOCK TABLES `marcas` WRITE;
INSERT INTO `marcas` VALUES (34,'Apple'),(35,'Blu'),(6,'Huawei'),(5,'LG'),(17,'Motorola'),(25,'Oppo'),(38,'Realme'),(2,'Samsung'),(4,'Xiaomi');
UNLOCK TABLES;



DROP TABLE IF EXISTS `modelos`;
CREATE TABLE `modelos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca_id` int DEFAULT NULL,
  `modelo` varchar(35) NOT NULL,
  `modelo_num` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65;

--
-- Dumping data for table `modelos`
--

LOCK TABLES `modelos` WRITE;
INSERT INTO `modelos` VALUES (28,17,'Moto E4','E4'),(31,6,'P30 Lite','P30L'),(37,5,'G6','G6'),(45,34,'iPhone 25','A25'),(46,34,'iPhone 5','A5'),(47,34,'iPhone X','AX'),(48,34,'iPhone 5C','A5C'),(49,6,'P30 Pro','P30p'),(50,17,'Droid Turbo','XT1524'),(51,2,'S7 Edge','SM-G935F'),(52,2,'S8','SM-G950'),(53,2,'A51','SM-A515F'),(54,4,'Redmi 8A','X8A'),(55,4,'Redmi 8','X8'),(56,4,'Redmi Note 7','XRN7'),(57,34,'iPhone Xs Max','AXSM'),(58,25,'A5','OA5'),(59,2,'A50','SM-A05G'),(60,34,'iPhone XR','AXR'),(61,2,'Galaxy J2 Core','SM-J260M'),(62,2,'Galaxy A30','SM-A305G');
UNLOCK TABLES;


DROP TABLE IF EXISTS `msd`;
CREATE TABLE `msd` (
  `id` int NOT NULL AUTO_INCREMENT,
  `capacidad` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18;



LOCK TABLES `msd` WRITE;
INSERT INTO `msd` VALUES (1,2),(2,4),(3,8),(4,16),(5,32),(6,64),(15,0),(17,128);
UNLOCK TABLES;



DROP TABLE IF EXISTS `soluciones`;
CREATE TABLE `soluciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `falla_id` int NOT NULL,
  `solucion` varchar(25) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`),
  KEY `soluciones.falla:id_idx` (`falla_id`),
  CONSTRAINT `soluciones.falla_id` FOREIGN KEY (`falla_id`) REFERENCES `fallas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36;



LOCK TABLES `soluciones` WRITE;
INSERT INTO `soluciones` VALUES (24,17,'Revisar','Sólo revisión'),(25,17,'Liberar','Liberar'),(27,10,'Revisar','Sólo revisión'),(28,6,'Revisar','Sólo Revisión'),(29,6,'Cambiar','Cambiar pieza'),(30,6,'Cotizar y pedir pieza','Pedir pieza'),(31,5,'Revisar','Sólo Revisión'),(32,5,'Cambiar','Cambiar pieza'),(33,5,'Cotizar y pedir pieza','Pedir pieza'),(35,12,'Cotización','Cotizar y pedir pieza');
UNLOCK TABLES;



DROP TABLE IF EXISTS `orden_servicio`;
CREATE TABLE `orden_servicio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `folio` varchar(10) NOT NULL,
  `receptionDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deadlineDate` timestamp NOT NULL,
  `client_id` int NOT NULL,
  `telefono1` varchar(15) DEFAULT NULL,
  `telefono2` varchar(15) DEFAULT NULL,
  `marca` int NOT NULL,
  `modelo` int NOT NULL,
  `dejo` tinyint(1) NOT NULL DEFAULT '0',
  `falla` int NOT NULL,
  `solucion` int NOT NULL,
  `battery` tinyint(1) DEFAULT '1',
  `chip` int NOT NULL,
  `msd` int NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `anticipo` int NOT NULL DEFAULT '0',
  `remain` int NOT NULL DEFAULT '0',
  `charger` tinyint(1) DEFAULT '0',
  `pin1` varchar(25) DEFAULT NULL,
  `pin2` varchar(25) DEFAULT NULL,
  `notes` text,
  `encendido` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `orden_servicio_ibfk_5_idx` (`marca`),
  KEY `orden_servicio_ibfk_6_idx` (`modelo`),
  KEY `orden_servicio_ibfk_7_idx` (`falla`),
  KEY `orden_servicio_ibfk_8_idx` (`solucion`),
  KEY `orden_servicio_ibfk_3` (`chip`),
  KEY `orden_servicio_ibfk_4` (`msd`),
  KEY `orden_servicio_ibfk_1` (`client_id`),
  CONSTRAINT `orden_servicio_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`),
  CONSTRAINT `orden_servicio_ibfk_3` FOREIGN KEY (`chip`) REFERENCES `chip` (`id`),
  CONSTRAINT `orden_servicio_ibfk_4` FOREIGN KEY (`msd`) REFERENCES `msd` (`id`),
  CONSTRAINT `orden_servicio_ibfk_5` FOREIGN KEY (`marca`) REFERENCES `marcas` (`id`),
  CONSTRAINT `orden_servicio_ibfk_6` FOREIGN KEY (`modelo`) REFERENCES `modelos` (`id`),
  CONSTRAINT `orden_servicio_ibfk_7` FOREIGN KEY (`falla`) REFERENCES `fallas` (`id`),
  CONSTRAINT `orden_servicio_ibfk_8` FOREIGN KEY (`solucion`) REFERENCES `soluciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8;


LOCK TABLES `orden_servicio` WRITE;
INSERT INTO `orden_servicio` VALUES (3,'RC0860','2021-03-31 01:17:00','2021-04-07 00:38:00',38,'6141735464','X',17,50,1,17,25,1,6,5,250,100,150,0,'1234',NULL,'Bien guapo el cliente',1),(6,'RC0861','2021-04-02 02:46:00','2021-04-07 09:44:00',39,'8445916200','X',2,51,0,6,30,0,6,15,0,0,0,0,'X','X','X',0),(7,'RC0862','2021-04-02 02:21:00','2021-04-07 22:41:00',111,'8441242572','X',25,58,1,5,32,1,6,15,150,0,150,0,'X','X','X',0);
UNLOCK TABLES;