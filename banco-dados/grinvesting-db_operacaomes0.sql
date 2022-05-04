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
-- Table structure for table `operacaomes`
--

DROP TABLE IF EXISTS `operacaomes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operacaomes` (
  `idOperacao` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` int(11) NOT NULL,
  `mes` varchar(45) DEFAULT NULL,
  `valorOperado` decimal(20,2) NOT NULL,
  PRIMARY KEY (`idOperacao`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operacaomes`
--

LOCK TABLES `operacaomes` WRITE;
/*!40000 ALTER TABLE `operacaomes` DISABLE KEYS */;
INSERT INTO `operacaomes` VALUES (3,28,'Março',27.63),(4,28,'Abril',23.35),(5,28,'Maio',6.43),(6,28,'Junho',9.40),(7,0,'Janeiro',0.00),(8,24,'Fevereiro',210.17),(9,24,'Março',228.62),(10,24,'Abril',387.42),(11,24,'Maio',232.66),(12,24,'Junho',232.79),(13,0,'Janeiro',0.00),(14,0,'Fevereiro',0.00),(15,23,'Março',522.76),(16,23,'Abril',820.08),(17,23,'Maio',242.40),(18,23,'Junho',482.56),(19,32,'Março',64.00),(20,32,'Abril',58.42),(21,32,'Maio',32.58),(22,32,'Junho',39.34),(23,0,'Fevereiro',0.00),(24,29,'Março',29.85),(25,29,'Abril',21.18),(26,29,'Maio',6.43),(27,29,'Junho',15.74),(28,0,'Janeiro',0.00),(29,0,'Fevereiro',0.00),(30,26,'Março',10.19),(31,26,'Abril',43.99),(32,26,'Maio',-69.04),(33,0,'Junho',0.00),(34,25,'Abril',54.50),(35,25,'Maio',-212.70),(36,25,'Junho',282.50);
/*!40000 ALTER TABLE `operacaomes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-18 17:08:23
