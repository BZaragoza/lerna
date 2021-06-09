/*Database: dpasada*/

-- Table structure for table `chip`
--

CREATE DATABASE IF NOT EXISTS dpasada;
USE dpasada;

DROP TABLE IF EXISTS `chip`;
CREATE TABLE `chip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `compañia` varchar(15) NOT NULL DEFAULT 'No',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;

--
-- Dumping data for table `chip`
--

LOCK TABLES `chip` WRITE;
INSERT INTO `chip` VALUES (1,'Telcel'),(2,'Movistar'),(4,'AT&T'),(5,'Pillofon'),(6,'No'),(8,'Virgin'),(9,'Unefon');
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

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
) ENGINE=InnoDB;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
INSERT INTO `clientes` VALUES (38,'Brian','Zaragoza','Fierro','6141735464','6142040120','Bien guapo',1),(39,'Daniel','Batista','Alvarado','8445916200',NULL,NULL,1),(40,'Jonas','Gibson',NULL,'+9996188305932',NULL,NULL,1),(41,'Flossie','Corwin',NULL,'+6673207770389',NULL,NULL,1),(42,'Zachary','Blick',NULL,'+1732197043348',NULL,NULL,1),(43,'Braden','Ullrich',NULL,'+8985426629563',NULL,NULL,0),(44,'Sallie','Rath',NULL,'+8359287101664',NULL,NULL,0),(45,'Gerardo','Mills',NULL,'+8553510197555',NULL,NULL,1),(46,'Katrina','Pfannerstill',NULL,'+3296789429658',NULL,NULL,1),(94,'Juan','Camaney',NULL,'6141234567',NULL,NULL,1),(106,'Dua','Lipa',NULL,'6141372522',NULL,'Cosa linda',0),(108,'Juan','Camaney',NULL,'6141735464',NULL,NULL,1),(109,'Boris','Johnson',NULL,'6145423781',NULL,NULL,1),(110,'Jefferson','Gutierritos',NULL,'6141234567',NULL,NULL,0),(111,'Isaac','Newton',NULL,'8441242572',NULL,'Medio rarito',1),(112,'James Clerk','Maxwell',NULL,'6141372522',NULL,NULL,1),(113,'Emmy','Noether',NULL,'6912328494',NULL,NULL,1),(114,'Daniel','Ferreiro','Rodriguez','6131251212','1289791231',NULL,0);
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
) ENGINE=InnoDB;

--
-- Dumping data for table `fallas`
--

LOCK TABLES `fallas` WRITE;
INSERT INTO `fallas` VALUES (5,'CC','Centro de carga dañado'),(6,'Pantalla','Pantalla dañada'),(7,'Touch mojado','No funciona touch, humedad presente'),(8,'AT&T','Pertenece a compañia AT&T'),(10,'Google','Equipo bloqueado con cuenta de Google'),(12,'Bocina','En malas condiciones, reemplazar'),(17,'Liberar','Liberación de red'),(19,'Batería','No carga, descalibrada o inflada');
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
CREATE TABLE `marcas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `marca_UNIQUE` (`marca`)
) ENGINE=InnoDB;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
INSERT INTO `marcas` VALUES (34,'Apple'),(35,'Blu'),(41,'Google'),(6,'Huawei'),(5,'LG'),(17,'Motorola'),(25,'Oppo'),(38,'Realme'),(2,'Samsung'),(4,'Xiaomi');
UNLOCK TABLES;

--
-- Table structure for table `modelos`
--

DROP TABLE IF EXISTS `modelos`;
CREATE TABLE `modelos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca_id` int DEFAULT NULL,
  `modelo` varchar(35) NOT NULL,
  `modelo_num` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `modelos`
--

LOCK TABLES `modelos` WRITE;
INSERT INTO `modelos` VALUES (28,17,'Moto E4','E4'),(31,6,'P30 Lite','P30L'),(37,5,'G6','G6'),(45,34,'iPhone 25','A25'),(46,34,'iPhone 5','A5'),(47,34,'iPhone X','AX'),(48,34,'iPhone 5C','A5C'),(49,6,'P30 Pro','P30p'),(50,17,'Droid Turbo','XT1524'),(51,2,'S7 Edge','SM-G935F'),(52,2,'S8','SM-G950'),(53,2,'A51','SM-A515F'),(54,4,'Redmi 8A','X8A'),(55,4,'Redmi 8','X8'),(56,4,'Redmi Note 7','XRN7'),(57,34,'iPhone Xs Max','AXSM'),(58,25,'A5','OA5'),(59,2,'A50','SM-A05G'),(60,34,'iPhone XR','AXR'),(61,2,'Galaxy J2 Core','SM-J260M'),(62,2,'Galaxy A30','SM-A305G'),(65,41,'Pixel 3 XL','P3XL'),(66,41,'Pixel XL','PXL');
UNLOCK TABLES;

--
-- Table structure for table `msd`
--

DROP TABLE IF EXISTS `msd`;
CREATE TABLE `msd` (
  `id` int NOT NULL AUTO_INCREMENT,
  `capacidad` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
--
-- Dumping data for table `msd`
--

LOCK TABLES `msd` WRITE;
INSERT INTO `msd` VALUES (1,2),(2,4),(3,8),(4,16),(5,32),(6,64),(15,0),(17,128);
UNLOCK TABLES;

--
-- Table structure for table `soluciones`
--

DROP TABLE IF EXISTS `soluciones`;
CREATE TABLE `soluciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `falla_id` int NOT NULL,
  `solucion` varchar(25) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`),
  KEY `soluciones.falla:id_idx` (`falla_id`),
  CONSTRAINT `soluciones.falla_id` FOREIGN KEY (`falla_id`) REFERENCES `fallas` (`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `soluciones`
--

LOCK TABLES `soluciones` WRITE;
INSERT INTO `soluciones` VALUES (24,17,'Revisar','Sólo revisión'),(25,17,'Liberar','Liberar'),(28,6,'Revisar','Sólo Revisión'),(29,6,'Cambiar','Cambiar pieza'),(30,6,'Cotizar y pedir pieza','Pedir pieza'),(31,5,'Revisar','Sólo Revisión'),(32,5,'Cambiar','Cambiar pieza'),(33,5,'Cotizar y pedir pieza','Pedir pieza'),(35,12,'Cotización','Cotizar y pedir pieza'),(36,19,'Cotizar','Cotizar');
UNLOCK TABLES;

--
-- Table structure for table `orden_servicio`
--

DROP TABLE IF EXISTS `orden_servicio`;
CREATE TABLE `orden_servicio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `folio` varchar(10) NOT NULL,
  `receptionDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deadlineDate` timestamp NOT NULL,
  `client_id` int NOT NULL,
  `telefono1` varchar(15) DEFAULT NULL,
  `telefono2` varchar(15) DEFAULT NULL,
  `marca_id` int NOT NULL,
  `modelo_id` int NOT NULL,
  `dejo` tinyint(1) NOT NULL DEFAULT '0',
  `falla_id` int NOT NULL,
  `solucion_id` int NOT NULL,
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
  `status` enum('Reparar','Cotizar','Comprar Pieza','Esperando Refacción','Entregar','Entregado','Pendiente','En Otro Taller','Perdido o Comprado') DEFAULT 'Reparar',
  PRIMARY KEY (`id`),
  KEY `orden_servicio_ibfk_5_idx` (`marca_id`),
  KEY `orden_servicio_ibfk_6_idx` (`modelo_id`),
  KEY `orden_servicio_ibfk_7_idx` (`falla_id`),
  KEY `orden_servicio_ibfk_8_idx` (`solucion_id`),
  KEY `orden_servicio_ibfk_3` (`chip`),
  KEY `orden_servicio_ibfk_4` (`msd`),
  KEY `orden_servicio_ibfk_1` (`client_id`),
  CONSTRAINT `orden_servicio_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`),
  CONSTRAINT `orden_servicio_ibfk_3` FOREIGN KEY (`chip`) REFERENCES `chip` (`id`),
  CONSTRAINT `orden_servicio_ibfk_4` FOREIGN KEY (`msd`) REFERENCES `msd` (`id`),
  CONSTRAINT `orden_servicio_ibfk_5` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`),
  CONSTRAINT `orden_servicio_ibfk_6` FOREIGN KEY (`modelo_id`) REFERENCES `modelos` (`id`),
  CONSTRAINT `orden_servicio_ibfk_7` FOREIGN KEY (`falla_id`) REFERENCES `fallas` (`id`),
  CONSTRAINT `orden_servicio_ibfk_8` FOREIGN KEY (`solucion_id`) REFERENCES `soluciones` (`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `orden_servicio`
--

LOCK TABLES `orden_servicio` WRITE;
INSERT INTO `orden_servicio` VALUES (10,'RC0860','2021-04-11 08:59:18','2021-04-13 00:00:00',38,'6141735464','6142040120',34,45,1,17,25,1,6,15,1000,500,500,0,'','','',1,'Cotizar'),(11,'RC0861','2021-04-11 09:17:38','2021-04-11 09:17:38',39,'8445916200',NULL,41,66,0,19,36,0,6,15,0,0,0,0,'12345','12345','',0,'Entregado'),(12,'RC0862','2021-04-12 10:13:23','2021-04-12 10:13:23',113,'6912328494',NULL,17,28,1,6,30,1,6,15,0,0,0,0,'2522','','Probablemente tenga humedad',1,'Entregar'),(13,'RC0863','2021-04-12 10:15:29','2021-04-12 10:15:29',112,'6141372522',NULL,2,59,1,6,30,1,1,15,0,0,0,0,'2522','2522','Posible humedad',1,'Esperando Refacción');
UNLOCK TABLES;