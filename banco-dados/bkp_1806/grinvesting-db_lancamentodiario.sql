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
-- Table structure for table `lancamentodiario`
--

DROP TABLE IF EXISTS `lancamentodiario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lancamentodiario` (
  `idLancamento` int(11) NOT NULL AUTO_INCREMENT,
  `dataMovimentacao` date DEFAULT NULL,
  `ativo` varchar(45) NOT NULL,
  `valorOperado` decimal(10,2) DEFAULT NULL,
  `percentual` decimal(10,2) DEFAULT NULL,
  `idCliente` int(11) NOT NULL,
  `valorComissao` decimal(10,2) DEFAULT NULL,
  `swap` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idLancamento`),
  KEY `fk_LANCAMENTODIARIO_CLIENTE1_idx` (`idCliente`),
  CONSTRAINT `fk_LANCAMENTODIARIO_CLIENTE1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=766 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lancamentodiario`
--

LOCK TABLES `lancamentodiario` WRITE;
/*!40000 ALTER TABLE `lancamentodiario` DISABLE KEYS */;
INSERT INTO `lancamentodiario` VALUES (6,'2020-03-20','xauusd',117.03,50.00,23,58.39,-0.25),(7,'2020-03-16','xauusd',73.98,50.00,23,36.99,0.00),(8,'2020-03-16','xauusd',92.04,50.00,23,45.90,-0.25),(9,'2020-03-12','xauusd',82.95,50.00,23,41.48,0.00),(10,'2020-03-17','xauusd',66.42,50.00,23,33.13,-0.17),(11,'2020-03-16','xauusd',75.36,50.00,23,37.68,0.00),(12,'2020-03-16','xauusd',-50.50,50.00,23,-25.25,0.00),(13,'2020-03-16','xauusd',-46.58,50.00,23,-23.46,-0.34),(14,'2020-03-12','xauusd',-13.82,50.00,23,-6.91,0.00),(15,'2020-03-12','xauusd',8.06,50.00,23,3.78,-0.51),(16,'2020-03-16','xauusd',-57.42,50.00,23,-28.71,0.00),(17,'2020-03-12','xauusd',2.45,50.00,23,1.23,0.00),(18,'2020-03-20','usdcad',31.93,50.00,23,15.94,-0.05),(19,'2020-03-19','usdcad',6.86,50.00,23,3.36,-0.14),(20,'2020-03-19','USDCAD',-6.61,50.00,23,-3.34,-0.07),(21,'2020-03-20','USDCAD',-0.88,50.00,23,-0.49,-0.10),(22,'2020-03-20','GBPUSD',18.98,50.00,23,9.46,-0.06),(23,'2020-03-19','GBPUSD',6.08,50.00,23,2.96,-0.17),(24,'2020-03-20','GBPUSD',0.35,50.00,23,0.06,-0.23),(25,'2020-03-12','EURUSD',5.79,50.00,23,2.95,0.11),(26,'2020-03-10','xauusd',2.61,50.00,24,1.31,0.00),(27,'2020-03-10','uSDJPY',8.78,50.00,24,4.58,0.37),(28,'2020-03-12','EURUSD',18.42,50.00,24,9.59,0.75),(29,'2020-03-12','EURUSD',-15.06,50.00,24,-7.23,0.61),(30,'2020-03-12','EURCAD',24.31,50.00,24,12.50,0.68),(31,'2020-03-13','XAUUSD',13.43,50.00,24,6.72,0.00),(32,'2020-03-13','USDJPY',15.66,50.00,24,8.23,0.80),(33,'2020-03-13','USDJPY',-8.21,50.00,24,-3.90,0.41),(34,'2020-03-13','USDJPY',0.41,50.00,24,0.52,0.62),(35,'2020-03-16','EURUSD',8.61,50.00,24,4.31,0.00),(36,'2020-03-16','XAUUSD',16.78,50.00,24,8.39,0.00),(37,'2020-03-17','XAUUSD',5.09,50.00,24,2.51,-0.08),(38,'2020-03-17','EURCAD',1.37,50.00,24,0.78,0.18),(39,'2020-03-17','EURUSD',3.09,50.00,24,1.88,0.67),(40,'2020-03-19','GBPUSD',14.93,50.00,24,7.47,0.00),(41,'2020-03-19','EURCAD',60.11,50.00,24,30.55,0.99),(42,'2020-03-20','XAUUSD',12.42,50.00,24,6.17,-0.08),(43,'2020-03-20','GBPUSD',18.93,50.00,24,9.44,-0.06),(44,'2020-03-20','GBPUSD',-1.09,50.00,24,-0.66,-0.23),(45,'2020-03-23','GBPUSD',6.16,50.00,23,3.04,-0.08),(46,'2020-03-24','GBPUSD',6.30,50.00,23,3.12,-0.06),(47,'2020-03-24','EURUSD',3.10,50.00,23,1.51,-0.08),(48,'2020-03-24','XAUUSD',82.08,50.00,23,40.47,-1.15),(49,'2020-03-24','XAUUSD',-65.61,50.00,23,-33.21,-0.80),(50,'2020-03-24','GBPUSD',9.38,50.00,23,4.69,0.00),(51,'2020-03-25','USDCAD',23.76,50.00,23,11.87,-0.02),(52,'2020-03-26','USDJPY',11.52,50.00,23,5.58,-0.37),(53,'2020-03-23','EURUSD',6.26,50.00,24,3.09,-0.08),(54,'2020-03-24','GBPUSD',6.76,50.00,24,3.35,-0.06),(55,'2020-03-26','USDJPY',15.01,50.00,24,7.32,-0.37),(86,'2020-03-26','XAUUSD',14.84,50.00,23,7.42,0.00),(87,'2020-03-13','XAUUSD',8.34,50.00,32,4.17,0.00),(88,'2020-03-13','USDJPY',12.34,50.00,32,6.26,0.18),(89,'2020-03-13','USDJPY',-0.62,50.00,32,-0.25,0.12),(90,'2020-03-17','USDJPY',4.99,50.00,32,2.50,0.01),(91,'2020-03-17','USDJPY',0.78,50.00,32,0.49,0.20),(92,'2020-03-20','USDCAD',9.94,50.00,32,4.92,-0.10),(93,'2020-03-20','USDCAD',-3.22,50.00,32,-1.64,-0.05),(94,'2020-03-25','USDCAD',14.41,50.00,32,7.20,-0.01),(95,'2020-03-25','USDCAD',5.50,50.00,32,2.74,-0.02),(96,'2020-03-26','USDJPY',6.47,50.00,32,3.14,-0.20),(97,'2020-03-04','EURUSD',1.14,50.00,28,0.58,0.01),(98,'2020-03-04','EURUSD',-0.50,50.00,28,-0.24,0.02),(99,'2020-03-04','EURUSD',1.35,50.00,28,0.68,0.00),(100,'2020-03-04','EURUSD',-0.61,50.00,28,-0.30,0.01),(101,'2020-03-04','GBPUSD',0.64,50.00,28,0.32,0.00),(102,'2020-03-13','XAUUSD',3.34,50.00,28,1.67,0.00),(103,'2020-03-13','USDJPY',4.94,50.00,28,2.51,0.07),(104,'2020-03-13','USDJPY',-0.25,50.00,28,-0.11,0.04),(105,'2020-03-17','USDJPY',2.00,50.00,28,1.00,0.01),(106,'2020-03-17','USDJPY',0.31,50.00,28,0.20,0.08),(107,'2020-03-20','usdCAD',3.98,50.00,28,1.97,-0.04),(108,'2020-03-20','usdCAD',-1.29,50.00,28,-0.66,-0.02),(109,'2020-03-25','USDCAD',5.76,50.00,28,2.88,0.00),(110,'2020-03-25','USDCAD',2.20,50.00,28,1.10,-0.01),(111,'2020-03-26','USDJPY',2.59,50.00,28,1.25,-0.08),(112,'2020-03-04','EURUSD',1.14,50.00,29,0.58,0.01),(113,'2020-03-04','EURUSD',0.50,50.00,29,0.26,0.02),(114,'2020-03-04','EURUSD',1.35,50.00,29,0.68,0.00),(115,'2020-03-04','EURUSD',0.61,50.00,29,0.31,0.01),(116,'2020-03-04','GBPUSD',0.64,50.00,29,0.33,0.01),(117,'2020-03-13','XAUUSD',3.34,50.00,29,1.67,0.00),(118,'2020-03-13','USDJPY',4.94,50.00,29,2.51,0.07),(119,'2020-03-13','USDJPY',-0.25,50.00,29,-0.10,0.05),(120,'2020-03-17','USDJPY',2.00,50.00,29,1.00,0.01),(121,'2020-03-17','USDJPY',0.31,50.00,29,0.20,0.08),(122,'2020-03-20','USDCAD',3.98,50.00,29,1.97,-0.05),(123,'2020-03-20','USDCAD',-1.29,50.00,29,-0.66,-0.03),(124,'2020-03-25','USDCAD',5.76,50.00,29,2.83,-0.10),(125,'2020-03-25','USDCAD',2.20,50.00,29,1.09,-0.02),(126,'2020-03-26','USDJPY',2.59,50.00,29,1.25,-0.09),(127,'2020-03-04','EURUSD',0.00,50.00,32,0.00,0.00),(128,'2020-03-31','EURCAD',1.99,50.00,26,1.00,0.00),(129,'2020-03-31','EURCAD',8.20,50.00,26,4.11,0.02),(130,'2020-04-01','USDJPY',2.53,50.00,26,1.27,0.00),(131,'2020-04-01','USDJPY',0.82,50.00,26,0.52,0.22),(132,'2020-04-01','CADJPY',1.29,50.00,26,0.65,0.00),(133,'2020-04-02','GBPCAD',2.56,50.00,26,1.28,0.00),(134,'2020-04-02','XTIUSD',1.46,50.00,26,0.73,-0.01),(135,'2020-04-02','AUDUSD',3.54,50.00,26,1.77,0.00),(136,'2020-04-01','USDJPY',3.36,50.00,24,1.68,0.00),(137,'2020-04-01','USDJPY',-1.12,50.00,24,-0.44,0.24),(138,'2020-04-01','AUDUSD',-8.42,50.00,24,-4.21,0.00),(139,'2020-04-02','USDJPY',3.34,50.00,24,2.39,1.44),(140,'2020-04-02','AUDUSD',-10.02,50.00,24,-5.01,0.00),(141,'2020-04-02','EURCAD',0.26,50.00,24,0.60,0.93),(142,'2020-04-02','XBRUSD',15.12,50.00,24,7.58,0.03),(143,'2020-04-02','XBRUSD',9.08,50.00,24,4.58,0.07),(144,'2020-04-02','EURCAD',0.96,50.00,24,0.48,0.00),(145,'2020-03-31','EURCAD',-0.96,50.00,23,-0.48,0.00),(148,'2020-03-31','EURCAD',14.63,50.00,23,7.32,0.00),(149,'2020-03-31','EURCAD',5.09,50.00,23,2.61,0.12),(150,'2020-04-01','AUDUSD',1.08,50.00,23,0.53,-0.03),(151,'2020-04-02','GBPCAD',14.86,50.00,23,7.43,0.00),(152,'2020-04-02','XTIUSD',4.65,50.00,23,2.31,-0.03),(153,'2020-04-02','XTIUSD',2.34,50.00,23,1.16,-0.03),(154,'2020-04-02','XTIUSD',0.53,50.00,23,0.24,-0.06),(155,'2020-04-02','AUDUSD',-24.92,50.00,23,-12.46,0.00),(156,'2020-04-02','XAUUSD',24.68,50.00,23,11.85,-0.99),(157,'2020-04-02','USDJPY',5.71,50.00,23,2.86,0.00),(158,'2020-04-02','AUDUSD',10.11,50.00,23,5.06,0.00),(159,'2020-04-02','XBRUSD',13.02,50.00,23,6.54,0.06),(160,'2020-04-02','XBRUSD',11.28,50.00,23,5.68,0.07),(161,'2020-04-02','USDJPY',2.80,50.00,23,2.36,1.92),(162,'2020-03-31','USDCAD',2.03,50.00,28,1.02,0.00),(163,'2020-04-01','USDCAD',0.90,50.00,28,0.45,0.00),(164,'2020-04-02','XBRUSD',0.30,50.00,28,0.15,0.00),(165,'2020-04-02','XTIUSD',0.30,50.00,28,0.15,-0.01),(166,'2020-04-02','USDCAD',1.84,50.00,28,0.92,0.00),(167,'2020-04-02','XBRUSD',0.24,50.00,28,0.12,0.00),(168,'2020-04-02','USDCAD',0.51,50.00,28,0.25,-0.01),(169,'2020-03-31','USDCAD',2.03,50.00,29,1.02,0.00),(170,'2020-04-01','EURCAD',0.90,50.00,29,0.45,0.00),(171,'2020-04-02','EURCAD',0.30,50.00,29,0.14,-0.02),(172,'2020-04-02','XTIUSD',0.30,50.00,29,0.15,-0.01),(173,'2020-04-02','USDCAD',1.84,50.00,29,0.92,0.00),(174,'2020-04-02','XBRUSD',0.24,50.00,29,0.12,0.00),(175,'2020-04-02','USDCAD',0.51,50.00,29,0.25,-0.01),(176,'2020-03-31','USDCAD',5.07,50.00,32,2.54,0.00),(177,'2020-04-01','USDCAD',2.26,50.00,32,1.13,0.00),(178,'2020-04-02','XBRUSD',0.76,50.00,32,0.38,0.00),(179,'2020-04-02','XTIUSD',0.75,50.00,32,0.37,-0.01),(180,'2020-04-02','USDCAD',4.61,50.00,32,2.31,0.00),(181,'2020-04-02','XBRUSD',0.60,50.00,32,0.30,0.00),(182,'2020-04-02','USDCAD',1.28,50.00,32,0.64,-0.01),(183,'2020-04-02','USDCHF',0.83,50.00,24,0.42,0.00),(184,'2020-04-07','EURUSD',21.93,50.00,24,10.90,-0.14),(185,'2020-04-03','AUDUSD',6.25,50.00,23,3.06,-0.13),(186,'2020-04-06','XAUUSD',2.65,50.00,23,-0.20,-3.04),(187,'2020-04-06','USDCAD',0.66,50.00,23,0.33,0.00),(188,'2020-04-06','USD',0.11,50.00,23,0.06,0.00),(189,'2020-04-07','EURUSD',21.06,50.00,23,10.53,0.00),(190,'2020-04-07','CADJPY',14.33,50.00,23,7.17,0.00),(191,'2020-04-07','AUDUSD',6.82,50.00,23,3.41,0.00),(192,'2020-04-07','USDCHF',9.25,50.00,23,4.63,0.00),(193,'2020-04-07','USDCAD',13.71,50.00,23,6.86,0.00),(194,'2020-04-07','XAUUSD',4.60,50.00,23,2.30,0.00),(195,'2020-04-07','GBPUSD',1.00,50.00,23,0.50,0.00),(196,'2020-04-06','AUDUSD',0.87,50.00,26,0.42,-0.04),(197,'2020-04-07','USDCHF',4.85,50.00,26,2.41,-0.04),(198,'2020-04-07','USDCAD',1.31,50.00,26,0.66,0.00),(199,'2020-04-08','EURUSD',7.74,50.00,23,3.87,0.00),(200,'2020-04-08','AUDUSD',33.11,50.00,23,16.56,0.00),(201,'2020-04-08','AUDUSD',13.80,50.00,24,6.90,0.00),(202,'2020-04-08','USDCAD',3.12,50.00,24,1.56,-0.01),(203,'2020-04-08','GBPUSD',2.10,50.00,24,1.05,0.00),(204,'2020-04-07','USDCAD',1.55,50.00,28,0.77,-0.01),(205,'2020-04-07','USDCAD',-0.62,50.00,28,-0.36,-0.09),(206,'2020-04-07','EURUSD',1.62,50.00,28,0.81,-0.01),(207,'2020-04-08','USDCAD',0.23,50.00,28,0.12,0.00),(208,'2020-04-08','AUDUSD',1.05,50.00,28,0.53,0.00),(209,'2020-04-08','AUDUSD',1.05,50.00,28,0.53,0.00),(210,'2020-04-07','USDCAD',3.88,50.00,32,1.94,-0.01),(211,'2020-04-07','USDCAD',-1.55,50.00,32,-0.89,-0.22),(212,'2020-04-07','EURUSD',4.06,50.00,32,2.05,0.03),(213,'2020-04-08','EURCAD',0.57,50.00,32,0.29,0.00),(214,'2020-04-08','AUDUSD',2.62,50.00,32,1.31,0.00),(215,'2020-04-08','AUD',2.61,50.00,32,1.31,0.00),(217,'2020-04-07','USDCAD',1.55,50.00,29,0.77,-0.01),(218,'2020-04-07','EURCAD',-0.62,50.00,29,-0.32,-0.01),(219,'2020-04-07','EURUSD',1.62,50.00,29,0.81,-0.01),(220,'2020-04-08','USDCAD',0.23,50.00,29,0.12,0.00),(221,'2020-04-08','AUDUSD',1.05,50.00,29,0.53,0.00),(222,'2020-04-08','AUDUSD',1.00,50.00,29,0.50,0.00),(223,'2020-04-08','USDCAD',1.62,50.00,26,0.81,0.00),(224,'2020-04-08','AUDUSD',4.29,50.00,26,2.15,0.00),(225,'2020-04-09','USDCHF',17.54,50.00,24,7.66,-2.22),(226,'2020-04-13','USDCHF',20.00,50.00,23,8.58,-2.84),(227,'2020-04-14','XAUUSD',57.35,50.00,23,28.68,0.00),(228,'2020-04-15','GBPUSD',92.84,50.00,23,46.25,-0.34),(230,'2020-04-15','USDCAD',29.75,50.00,23,14.84,-0.07),(231,'2020-04-15','NZDUSD',100.00,50.00,1,51.00,2.00),(232,'2020-04-15','GBPUSD',24.03,50.00,23,11.44,-1.15),(233,'2020-04-15','USDCAD',1.36,50.00,23,0.57,-0.22),(234,'2020-04-15','XAUUSD',14.61,50.00,23,7.42,0.24),(235,'2020-04-15','GBPUSD',59.64,50.00,24,29.71,-0.22),(236,'2020-04-15','GBPUSD',7.00,50.00,24,3.18,-0.64),(237,'2020-04-15','USDCAD',1.38,50.00,24,0.62,-0.15),(238,'2020-04-15','XAUUSD',18.12,50.00,24,9.18,0.24),(239,'2020-04-14','NZDUSD',100.00,50.00,1,25.00,2.00),(240,'2020-04-15','NZDUSD',50.00,50.00,1,25.00,1.20),(241,'2020-04-15','GBPUSD',31.18,50.00,25,15.56,-0.06),(242,'2020-04-15','EURUSD',1.38,50.00,25,0.69,0.00),(243,'2020-04-15','GBPUSD',3.07,50.00,25,1.54,0.00),(244,'2020-04-15','GBPUSD',0.72,50.00,26,0.30,-0.12),(245,'2020-04-17','EURUSD',1.97,50.00,25,0.97,-0.04),(246,'2020-04-16','GBPUSD',6.84,50.00,26,3.38,-0.09),(247,'2020-04-16','EURCAD',31.22,50.00,23,15.55,-0.13),(248,'2020-04-16','XAUUSD',109.44,50.00,23,54.72,0.00),(249,'2020-04-16','XAUUSD',16.54,50.00,23,8.39,0.23),(250,'2020-04-16','XAUUSD',-7.20,50.00,23,-3.41,0.39),(251,'2020-04-16','XAUUSD',75.36,50.00,24,37.68,0.00),(252,'2020-04-16','XAUUSD',-3.70,50.00,24,-1.66,0.39),(253,'2020-04-16','EURCAD',19.46,50.00,24,9.67,-0.13),(254,'2020-04-17','XAUUSD',18.72,50.00,24,9.59,0.47),(255,'2020-04-15','GBPUSD',3.47,50.00,28,1.73,-0.02),(256,'2020-04-15','GBPUSD',-1.06,50.00,28,-0.55,-0.03),(257,'2020-04-16','GBPUSD',1.69,50.00,28,0.83,-0.03),(258,'2020-04-15','GBPUSD',3.47,50.00,29,1.73,-0.01),(259,'2020-04-15','GBPUSD',-1.06,50.00,29,-0.55,-0.03),(260,'2020-04-16','GBPUSD',1.69,50.00,29,0.83,-0.03),(261,'2020-04-15','GBPUSD',8.68,50.00,32,4.32,-0.04),(262,'2020-04-15','GBPUSD',-2.65,50.00,32,-1.36,-0.07),(263,'2020-04-16','GBPUSD',4.23,50.00,32,2.09,-0.06),(264,'2020-04-01','EURCAD',100.00,50.00,34,50.00,0.00),(265,'2020-04-02','EURCAD',100.00,50.00,34,50.00,0.00),(266,'2020-04-02','EURCAD',100.00,50.00,34,49.00,-2.00),(267,'2020-04-03','EURCAD',100.00,50.00,34,51.00,2.00),(268,'2020-04-04','EURCAD',100.00,50.00,34,50.50,1.00),(269,'2020-04-05','EURCAD',100.00,50.00,34,51.50,3.00),(270,'2020-04-06','USDCAD',100.00,50.00,34,50.00,0.00),(271,'2020-04-20','XAUUSD',11.14,50.00,23,5.85,0.55),(272,'2020-04-21','GBPUSD',64.47,50.00,23,30.79,-2.90),(273,'2020-04-23','EURCAD',34.28,50.00,23,17.14,0.00),(274,'2020-04-21','GBPUSD',25.14,50.00,24,11.96,-1.23),(275,'2020-04-23','EURCAD',5.30,50.00,24,4.52,3.74),(276,'2020-04-23','EURCAD',83.44,50.00,24,41.72,0.00),(278,'2020-04-23','EURCAD',16.94,50.00,23,8.47,0.00),(279,'2020-04-23','XTIUSD',2.41,50.00,26,0.85,-0.72),(280,'2020-04-27','EURUSD',5.68,50.00,24,2.84,0.00),(281,'2020-05-01','XTIUSD',13.46,50.00,24,4.29,-4.89),(282,'2020-05-01','XTIUSD',-2.36,50.00,24,-3.78,-5.20),(283,'2020-04-24','XAUUSD',37.88,50.00,23,18.94,0.00),(284,'2020-04-27','EURUSD',11.48,50.00,23,5.74,0.00),(285,'2020-04-30','EURCAD',66.52,50.00,23,32.56,-1.40),(286,'2020-05-01','XTIUSD',71.17,50.00,23,22.11,-26.95),(287,'2020-05-01','XTIUSD',-6.96,50.00,23,-4.89,-2.82),(288,'2020-04-27','EURUSD',3.18,50.00,25,1.59,0.00),(289,'2020-04-30','EURCAD',13.72,50.00,25,6.72,-0.28),(290,'2020-05-01','XTIUSD',13.34,50.00,25,4.23,-4.89),(291,'2020-05-01','XTIUSD',-2.07,50.00,25,-2.34,-2.61),(292,'2020-04-27','EURUSD',2.74,50.00,26,1.37,0.00),(293,'2020-04-30','EURCAD',6.14,50.00,26,3.01,-0.13),(294,'2020-05-01','EURUSD',0.22,50.00,26,0.11,0.00),(295,'2020-04-15','GBPUSD',3.47,50.00,28,1.72,-0.03),(296,'2020-04-15','GBPUSD',1.06,50.00,28,0.52,-0.03),(297,'2020-04-16','GBPUSD',1.69,50.00,28,0.83,-0.03),(298,'2020-04-21','GBPUSD',1.85,50.00,28,0.93,0.00),(299,'2020-04-27','EURUSD',0.70,50.00,28,0.35,0.00),(300,'2020-04-30','EURCAD',1.51,50.00,28,0.74,-0.04),(301,'2020-05-01','XTIUSD',2.92,50.00,28,0.96,-1.00),(302,'2020-04-15','GBPUSD',8.68,50.00,32,4.32,-0.04),(303,'2020-04-15','GBPUSD',2.65,50.00,32,1.29,-0.07),(304,'2020-04-16','GBPUSD',4.23,50.00,32,2.09,-0.06),(305,'2020-04-21','GBPUSD',4.63,50.00,32,2.30,-0.03),(306,'2020-04-27','EURUSD',1.74,50.00,32,0.87,0.00),(307,'2020-04-30','EURCAD',3.78,50.00,32,1.85,-0.08),(308,'2020-05-01','XTIUSD',7.30,50.00,32,2.29,-2.72),(309,'2020-04-15','GBPUSD',3.47,50.00,29,1.69,-0.10),(310,'2020-04-15','GBPUSD',-1.06,50.00,29,-0.55,-0.03),(311,'2020-04-16','GBPUSD',1.69,50.00,29,0.83,-0.03),(312,'2020-04-21','GBPUSD',1.85,50.00,29,0.88,-0.09),(313,'2020-04-27','EURUSD',0.70,50.00,29,0.35,0.00),(314,'2020-04-30','EURCAD',1.51,50.00,29,0.74,-0.04),(315,'2020-05-01','XTIUSD',2.92,50.00,29,0.91,-1.09),(316,'2020-05-04','EURCAD',91.01,50.00,24,45.51,0.00),(317,'2020-05-04','EURCAD',16.46,50.00,24,8.23,0.00),(318,'2020-05-04','XTIUSD',-5.91,50.00,24,-4.82,-3.73),(319,'2020-05-05','EURCAD',19.11,50.00,24,9.56,0.00),(320,'2020-05-11','USDJPY',5.06,50.00,24,2.51,-0.05),(321,'2020-05-11','EURJPY',5.43,50.00,24,2.72,0.00),(322,'2020-05-12','EURUSD',3.80,50.00,24,1.67,-0.47),(323,'2020-05-19','EURCAD',30.32,50.00,24,15.19,0.05),(324,'2020-05-04','EURUSD',6.64,50.00,23,3.32,0.00),(325,'2020-05-04','EURCAD',24.99,50.00,23,12.49,-0.01),(326,'2020-05-04','XTIUSD',-25.20,0.00,23,0.00,-31.60),(327,'2020-05-04','EURCAD',25.89,50.00,23,12.95,0.00),(328,'2020-05-05','GBPUSD',0.64,50.00,23,0.32,0.00),(329,'2020-05-05','GBPUSD',-3.28,0.00,23,0.00,0.00),(330,'2020-05-05','GBPUSD',-26.01,0.00,23,0.00,0.00),(331,'2020-05-05','EURUSD',1.64,50.00,23,0.82,0.00),(332,'2020-05-06','CADJPY',5.08,50.00,23,2.54,0.00),(333,'2020-05-06','XAUUSD',4.00,50.00,23,1.99,-0.03),(334,'2020-05-07','EURCHF',-12.02,0.00,23,0.00,-0.75),(335,'2020-05-11','EURJPY',12.89,50.00,23,6.45,0.00),(336,'2020-05-11','EURUSD',0.76,0.00,23,0.00,-0.91),(337,'2020-05-12','EURUSD',12.08,50.00,23,5.59,-0.91),(338,'2020-05-12','XTIUSD',4.27,0.00,23,0.00,-34.70),(339,'2020-05-13','XTIUSD',-9.28,0.00,23,0.00,-20.62),(340,'2020-05-13','USDJPY',44.42,50.00,23,21.84,-0.75),(341,'2020-05-18','EURUSD',13.48,50.00,23,6.36,-0.76),(342,'2020-02-19','AJUSTE',210.17,50.00,24,105.09,0.00),(343,'2020-05-04','EURUSD',1.51,50.00,26,0.76,0.00),(344,'2020-05-07','EURCHF',-2.49,50.00,26,-1.32,-0.15),(345,'2020-05-11','EURUSD',0.55,50.00,26,0.18,-0.19),(346,'2020-05-11','EURJPY',1.28,50.00,26,0.64,0.00),(347,'2020-05-13','EURUSD',-1.01,50.00,26,-0.51,0.00),(348,'2020-05-14','AUDJPY',-1.93,50.00,26,-0.99,-0.04),(349,'2020-05-14','GBPUSD',-5.52,50.00,26,-2.82,-0.12),(350,'2020-05-14','GBPUSD',-23.90,50.00,26,-12.14,-0.38),(351,'2020-05-14','USDJPY',-2.44,50.00,26,-1.22,0.00),(352,'2020-05-14','GBPUSD',5.37,50.00,26,2.69,0.00),(353,'2020-05-14','AUDUSD',-7.22,50.00,26,-3.61,0.00),(354,'2020-05-18','EURJPY',-6.56,50.00,26,-3.28,0.00),(355,'2020-05-19','EURCAD',5.73,50.00,26,2.87,0.00),(356,'2020-05-21','EURUSD',-4.19,50.00,26,-2.10,0.00),(357,'2020-05-21','GBPUSD',-1.55,50.00,26,-0.78,0.00),(358,'2020-05-21','GBPUSD',-3.41,50.00,26,-1.71,0.00),(359,'2020-05-22','EURGBP',-7.25,50.00,26,-3.65,-0.05),(360,'2020-05-22','EURGBP',-3.57,50.00,26,-1.81,-0.05),(361,'2020-05-22','EURGBP',-5.86,50.00,26,-2.93,0.00),(362,'2020-05-25','GBPUSD',-0.89,50.00,26,-0.45,0.00),(363,'2020-05-25','EURUSD',-2.66,50.00,26,-1.33,0.00),(364,'2020-05-25','XAUUSD',6.75,50.00,26,3.38,0.00),(365,'2020-05-26','GBPUSD',-9.13,50.00,26,-4.58,-0.03),(366,'2020-05-26','EURJPY',3.40,50.00,26,1.69,-0.02),(367,'2020-05-27','USDJPY',-2.68,50.00,26,-1.34,0.00),(368,'2020-05-27','USDJPY',2.33,50.00,26,1.17,0.00),(369,'2020-05-27','XAUUSD',4.05,50.00,26,2.03,0.00),(370,'2020-05-27','EURUSD',1.67,50.00,26,0.84,0.00),(371,'2020-05-27','EURUSD',1.41,50.00,26,0.71,0.00),(372,'2020-05-27','XAUUSD',-1.23,50.00,26,-0.62,0.00),(373,'2020-05-27','XAUUSD',-6.58,50.00,26,-3.29,0.00),(374,'2020-05-29','US500',0.13,50.00,26,0.07,0.00),(375,'2020-05-29','US500',-1.81,50.00,26,-0.91,0.00),(376,'2020-05-29','US500',-1.56,50.00,26,-0.78,0.00),(377,'2020-05-26','EURUSD',3.85,50.00,23,1.93,0.00),(378,'2020-05-26','EURUSD',3.29,50.00,23,1.65,0.00),(379,'2020-05-27','EURUSD',1.12,50.00,23,0.56,0.00),(380,'2020-05-27','EURUSD',3.36,50.00,23,1.68,0.00),(381,'2020-05-27','EURUSD',3.54,50.00,23,1.77,0.00),(382,'2020-05-27','EURUSD',3.08,50.00,23,1.54,0.00),(383,'2020-05-27','EURUSD',3.99,50.00,23,2.00,0.00),(384,'2020-05-27','EURCAD',3.29,50.00,23,1.65,0.00),(385,'2020-05-27','EURCAD',3.43,50.00,23,1.72,0.00),(386,'2020-05-27','EURUSD',10.43,50.00,23,5.22,0.00),(387,'2020-05-27','EURUSD',8.33,50.00,23,4.17,0.00),(388,'2020-05-27','EURUSD',11.76,50.00,23,5.88,0.00),(389,'2020-05-27','EURUSD',8.61,50.00,23,4.31,0.00),(390,'2020-05-27','EURUSD',8.82,50.00,23,4.41,0.00),(391,'2020-05-27','EURUSD',7.70,50.00,23,3.85,0.00),(392,'2020-05-27','EURUSD',0.70,50.00,23,0.35,0.00),(393,'2020-05-27','EURCAD',4.83,50.00,23,2.42,0.00),(394,'2020-05-28','EURUSD',3.43,50.00,23,1.72,0.00),(395,'2020-05-28','EURUSD',3.64,50.00,23,1.82,0.00),(396,'2020-05-26','GBPUSD',17.88,50.00,24,7.18,-3.52),(397,'2020-05-26','XAUUSD',4.20,50.00,24,2.10,0.00),(398,'2020-05-27','EURUSD',3.70,50.00,24,1.85,0.00),(399,'2020-05-27','EURUSD',4.40,50.00,24,2.20,0.00),(400,'2020-05-28','XAUUSD',15.86,50.00,24,7.81,-0.25),(401,'2020-05-29','XAUUSD',10.24,50.00,24,4.72,-0.81),(402,'2020-05-01','XTIUSD',0.00,0.00,25,0.00,0.00),(403,'2020-05-05','EURCAD',2.53,50.00,25,1.27,0.00),(404,'2020-05-05','GBPUSD',-3.08,50.00,25,-1.54,0.00),(405,'2020-05-05','XTIUSD',0.09,50.00,25,-1.92,-3.93),(406,'2020-05-07','EURCHF',-3.92,50.00,25,-2.09,-0.25),(407,'2020-05-11','USDJPY',-12.47,50.00,25,-6.42,-0.36),(408,'2020-05-11','GBPUSD',16.54,50.00,25,8.09,-0.36),(409,'2020-05-11','EURUSD',4.17,50.00,25,1.81,-0.56),(410,'2020-05-11','EURJPY',6.18,50.00,25,3.09,0.00),(411,'2020-05-11','USDJPY',3.31,50.00,25,1.66,0.00),(412,'2020-05-13','EURUSD',-2.18,50.00,25,-1.09,0.00),(413,'2020-05-14','EURUSD',-1.67,50.00,25,-0.84,0.00),(414,'2020-05-14','NZDJPY',7.20,50.00,25,3.60,0.00),(415,'2020-05-14','GBPUSD',-33.87,50.00,25,-17.24,-0.62),(416,'2020-05-14','GBPUSD',-51.46,50.00,25,-26.15,-0.83),(417,'2020-05-14','USDJPY',-2.85,50.00,25,-1.43,0.00),(418,'2020-05-15','AUDUSD',-7.86,50.00,25,-3.96,-0.05),(419,'2020-05-15','USDJPY',-5.40,50.00,25,-2.70,0.00),(420,'2020-05-18','EURJPY',-11.34,50.00,25,-5.67,0.00),(421,'2020-05-19','XAUUSD',-4.22,50.00,25,-2.11,0.00),(422,'2020-05-19','EURGBP',-11.75,50.00,25,-5.88,0.00),(423,'2020-05-19','EURGBP',-5.27,50.00,25,-2.64,0.00),(424,'2020-05-19','EURUSD',-4.10,50.00,25,-2.05,0.00),(425,'2020-05-19','EURCAD',11.94,50.00,25,5.97,0.00),(426,'2020-05-20','GBPJPY',-4.84,50.00,25,-2.42,0.00),(427,'2020-05-21','EURUSD',-4.85,50.00,25,-2.43,0.00),(428,'2020-05-21','GBPUSD',-0.02,50.00,25,-0.01,0.00),(429,'2020-05-21','GBPUSD',-3.25,50.00,25,-1.63,0.00),(430,'2020-05-21','GBPUSD',14.05,50.00,25,7.03,0.00),(431,'2020-05-21','GBPUSD',4.80,50.00,25,2.40,0.00),(432,'2020-05-22','EURGBP',-6.21,50.00,25,-3.11,0.00),(433,'2020-05-25','EURUSD',-5.22,50.00,25,-2.61,0.00),(434,'2020-05-25','XAUUSD',-0.05,50.00,25,-0.03,0.00),(435,'2020-05-26','XAUUSD',6.75,50.00,25,3.38,0.00),(436,'2020-05-26','GBPJPY',-66.19,50.00,25,-33.32,-0.46),(437,'2020-05-26','GBPUSD',-12.59,50.00,25,-6.33,-0.06),(438,'2020-05-26','XAUUSD',-9.34,50.00,25,-4.67,0.00),(439,'2020-05-26','EURAUD',-33.22,50.00,25,-16.61,0.00),(440,'2020-05-26','EURUSD',0.26,50.00,25,0.13,0.00),(441,'2020-05-26','EURAUD',1.77,50.00,25,0.89,0.00),(442,'2020-05-26','EURUSD',0.20,50.00,25,0.10,0.00),(443,'2020-05-26','EURUSD',1.06,50.00,25,0.53,0.00),(444,'2020-05-26','AUDUSD',-42.80,50.00,25,-21.40,0.00),(445,'2020-05-26','EURUSD',-0.07,50.00,25,-0.04,0.00),(446,'2020-05-26','EURUSD',0.62,50.00,25,0.31,0.00),(447,'2020-05-26','EURUSD',1.46,50.00,25,0.73,0.00),(448,'2020-05-26','EURAUD',-0.07,50.00,25,-0.04,0.00),(449,'2020-05-26','EURUSD',0.98,50.00,25,0.49,0.00),(450,'2020-05-26','EURUSD',-1.04,50.00,25,-0.52,0.00),(451,'2020-05-26','EURUSD',-1.34,50.00,25,-0.67,0.00),(452,'2020-05-26','EURUSD',-0.26,50.00,25,-0.13,0.00),(453,'2020-05-26','EURUSD',0.60,50.00,25,0.30,0.00),(454,'2020-05-26','EURUSD',2.75,50.00,25,1.38,0.00),(455,'2020-05-26','EURUSD',7.60,50.00,25,3.80,0.00),(456,'2020-05-26','EURUSD',1.01,50.00,25,0.51,0.00),(457,'2020-05-26','EURUSD',0.17,50.00,25,0.09,0.00),(458,'2020-05-26','EURUSD',1.06,50.00,25,0.53,0.00),(459,'2020-05-26','EURUSD',-0.56,50.00,25,-0.28,0.00),(460,'2020-05-26','EURCAD',-1.51,50.00,25,-0.76,0.00),(461,'2020-05-26','EURUSD',-2.28,50.00,25,-1.14,0.00),(462,'2020-05-26','EURUSD',-1.58,50.00,25,-0.79,0.00),(463,'2020-05-26','EURUSD',-1.29,50.00,25,-0.65,0.00),(464,'2020-05-26','EURUSD',-0.40,50.00,25,-0.20,0.00),(465,'2020-05-26','EURUSD',2.00,50.00,25,1.00,0.00),(466,'2020-05-26','EURUSD',7.56,50.00,25,3.78,0.00),(467,'2020-05-26','EURUSD',17.28,50.00,25,8.64,0.00),(468,'2020-05-26','EURUSD',2.90,50.00,25,1.45,0.00),(469,'2020-05-27','EURJPY',5.06,50.00,25,2.48,-0.10),(470,'2020-05-27','US30',-41.13,50.00,25,-20.65,-0.16),(471,'2020-05-27','EURUSD',-54.00,50.00,25,-27.00,0.00),(472,'2020-05-28','XAUUSD',18.69,50.00,25,9.16,-0.37),(473,'2020-05-28','XAUUSD',32.91,50.00,25,16.27,-0.37),(474,'2020-05-28','XAUUSD',26.40,50.00,25,13.01,-0.37),(475,'2020-05-31','XAUUSD',21.68,50.00,25,10.76,-0.16),(476,'2020-05-04','EURUSD',0.98,50.00,28,0.49,0.00),(477,'2020-05-04','EURUSD',0.35,50.00,28,0.18,0.00),(478,'2020-05-05','GBPUSD',-0.62,50.00,28,-0.31,0.00),(479,'2020-05-05','XTIUSD',0.44,50.00,28,-0.63,-1.70),(480,'2020-05-07','EURCHF',-0.56,50.00,28,-0.30,-0.04),(481,'2020-05-11','USDJPY',-2.92,50.00,28,-1.46,0.00),(482,'2020-05-11','EURUSD',0.58,50.00,28,0.25,-0.09),(483,'2020-05-11','EURJPY',1.14,50.00,28,0.57,0.00),(484,'2020-05-13','EURUSD',-0.25,50.00,28,-0.13,0.00),(485,'2020-05-13','GBPUSD',0.15,50.00,28,0.07,-0.02),(486,'2020-05-14','AUDJPY',-0.81,50.00,28,-0.42,-0.02),(487,'2020-05-14','USDJPY',-0.14,50.00,28,-0.07,0.00),(488,'2020-05-14','AUDUSD',-1.80,50.00,28,-0.90,0.00),(489,'2020-05-18','EURJPY',-1.45,50.00,28,-0.73,0.00),(490,'2020-05-19','EURCAD',2.70,50.00,28,1.35,0.00),(491,'2020-05-21','EURUSD',-0.91,50.00,28,-0.46,0.00),(492,'2020-05-21','GBPUSD',-0.31,50.00,28,-0.16,0.00),(493,'2020-05-21','EURUSD',-0.64,50.00,28,-0.32,0.00),(494,'2020-05-21','GBPUSD',-1.04,50.00,28,-0.52,0.00),(495,'2020-05-22','EURGBP',-1.74,50.00,28,-0.88,-0.02),(496,'2020-05-22','EURGBP',-0.90,50.00,28,-0.46,-0.02),(497,'2020-05-22','EURGBP',-1.66,50.00,28,-0.83,0.00),(498,'2020-05-25','EURUSD',-0.29,50.00,28,-0.15,0.00),(499,'2020-05-25','XAUUSD',0.12,50.00,28,0.06,0.00),(500,'2020-05-25','XAUUSD',0.07,50.00,28,0.04,0.00),(501,'2020-05-25','XAUUSD',-2.76,50.00,28,-1.38,0.00),(502,'2020-05-25','EURUSD',0.02,50.00,28,0.01,0.00),(503,'2020-05-25','EURUSD',0.12,50.00,28,0.06,0.00),(504,'2020-05-25','XAUUSD',0.41,50.00,28,0.21,0.00),(505,'2020-05-25','XAUUSD',0.81,50.00,28,0.41,0.00),(506,'2020-05-26','XAUUSD',0.62,50.00,28,0.30,-0.02),(507,'2020-05-26','XAUUSD',1.13,50.00,28,0.57,0.00),(508,'2020-05-26','XAUUSD',2.59,50.00,28,1.30,0.00),(509,'2020-05-26','XAUUSD',2.27,50.00,28,1.13,-0.01),(510,'2020-05-26','XAUUSD',2.83,50.00,28,1.41,-0.01),(511,'2020-05-26','XAUUSD',1.53,50.00,28,0.77,0.00),(512,'2020-05-04','EURUSD',0.98,50.00,29,0.49,0.00),(513,'2020-05-04','EURUSD',0.35,50.00,29,0.18,0.00),(514,'2020-05-05','GBPUSD',-0.62,50.00,29,-0.31,0.00),(515,'2020-05-05','XTIUSD',0.44,50.00,29,-0.63,-1.70),(516,'2020-05-07','EURCHF',-0.56,50.00,29,-0.30,-0.04),(517,'2020-05-11','USDJPY',-2.92,50.00,29,-1.46,0.00),(518,'2020-05-11','EURUSD',0.58,50.00,29,0.25,-0.09),(519,'2020-05-11','EURJPY',1.14,50.00,29,0.57,0.00),(520,'2020-05-13','EURUSD',-0.25,50.00,29,-0.13,0.00),(521,'2020-05-13','GBPUSD',0.15,50.00,29,0.07,-0.02),(522,'2020-05-14','AUDJPY',-0.81,50.00,29,-0.42,-0.02),(523,'2020-05-14','USDJPY',-0.14,50.00,29,-0.07,0.00),(524,'2020-05-14','AUDUSD',-1.80,50.00,29,-0.90,0.00),(525,'2020-05-18','EURJPY',-1.45,50.00,29,-0.73,0.00),(526,'2020-05-19','EURCAD',2.70,50.00,29,1.35,0.00),(527,'2020-05-21','EURUSD',-0.91,50.00,29,-0.46,0.00),(528,'2020-05-21','GBPUSD',-0.31,50.00,29,-0.16,0.00),(529,'2020-05-21','EURUSD',-0.64,50.00,29,-0.32,0.00),(530,'2020-05-21','GBPUSD',-1.04,50.00,29,-0.52,0.00),(531,'2020-05-22','EURGBP',-1.74,50.00,29,-0.88,-0.02),(532,'2020-05-22','EURGBP',-0.90,50.00,29,-0.46,-0.02),(533,'2020-05-22','EURGBP',-1.66,50.00,29,-0.83,0.00),(534,'2020-05-25','EURUSD',-0.29,50.00,29,-0.15,0.00),(535,'2020-05-25','XAUUSD',0.12,50.00,29,0.06,0.00),(536,'2020-05-25','XAUUSD',0.07,50.00,29,0.04,0.00),(537,'2020-05-25','XAUUSD',-2.76,50.00,29,-1.38,0.00),(538,'2020-05-25','EURUSD',0.02,50.00,29,0.01,0.00),(539,'2020-05-25','EURUSD',0.12,50.00,29,0.06,0.00),(540,'2020-05-25','XAUUSD',0.41,50.00,29,0.21,0.00),(541,'2020-05-25','XAUUSD',0.81,50.00,29,0.41,0.00),(542,'2020-05-26','XAUUSD',0.62,50.00,29,0.30,-0.02),(543,'2020-05-26','XAUUSD',1.13,50.00,29,0.57,0.00),(544,'2020-05-26','XAUUSD',2.59,50.00,29,1.30,0.00),(545,'2020-05-26','XAUUSD',2.27,50.00,29,1.13,-0.01),(546,'2020-05-26','XAUUSD',2.83,50.00,29,1.41,-0.01),(547,'2020-05-26','XAUUSD',1.53,50.00,29,0.77,0.00),(628,'2020-05-04','EURUSD',2.45,50.00,32,1.23,0.00),(629,'2020-05-04','EURUSD',0.87,50.00,32,0.44,0.00),(630,'2020-05-05','GBPUSD',-1.55,50.00,32,-0.78,0.00),(631,'2020-05-05','XTIUSD',1.11,50.00,32,-1.55,-4.22),(632,'2020-05-07','EURCHF',-1.39,50.00,32,-0.74,-0.09),(633,'2020-05-11','USDJPY',-7.31,50.00,32,-3.76,-0.20),(634,'2020-05-11','EURUSD',1.45,50.00,32,0.62,-0.21),(635,'2020-05-11','EURJPY',2.85,50.00,32,1.43,0.00),(636,'2020-05-13','EURUSD',-0.62,50.00,32,-0.31,0.00),(637,'2020-05-13','GBPUSD',0.38,50.00,32,0.17,-0.04),(638,'2020-05-14','AUDJPY',-2.02,50.00,32,-1.03,-0.03),(639,'2020-05-14','USDJPY',-0.35,50.00,32,-0.18,0.00),(640,'2020-05-14','AUDUSD',-4.51,50.00,32,-2.26,0.00),(641,'2020-05-18','EURJPY',-3.63,50.00,32,-1.82,0.00),(642,'2020-05-19','EURCAD',6.76,50.00,32,3.38,0.00),(643,'2020-05-21','EURUSD',-2.28,50.00,32,-1.14,0.00),(644,'2020-05-21','GBPUSD',-0.77,50.00,32,-0.39,0.00),(645,'2020-05-21','EURUSD',-1.61,50.00,32,-0.81,0.00),(646,'2020-05-21','GBPUSD',-2.61,50.00,32,-1.31,0.00),(647,'2020-05-22','EURGBP',-4.35,50.00,32,-2.19,-0.03),(648,'2020-05-22','EURGBP',-2.24,50.00,32,-1.12,0.00),(649,'2020-05-22','EURGBP',-4.15,50.00,32,-2.08,0.00),(650,'2020-05-25','EURUSD',-0.72,50.00,32,-0.36,0.00),(651,'2020-05-25','XAUUSD',0.31,50.00,32,0.16,0.00),(652,'2020-05-25','XAUUSD',0.17,50.00,32,0.09,0.00),(653,'2020-05-25','XAUUSD',-6.90,50.00,32,-3.45,0.00),(654,'2020-05-25','EURUSD',0.78,50.00,32,0.39,0.00),(655,'2020-05-25','EURUSD',0.28,50.00,32,0.14,0.00),(656,'2020-05-25','XAUUSD',1.03,50.00,32,0.52,0.00),(657,'2020-05-25','XAUUSD',2.03,50.00,32,1.02,0.00),(658,'2020-05-26','XAUUSD',1.55,50.00,32,0.76,-0.04),(659,'2020-05-26','XAUUSD',2.83,50.00,32,1.42,0.00),(660,'2020-05-26','XAUUSD',6.46,50.00,32,3.23,0.00),(661,'2020-05-26','XAUUSD',5.66,50.00,32,2.82,-0.02),(662,'2020-05-26','XAUUSD',7.07,50.00,32,3.53,-0.02),(663,'2020-05-26','XAUUSD',3.82,50.00,32,1.91,0.00),(664,'2020-05-27','GBPJPY',2.60,50.00,32,1.30,0.00),(665,'2020-05-27','EURUSD',2.54,50.00,32,1.27,0.00),(666,'2020-05-27','EURUSD',2.05,50.00,32,1.03,0.00),(667,'2020-05-29','XAUUSD',8.62,50.00,32,4.20,-0.22),(668,'2020-06-02','XAUUSD',22.88,50.00,24,11.36,-0.16),(669,'2020-06-02','GBPUSD',15.96,50.00,24,5.85,-4.26),(670,'2020-06-02','XA',24.00,50.00,25,11.92,-0.16),(671,'2020-06-01','EURCAD',30.71,50.00,24,15.36,0.01),(672,'2020-06-04','XAUUSD',133.70,50.00,23,66.85,0.00),(673,'2020-06-03','XAUUSD',35.68,50.00,24,17.77,-0.14),(674,'2020-06-03','XAUUSD',26.48,50.00,24,13.21,-0.06),(675,'2020-06-03','XAUUSD',14.88,50.00,25,7.43,-0.03),(676,'2020-06-03','XAUUSD',29.00,50.00,25,14.43,-0.14),(677,'2020-06-03','XAUUSD',41.56,50.00,25,20.67,-0.22),(678,'2020-06-03','XAUUSD',41.56,50.00,25,20.67,-0.22),(679,'2020-06-05','XAUUSD',45.36,50.00,25,22.65,-0.06),(680,'2020-06-05','XAUUSD',135.50,50.00,23,67.67,-0.16),(681,'2020-06-05','XAUUSD',0.00,50.00,23,0.00,0.00),(682,'2020-06-05','XAUUSD',87.50,50.00,23,43.43,-0.64),(683,'2020-06-05','XAUUSD',36.30,50.00,25,17.99,-0.32),(684,'2020-06-05','XAUUSD',36.30,50.00,25,17.99,-0.32),(685,'2020-06-05','XAUUSD',47.80,50.00,24,23.74,-0.32),(686,'2020-06-05','XAUUSD',37.34,50.00,24,18.66,-0.03),(687,'2020-06-05','XAUUSD',2.27,50.00,28,1.12,-0.03),(688,'2020-06-05','XAUUSD',1.84,50.00,28,0.93,0.01),(689,'2020-06-01','XAUUSD',3.92,50.00,28,1.96,0.00),(690,'2020-05-29','XAUUSD',3.45,50.00,28,1.68,-0.09),(691,'2020-05-29','XAUUSD',8.62,50.00,32,4.19,-0.23),(692,'2020-06-01','XAUUSD',9.80,50.00,32,4.90,0.00),(693,'2020-06-05','XAUUSD',4.60,50.00,32,2.29,-0.02),(694,'2020-06-05','XAUUSD',5.68,50.00,32,2.80,-0.07),(695,'2020-05-29','XAUUSD',3.45,50.00,29,1.68,-0.09),(696,'2020-06-01','XAUUSD',3.92,50.00,29,1.96,0.00),(697,'2020-06-05','XAUUSD',1.84,50.00,29,0.92,-0.01),(698,'2020-06-05','XAUUSD',2.27,50.00,29,1.12,-0.03),(699,'2020-06-05','XAUUSD',99.20,50.00,23,49.60,0.00),(700,'2020-06-05','XAUUSD',0.00,50.00,23,0.00,0.00),(701,'2020-06-11','USDJPY',16.86,50.00,23,3.76,-9.34),(702,'2020-06-08','XAUUSD',5.56,50.00,25,2.78,0.00),(703,'2020-06-09','XAUUSD',7.98,50.00,25,3.99,0.00),(704,'2020-06-12','XAUUSD',15.94,50.00,24,7.97,0.00),(705,'2020-06-05','XAUUSD',2.27,50.00,28,1.14,0.00),(706,'2020-06-09','XAUUSD',-3.17,50.00,28,-1.59,-0.01),(707,'2020-06-09','XAUUSD',0.59,50.00,28,0.30,0.00),(708,'2020-06-12','XAUUSD',1.68,50.00,28,0.84,0.00),(709,'2020-06-05','XAUUSD',5.68,50.00,32,2.84,0.00),(710,'2020-06-09','XAUUSD',7.92,50.00,32,3.96,0.00),(711,'2020-06-09','XAUUSD',1.47,50.00,32,0.74,0.00),(712,'2020-06-12','XAUUSD',4.19,50.00,32,2.10,0.00),(713,'2020-06-05','XAUUSD',2.27,50.00,29,1.14,0.00),(714,'2020-06-09','XAUUSD',3.17,50.00,29,1.58,-0.02),(715,'2020-06-09','XAUUSD',0.59,50.00,29,0.30,0.00),(716,'2020-06-12','XAUUSD',1.68,50.00,29,0.84,0.00),(717,'2020-06-17','XAUUSD',49.20,50.00,23,24.88,0.55),(718,'2020-06-17','EURUSD',0.08,50.00,23,0.04,0.00),(719,'2020-06-17','EURUSD',0.81,50.00,23,0.41,0.00),(720,'2020-06-17','EURUSD',0.78,50.00,23,0.39,0.00),(721,'2020-06-17','EURUSD',0.93,50.00,23,0.47,0.00),(722,'2020-06-17','EURUSD',0.81,50.00,23,0.41,0.00),(723,'2020-06-17','EURUSD',0.81,50.00,23,0.41,0.00),(724,'2020-06-17','EURUSD',0.81,50.00,23,0.41,0.00),(725,'2020-06-17','EURUSD',0.81,50.00,23,0.41,0.00),(726,'2020-06-17','EURUSD',0.81,50.00,23,0.41,0.00),(727,'2020-06-17','EURUSD',0.81,50.00,23,0.41,0.00),(728,'2020-06-18','EURUSD',0.60,50.00,23,0.11,-0.38),(729,'2020-06-18','EURUSD',-3.88,50.00,23,-1.93,0.02),(730,'2020-06-18','EUrusd',-1.08,50.00,23,-0.53,0.02),(731,'2020-06-18','EURUSD',4.90,50.00,23,2.45,0.00),(732,'2020-06-18','EURUSD',0.20,50.00,23,0.10,0.00),(733,'2020-06-18','EURUSD',-0.30,50.00,23,-0.15,0.00),(734,'2020-06-18','EURUSD',5.16,50.00,23,2.58,0.00),(735,'2020-06-18','EURUSD',0.90,50.00,23,0.45,0.00),(736,'2020-06-18','EURUSD',1.41,50.00,23,0.71,0.00),(737,'2020-06-18','EURUSD',2.46,50.00,23,1.23,0.00),(738,'2020-06-18','EURUSD',-1.86,50.00,23,-0.93,0.00),(739,'2020-06-18','EURUSD',0.54,50.00,23,0.27,0.00),(740,'2020-06-18','EURUSD',-0.88,50.00,23,-0.44,0.00),(741,'2020-06-18','EURUSD',2.00,50.00,23,1.00,0.00),(742,'2020-06-18','EURUSD',0.66,50.00,23,0.33,0.00),(743,'2020-06-18','EURUSD',0.40,50.00,23,0.20,0.00),(744,'2020-06-18','EURUSD',3.42,50.00,23,1.71,0.00),(745,'2020-06-18','EURUSD',-1.62,50.00,23,-0.81,0.00),(746,'2020-06-18','EURUSD',1.35,50.00,23,0.68,0.00),(747,'2020-06-18','XAUUSD',-85.20,50.00,23,-43.55,-1.89),(748,'2020-06-18','EURUSD',1.14,50.00,23,0.57,0.00),(749,'2020-06-18','EURUSD',1.14,50.00,23,0.57,0.00),(750,'2020-06-18','EURUSD',0.90,50.00,23,0.45,0.00),(751,'2020-06-18','EURUSD',15.80,50.00,23,7.90,0.00),(752,'2020-06-18','EURUSD',-1.26,50.00,23,-0.63,0.00),(753,'2020-06-18','EURUSD',3.00,50.00,23,1.50,0.00),(754,'2020-06-18','EURUSD',-1.92,50.00,23,-0.96,0.00),(755,'2020-06-18','EURUSD',1.84,50.00,23,0.92,0.00),(756,'2020-06-18','EURUSD',0.20,50.00,23,0.10,0.00),(757,'2020-06-18','EURUSD',0.42,50.00,23,0.21,0.00),(758,'2020-06-18','EURUSD',0.22,50.00,23,0.11,0.00),(759,'2020-06-10','EURUSD',-0.42,50.00,23,-0.21,0.00),(760,'2020-06-18','EURUSD',-0.50,50.00,23,-0.25,0.00),(761,'2020-06-18','EURUSD',-1.24,50.00,23,-0.62,0.00),(762,'2020-06-18','EURUSD',2.04,50.00,23,1.02,0.00),(763,'2020-06-18','EURUSD',0.42,50.00,23,0.21,0.00),(764,'2020-06-18','EURUSD',0.30,50.00,23,0.15,0.00),(765,'2020-06-18','EURUSD',1.88,50.00,23,0.94,0.00);
/*!40000 ALTER TABLE `lancamentodiario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-18 17:15:11
