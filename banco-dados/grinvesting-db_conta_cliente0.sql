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
-- Table structure for table `conta_cliente`
--

DROP TABLE IF EXISTS `conta_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conta_cliente` (
  `idConta` int(11) NOT NULL AUTO_INCREMENT,
  `nomeBanco` varchar(45) NOT NULL,
  `agenciaBanco` varchar(45) DEFAULT NULL,
  `operacao` varchar(45) DEFAULT NULL,
  `numeroConta` varchar(45) DEFAULT NULL,
  `idCliente` int(11) NOT NULL,
  PRIMARY KEY (`idConta`),
  KEY `fk_CONTA_CLIENTE_CLIENTE1_idx` (`idCliente`),
  CONSTRAINT `fk_CONTA_CLIENTE_CLIENTE1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conta_cliente`
--

LOCK TABLES `conta_cliente` WRITE;
/*!40000 ALTER TABLE `conta_cliente` DISABLE KEYS */;
INSERT INTO `conta_cliente` VALUES (1,'Caixa Economica Federal','1236-9','001','1369-9',1),(4,'Santander','4210','','01008197-9',26),(5,'itau','0256','1','191460',31),(6,'Banco','0','0','0',28),(7,'Bradesco','237','0','123456',34);
/*!40000 ALTER TABLE `conta_cliente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-18 17:08:24
