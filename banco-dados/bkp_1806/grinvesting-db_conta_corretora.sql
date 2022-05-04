CREATE DATABASE  IF NOT EXISTS `grinvesting-db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `grinvesting-db`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: mysql669.umbler.com    Database: grinvesting-db
-- ------------------------------------------------------
-- Server version	5.6.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conta_corretora`
--

DROP TABLE IF EXISTS `conta_corretora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conta_corretora` (
  `idCorretora` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `agencia` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `login` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  `idCliente` int(11) NOT NULL,
  `servidor` varchar(100) DEFAULT NULL,
  `loginmt4` varchar(45) DEFAULT NULL,
  `senhamt4` varchar(45) DEFAULT NULL,
  `servidorSinal` varchar(45) DEFAULT NULL,
  `usuarioSinal` varchar(45) DEFAULT NULL,
  `senhaSinal` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCorretora`),
  KEY `fk_CONTA_CORRETORA_CLIENTE1_idx` (`idCliente`),
  CONSTRAINT `fk_CONTA_CORRETORA_CLIENTE1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conta_corretora`
--

LOCK TABLES `conta_corretora` WRITE;
/*!40000 ALTER TABLE `conta_corretora` DISABLE KEYS */;
INSERT INTO `conta_corretora` VALUES (1,'Rico Investimentos','1234','456456','marcal','123123','123456',1,'servidor 1','login mt4','senha mt4',NULL,NULL,NULL),(5,'PEPPERSTONE','','','jose.naves11@gmail.com','762164','0',25,'edge-07','762164','Josetrade11@',NULL,NULL,NULL),(6,'PEPPERSTONE','','','raphaelsuzini@hotmail.com','0','0',23,'edge09','951304','Abc@1357','raphaelsuzini.win2tech@gmail.com','951304','w1w2w3w4'),(7,'PEPPERSTONE','','','GHYSA','ghysa_ramos@hotmail.com','Ghysa01@',21,'edge09','947753','Ghysa01@',NULL,NULL,NULL),(8,'Pepperstone','','954127','Lare520','laressasousa520@gmail.com','#Atv318798',26,'Pepperstone - edge9','954127','#Atv318798',NULL,NULL,NULL),(9,'PEPPERSTONE','','','THIAGO COXER','thiago_coxer@hotmail.com; thiagocoxer1983@gma','Da13042016#',24,'edge09','948068','Da13042016#',NULL,NULL,NULL),(10,'PEPPERSTONE','','','LUIS','luis.bianco@bol.com.br','Luis785@',27,'','','',NULL,NULL,NULL),(11,'PEPPERSTONE','','','0','0','0',28,'','','',NULL,NULL,NULL),(12,'PEPPERSTONE','','','.','.','.',32,'','','',NULL,NULL,NULL),(13,'PEPPERSTONE','','','.','.','.',29,'','','',NULL,NULL,NULL),(14,'PEPPERSTONE','0','0','usuario','login','123',34,'0','0','0',NULL,NULL,NULL),(15,'PEPPERSTONE','','','kleberbrandaoa@gmail.com','kleberbrandaoa@gmail.com','Koba142536*',36,'edge03','348124','348124','','',''),(16,'PEPPERSTONE','','','marcelorcaabril@hotmail.com','marcelorcoabril@hotmail.com','M1m2m3m4@',35,'edge03','347625','347625','','','');
/*!40000 ALTER TABLE `conta_corretora` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-18 17:15:12
