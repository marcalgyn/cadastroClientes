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
-- Table structure for table `imagens`
--

DROP TABLE IF EXISTS `imagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagens` (
  `idImagens` int(11) NOT NULL AUTO_INCREMENT,
  `documento` varchar(100) NOT NULL,
  `arquivo` varchar(230) DEFAULT NULL,
  `idCliente` int(11) NOT NULL,
  PRIMARY KEY (`idImagens`),
  KEY `fk_IMAGENS_CLIENTE1_idx` (`idCliente`),
  CONSTRAINT `fk_IMAGENS_CLIENTE1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagens`
--

LOCK TABLES `imagens` WRITE;
/*!40000 ALTER TABLE `imagens` DISABLE KEYS */;
INSERT INTO `imagens` VALUES (1,'identidade','/images/clientes/1_id joao.jpeg',1),(2,'identidade','/images/clientes/31_WhatsApp Image 2020-02-19 at 12.49.01.jpeg',31),(3,'Escolha um documento','/images/clientes/31_WhatsApp Image 2020-02-19 at 12.50.59.jpeg',31),(4,'Escolha um documento','/images/clientes/31_WhatsApp Image 2020-02-19 at 12.50.59.jpeg',31),(5,'Escolha um documento','/images/clientes/31_WhatsApp Image 2020-02-19 at 12.50.59.jpeg',31),(6,'Escolha um documento','/images/clientes/31_WhatsApp Image 2020-02-19 at 12.50.58.jpeg',31),(7,'undefined','/images/clientes/21_15873108374652885965194914964058.jpg',21),(8,'undefined','/images/clientes/34_passaport.jpg',34),(9,'undefined','/images/clientes/36_WhatsApp Image 2020-06-09 at 10.32.50.jpeg',36);
/*!40000 ALTER TABLE `imagens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-18 17:08:25
