CREATE DATABASE IF NOT EXISTS dpasada;
USE dpasada;

DROP TABLE IF EXISTS `chip`;
CREATE TABLE `chip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `compañia` varchar(15) NOT NULL DEFAULT 'No',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `chip`
--

LOCK TABLES `chip` WRITE;
INSERT INTO `chip` VALUES (11,'NO'),(12,'TELCEL'),(13,'MOVISTAR'),(17,'VIRGINIA'),(20,'PILLOFON'),(29,'AT&T'),(31,'BAIT'),(33,'ESIM');
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

LOCK TABLES `clientes` WRITE;
INSERT INTO `clientes` VALUES (38,'BRIAN','ZARAGOZA','FIERRO','6141735464',NULL,NULL,1),(39,'DANIEL','BATISTA','ALVARADO','8445916200',NULL,NULL,1),(40,'JONAS','GIBSON',NULL,'9996188305932',NULL,NULL,1),(46,'KATRINA','PFANNERSTILL',NULL,'3296789429658',NULL,NULL,1),(148,'JOSE','MADERO',NULL,'6141735464',NULL,NULL,1),(149,'FLOR','MENDOZA',NULL,'8123120912312',NULL,NULL,1),(152,'PATRICIO','RAMIREZ',NULL,'1231807931',NULL,NULL,1),(184,'JUAN','REYES','GOMEZ','8445916200',NULL,NULL,1),(186,'JOSE ','SANCHEZ','HERNANDEZ','8445916200',NULL,NULL,1),(193,'DASDASDAS','RERE','RTRT','8445678902',NULL,NULL,1),(194,'DENNIS','SCHULIST',NULL,'8442350592',NULL,NULL,1);
UNLOCK TABLES;


DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `device_UNIQUE` (`device`)
) ENGINE=InnoDB;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
INSERT INTO `devices` VALUES (71,'CARRO'),(70,'CELULAR'),(25,'LAPTOP'),(36,'RADIO'),(35,'TV');
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
INSERT INTO `fallas` VALUES (5,'CC','CENTRO DE CARGA DAÑADO'),(6,'PANTALLA','PANTALLA DANADA'),(7,'TOUCH MOJADO','NO FUNCIONA TOUCH, HUMEDAD PRESENTE'),(10,'GOOGLE','EQUIPO BLOQUEADO CON CUENTA DE GOOGLE'),(12,'BOCINA','EN MALAS CONDICIONES, REEMPLAZAR'),(17,'LIBERAR','LIBERACIÓN DE RED'),(31,'TUERTO',NULL);
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
INSERT INTO `marcas` VALUES (34,'APPLE'),(46,'BLU'),(70,'HONOR'),(53,'HUAWEI'),(47,'LANIX'),(50,'LENOVO'),(17,'MOTOROLA'),(54,'NOKIA'),(72,'TCL'),(4,'XIAOMI');
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
INSERT INTO `modelos` VALUES (45,34,'IPHONE 25','A25'),(46,34,'IPHONE 5','A5'),(47,34,'IPHONE X','AX'),(50,17,'DROID TURBO','XT1524'),(54,4,'REDMI 8A','X8A'),(55,4,'REDMI 8','X8'),(88,17,'ONE VISION','ON1231'),(90,17,'MOTO E45','XT1523'),(94,79,'AJOSa','1523');
UNLOCK TABLES;

--
-- Table structure for table `msd`
--

DROP TABLE IF EXISTS `msd`;
CREATE TABLE `msd` (
  `id` int NOT NULL AUTO_INCREMENT,
  `capacidad` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `capacidad_UNIQUE` (`capacidad`)
) ENGINE=InnoDB;

--
-- Dumping data for table `msd`
--

LOCK TABLES `msd` WRITE;
INSERT INTO `msd` VALUES (15,0),(35,2),(2,4),(41,8),(31,16),(5,32),(32,64),(30,256);
UNLOCK TABLES;

--
-- Table structure for table `orden_servicio`
--

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
  CONSTRAINT `soluciones.falla_id` FOREIGN KEY (`falla_id`) REFERENCES `fallas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

--
-- Dumping data for table `soluciones`
--

LOCK TABLES `soluciones` WRITE;
INSERT INTO `soluciones` VALUES (25,17,'LIBERAR','LIBERA'),(27,10,'REVISAR','SÓLO REVISIÓN'),(28,6,'REVISAR','SÓLO REVISIÓN'),(29,6,'CAMBIAR','CAMBIAR PIEZA'),(30,6,'COTIZAR Y PEDIR','PEDIR PIEZA'),(31,5,'REVISARA','SOLO REVISION'),(32,5,'CAMBIAR','CAMBIAR PIEZA'),(49,31,'DESTORCER',NULL),(54,10,'FRP','FRP');
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  `color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status_UNIQUE` (`status`)
) ENGINE=InnoDB;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
INSERT INTO `status` VALUES (3,'PENDIENTE','#b8e986'),(21,'COMPRAR','#50e3c2'),(22,'EN ESPERA','#d0021b'),(27,'REPARAR','#4a90e2'),(43,'NO QUEDO','#9B9B9B'),(47,'ENTREGADO','#9013fe'),(59,'YONKE','#212abc'),(66,'300','#7ED321'),(67,'MILESIMA','#F8E71C'),(68,'AAA','#805E5E'),(79,'VENDIDO','#E850DB');
UNLOCK TABLES;

--
-- Table structure for table `technician`
--

DROP TABLE IF EXISTS `technician`;
CREATE TABLE `technician` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB;

--
-- Dumping data for table `technician`
--

LOCK TABLES `technician` WRITE;
INSERT INTO `technician` VALUES (3,'ABISAI'),(1,'DANIEL');
UNLOCK TABLES;


DROP TABLE IF EXISTS `orden_servicio`;
CREATE TABLE `orden_servicio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `folio` varchar(10) NOT NULL,
  `deadlineDate` bigint NOT NULL,
  `receptionDate` bigint NOT NULL,
  `client_id` int NOT NULL,
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
  `pin1` varchar(25) DEFAULT '',
  `pin2` varchar(25) DEFAULT '',
  `notes` text,
  `encendido` tinyint(1) NOT NULL DEFAULT '0',
  `status_id` int DEFAULT NULL,
  `device_id` int NOT NULL,
  `technician_id` int NOT NULL,
  `phone_color` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orden_servicio_ibfk_5_idx` (`marca_id`),
  KEY `orden_servicio_ibfk_6_idx` (`modelo_id`),
  KEY `orden_servicio_ibfk_7_idx` (`falla_id`),
  KEY `orden_servicio_ibfk_8_idx` (`solucion_id`),
  KEY `orden_servicio_ibfk_3` (`chip`),
  KEY `orden_servicio_ibfk_4` (`msd`),
  KEY `orden_servicio_ibfk_1` (`client_id`),
  KEY `orden_servicio_ibfk_9_idx` (`status_id`),
  KEY `orden_servicio_ibfk_10_idx` (`device_id`),
  KEY `orden_servicio_ibfk_10_idx1` (`technician_id`),
  CONSTRAINT `fk_grade_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `orden_servicio_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clientes` (`id`),
  CONSTRAINT `orden_servicio_ibfk_10` FOREIGN KEY (`technician_id`) REFERENCES `technician` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orden_servicio_ibfk_3` FOREIGN KEY (`chip`) REFERENCES `chip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orden_servicio_ibfk_4` FOREIGN KEY (`msd`) REFERENCES `msd` (`id`),
  CONSTRAINT `orden_servicio_ibfk_5` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`),
  CONSTRAINT `orden_servicio_ibfk_6` FOREIGN KEY (`modelo_id`) REFERENCES `modelos` (`id`),
  CONSTRAINT `orden_servicio_ibfk_7` FOREIGN KEY (`falla_id`) REFERENCES `fallas` (`id`),
  CONSTRAINT `orden_servicio_ibfk_8` FOREIGN KEY (`solucion_id`) REFERENCES `soluciones` (`id`),
  CONSTRAINT `orden_servicio_ibfk_9` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

--
-- Dumping data for table `orden_servicio`
--

LOCK TABLES `orden_servicio` WRITE;
INSERT INTO `orden_servicio` VALUES (9,'RC1429',1625782109000,1625782109000,38,34,47,0,17,25,1,11,15,1000,50,950,0,'1234',NULL,'LA NOTA CAMBIO',1,21,21,1,'ROJO'),(14,'RC0004',1625782150000,1640196796000,39,4,55,1,10,27,1,11,15,100,100,0,0,'1234',NULL,'OTRA COSA',1,3,21,1,'AZUL'),(15,'RC0005',1626192546000,1626192546000,38,34,45,1,5,31,1,13,2,50,50,0,0,'12345',NULL,'NOTAS',1,43,20,1,'NEGRO'),(19,'RC0708',1627413177000,1627326711000,152,4,54,1,17,25,1,11,2,500,250,250,0,'1234','1234','\n',1,27,60,3,'NEGRO'),(21,'RC0860',1627423200000,1627336971000,149,4,54,1,17,25,1,11,15,400,200,200,0,'1324','1324',NULL,1,27,60,3,'NEGRO'),(22,'RC1430',1627499938000,1627433332000,40,34,46,1,17,25,1,12,15,1000,500,500,0,'1234','456',NULL,1,22,60,1,'NEGRO'),(23,'RC1431',1627429603000,1627429603000,148,34,47,1,10,27,1,11,15,500,400,100,0,'1234','1234',NULL,1,27,60,3,'NEGRO'),(24,'RC1432',1627519028000,1627432582000,46,17,50,1,5,32,1,11,15,250,100,150,0,NULL,NULL,NULL,1,43,60,1,'NEGRO'),(26,'RC1433',1627914679000,1627655440000,184,34,45,1,5,32,1,11,15,300,0,300,0,NULL,NULL,NULL,1,27,60,1,'NEGRO'),(27,'RC1434',1627914909000,1627655668000,186,34,45,1,6,29,1,11,15,1000,0,1000,0,NULL,NULL,NULL,1,59,60,3,'NEGRO'),(29,'RC1435',1628261785000,1627656388000,149,34,46,1,6,29,1,11,15,1000,500,500,0,'1234',NULL,'',1,67,60,3,'NEGRO'),(33,'RC1436',1627936727000,1627677498000,194,34,45,1,31,49,1,31,15,200,0,200,0,NULL,NULL,'',1,68,60,1,'NEGRO'),(34,'RC1437',1627921853000,1611077464000,193,34,45,1,6,28,1,20,15,100,0,100,0,NULL,NULL,'',1,66,60,3,'NEGRO'),(35,'RC1438',1628285041000,1628285041000,186,17,50,1,6,29,1,11,15,1000,250,750,0,NULL,NULL,NULL,1,27,70,3,'NEGRO'),(36,'RC1439',1628285342000,1628285342000,184,17,90,1,10,54,1,11,15,250,0,250,0,NULL,NULL,NULL,1,21,70,3,'NEGRO'),(38,'RC1440',1628291788000,1628291788000,149,17,90,1,17,25,1,31,15,1000,100,900,0,NULL,NULL,NULL,1,47,70,1,'NEGRO');
UNLOCK TABLES;

--
-- Table structure for table `tech_notes`
--

DROP TABLE IF EXISTS `tech_notes`;
CREATE TABLE `tech_notes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` bigint DEFAULT NULL,
  `orden_id` int NOT NULL,
  `tech_id` int NOT NULL,
  `note` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tech_notes_orders_idx` (`orden_id`),
  KEY `fk_tech_notes_technician_idx` (`tech_id`),
  CONSTRAINT `fk_tech_notes_orders` FOREIGN KEY (`orden_id`) REFERENCES `orden_servicio` (`id`),
  CONSTRAINT `fk_tech_notes_technician` FOREIGN KEY (`tech_id`) REFERENCES `technician` (`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `tech_notes`
--

LOCK TABLES `tech_notes` WRITE;
INSERT INTO `tech_notes` VALUES (1,1627839429000,14,1,'Primera nota de prueba.'),(2,1627839748000,19,1,'Segunda nota de prueba'),(4,1627847844000,14,1,'Segunda nota de prueba'),(5,1627848615000,14,1,'Tercera nota de prueba'),(6,1627853659503,19,3,'AGREGAR'),(7,1627853699060,14,1,'CUARTA NOTA DE PRUEBA'),(8,1627853704373,14,1,'QUINTA NOTA DE PRUEBA'),(9,1627855720108,14,1,'SEXTA NOTA DE PRUEBA'),(10,1627857345858,14,1,'SEPTIMA NOTA DE PRUEBA'),(11,1627921377476,19,3,'TERCERA NOTA'),(12,1627921415914,19,3,'AVISO QUE NO QUEDO'),(13,1627921442569,33,1,'NADA'),(14,1627921472562,19,3,'AD'),(15,1627921473965,19,3,'AD'),(16,1627921475482,19,3,'SDF'),(17,1627921476881,19,3,'DFGDF'),(18,1627921478461,19,3,'DFGDFG'),(19,1627921479790,19,3,'DFGDF'),(20,1627921481034,19,3,'ERTER'),(21,1627921482393,19,3,'DFGDF'),(22,1627921487897,19,3,'ERTERT'),(23,1627921489298,19,3,'ERTER'),(24,1627922781680,34,3,'LLAMO Y AUN NO ESTABA'),(25,1627922789894,34,3,'AVISO YA QUEDO'),(26,1627922795988,34,3,'ASDASD'),(27,1627922799359,34,3,'SDFSDF'),(28,1627922801309,34,3,'SDFSDF'),(29,1627922807766,34,3,'HOY VINO'),(30,1627926193437,22,1,'PRIMERA NOTA'),(31,1627927093007,15,1,'NUEVA NOTA');
UNLOCK TABLES;