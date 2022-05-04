-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: mysql669.umbler.com    Database: grinvesting-db
-- ------------------------------------------------------
-- Server version	5.6.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `identidade` varchar(45) DEFAULT NULL,
  `dtNascimento` date DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `dtCadastro` date DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `tipoConta` varchar(1) DEFAULT 'C',
  `valorInvestido` double DEFAULT '0',
  `idEmpresa` int(11) NOT NULL DEFAULT '1',
  `valorComissao` decimal(10,2) DEFAULT '0.00',
  `tipoUsuario` varchar(1) DEFAULT 'U',
  `idCorretor` int(11) NOT NULL DEFAULT '1',
  `ativo` varchar(1) DEFAULT 'N',
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_CLIENTE_EMPRESA_idx` (`idEmpresa`),
  KEY `fk_CLIENTE_CORRETOR_idx` (`idCorretor`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `fk_CLIENTE_CORRETOR` FOREIGN KEY (`idCorretor`) REFERENCES `corretor` (`idcorretor`),
  CONSTRAINT `fk_CLIENTE_EMPRESA` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idempresa`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Silvio Marçal','123.654.789-936','123','1980-10-30','654','marcalgyn@hotmail.com','rua','centro','Goiânia','GO','74580270','2020-03-09',NULL,'$2a$10$.FYwVMnHa9sb8l4.d9Xliu./8IdX7Z0E7NXTCX1ew/c2n/myo7YSa','C',50,1,50.00,'A',1,'N'),(21,'Ghislaine Ramos','955.674.701-00','1224255','1982-08-01','(62) 9862-6301','ghislaine_ramos@hotmail.com','Rua H-155, qd321, lote 06','Cidade vera cruz 1','Aparecida de Goiânia','Goiás','74937-540',NULL,NULL,'$2a$10$9piqYPmjCZHa1DPWCM0ZEOc09NJH/sIo71S7fT000MBri9taWx2Zy','C',100,1,50.00,'A',1,'N'),(22,'Vítor ','060.356.944-70','002012043','1986-09-09','(84) 9998-8498','vitorsanthiago@gmail.com','Rua Aderbal de Figueiredo','Praia do Meio','Natal','RN','59.010-115',NULL,NULL,'$2a$10$WVtvi8NmwPP3LdVnmHguBO5a2JUxKIfIyF85f//5HQOB39XJn0Svi','C',500,1,50.00,'A',1,'N'),(23,'RAPHAEL SUZINI DE PAULA','967.567.051-72','','2001-01-01','(67) 9997-3958','raphaelsuzini@hotmail.com','Rua Imaculado Coração de Maria','Carandá Bosque','Campo Grande','MS','79.032-200','2020-03-23',NULL,'$2a$10$ajLMAfYUOClnv3D7zx0U0Op2GYseL8eJUivnZzmS65EUlZGJunUaG','C',14879.99,1,50.00,'U',1,'N'),(24,'THIAGO COXER','312.352.068-40','34569890-3','1983-07-07','(11) 4735-5981','thiago_coxer@hotmail.com','Rua Nossa Senhora das Graças','Novo Osasco','Osasco','SP','06.045-060','2020-03-24',NULL,'$2a$10$MxkxXgOn5P9aF4ac08JvSeG9QR8PLj8wsVJKuDWIwxGYxB8hSgwTG','C',9310,1,50.00,'U',1,'S'),(25,'JOSE MARCIO COSTA NAVES','791.651.686-15','3966196','1970-05-11','(31) 999912156','jose.naves11@gmail.com','Rua Castelo Lamego,465 apt202','Castelo','Belo Horizonte','MG','31.330-130','2020-03-28',NULL,'$2a$10$Co3s.rKZAxjSSlCoZOLGSOt4ewGbG4FYZspm26l910UQqX7nSfLRu','C',1005,1,50.00,'U',1,'N'),(26,'Laressa de Sousa Rodrigues','','','0001-01-01','(00) -','laressasousa520@gmail.com','...','...','...','...','00.000-000',NULL,NULL,'$2a$10$pNMPbLLX1WqVNzEHMKcfo.dRWbiOQ8p22cAXB0/dO4dpalElqFthS','I',300,1,50.00,'U',1,'N'),(27,'LUIS ALBERTO POÇO BIANCO','347.613.368-03','40828330','1985-04-21','(01) 19748-3186','luis.bianco@bol.com.br','Rua da Consolação, N 1363, APT 94','Consolação','São Paulo','SP','01.301-100','2020-03-30',NULL,'$2a$10$omtb4F0bN9/hQgwu4IpmreRejpmk4C3MiiDBydoCDdpDyu/CJjk2S','I',5000,1,50.00,'U',1,'N'),(28,'Fabiana','357.099.138-55','43.522.389-5','1987-01-19','(11) 98442-1255','fabiirighi@gmail.com','Rua Guaipá 943','Vila Leopoldina','São Paulo','SP','05089001',NULL,NULL,'$2a$10$SHbdy3hg8K/MMDhZxETanu/.HD9jqESdvQvdPz4ChARPVmb4qhoOK','C',200,1,50.00,'U',1,'S'),(29,'THIAGO HENRIQUE PEREIRA DE ALMEIDA SANTOS','333.457.338-97','412997897','1986-10-04','(11) 98965-3674','thiagoalme@gmail.com','Avenida Miguel Estefno','Saúde','São Paulo','SP','04301-012',NULL,NULL,'$2a$10$d4AKf5GFhoKTW.qUw6B/TOxyP5qvmZUdgjiPnfLlYsbIsByAzL6QC','C',1000,1,50.00,'U',1,'N'),(30,'Ghivelder Ramos da Silveira',NULL,NULL,NULL,NULL,'ghivelder.silveira@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'$2a$10$k8qEqnRtSPudzRUw7yGeaOxSZ2jwZr06nmBi6mIzuEdUhjoA/DiFS','C',NULL,1,NULL,'U',1,'N'),(31,'JAN HENDRIKS JUNIOR','142.798.348-81','247752113','1970-04-13','(11) 96068-5950','jan_hendriks_junior@hotmail.com','Rua Brasílio Machado, 308, ape 81','Centro','São Bernardo do Campo','SP','09.715-140',NULL,NULL,'$2a$10$VdIbDuQ50X8IfwlhPY.NHe2Ro9ZWJ2AVNv4rJWJzTi8exnwaCJtaC','C',0,1,0.00,'U',1,'N'),(32,'RAULZITO BOMFIM PANTA','274.387.818-52','50986673','1979-10-19','(11) 97164-1959','calhaspanta@bol.com.br','Rua Laura Sfasciotti Bernardi,116 A','Santa Maria','Osasco','SP','06.150-340',NULL,NULL,'$2a$10$KDGzPyFlaj4Us.LOW.d1K.yRSRb.fBzst4uapjDrfH3JMua3nzq/O','C',500,1,50.00,'U',1,'N'),(33,'Roger','','','2020-04-06','(00) 0000-','roger.nunes@umbler.com','Rua','','Teste','Go','0',NULL,NULL,'$2a$10$dBbErM/WTaU1H.slJNg6zuXUMVJxnyEQnjnIBGsChB1LJj7qCtRu.','C',0,1,0.00,'U',1,'N'),(34,'Ghysa Ramos','955.674.701-00','0','1982-08-01','(62) 98286-6394','contato@win2tech.com.br','Rua H 155','Cidade Vera Cruz','Aparecida de Goiânia','GO','74.937-540',NULL,NULL,'$2a$10$bwa5ZXxrhUNYjmcz0PNZXeAmVvSbKFsQzC0nJl8YVJhXb.GKQbixO',NULL,10000,1,0.00,'U',1,'N'),(35,'MARCELO COSTA MARCILIO',NULL,NULL,NULL,NULL,'marcelorcaabril@HOTMAIL.COM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'$2a$10$yeYjRYnxotJNs/E2OFXJl.VRm8NQBqrkJObVd.aO8KXpxZtuE78Im','C',0,1,0.00,'U',1,'N');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-08 13:42:33
