-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: companyasset
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `asset`
--
use companyasset; 

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `quantity` varchar(45) NOT NULL,
  `serialNumber` varchar(45) NOT NULL,
  `cost` double NOT NULL,
  `datePurchased` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `issueFrequency` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoeryId_idx` (`categoryId`),
  CONSTRAINT `categoeryId` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
INSERT INTO `asset` VALUES (1,'epson5555','10','123466',7000,'2023-02-28','new7678',11,1),(3,'pickup','20','1234567890',17000,'2023-03-05','new',4,2);
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assetrequest`
--

DROP TABLE IF EXISTS `assetrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assetrequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `assetId` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `userId` varchar(45) NOT NULL,
  `quantity` varchar(45) NOT NULL,
  `requestStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assetrequest`
--

LOCK TABLES `assetrequest` WRITE;
/*!40000 ALTER TABLE `assetrequest` DISABLE KEYS */;
INSERT INTO `assetrequest` VALUES (1,'1','nesh23','1','2','pending');
/*!40000 ALTER TABLE `assetrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'printers','    data good                              '),(2,'vehicles','new kds has been bought                           ');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'accounts','headed by dan munga                          ');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transferhistory`
--

DROP TABLE IF EXISTS `transferhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transferhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` varchar(45) NOT NULL,
  `tranferBy` int NOT NULL,
  `transferTo` int NOT NULL,
  `dateIssued` varchar(45) NOT NULL,
  `assetId` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tranferBy_idx` (`tranferBy`),
  KEY `transferTo_idx` (`transferTo`),
  CONSTRAINT `tranferBy` FOREIGN KEY (`tranferBy`) REFERENCES `users` (`id`),
  CONSTRAINT `transferTo` FOREIGN KEY (`transferTo`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transferhistory`
--

LOCK TABLES `transferhistory` WRITE;
/*!40000 ALTER TABLE `transferhistory` DISABLE KEYS */;
INSERT INTO `transferhistory` VALUES (2,'2',1,1,'2023-03-04',1,'new','Embu'),(3,'2',1,1,'2023-03-04',1,'new','Embu'),(8,'5',1,3,'2023-03-03',1,'new','Chuka town tharaka nithi'),(9,'2',1,1,'2023-03-06',1,'new','Embu'),(10,'2',1,2,'2023-03-07',1,'new','Embu'),(11,'2',1,2,'2023-03-31',3,'new','westlands nairobi'),(12,'2',1,2,'2023-03-31',3,'new','westlands nairobi');
/*!40000 ALTER TABLE `transferhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  `departmentId` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `secondname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'  nnnn','$2a$10$Zq/BYN7mqN845tKX/rvTAuy7BAzcnD5cV7tNPxGIxhVl7Zu3RJ092','admin','1','1234567890','mark','munene'),(2,'nesh23','$2a$10$ggkAn2b.Upy243rzIlwpb.5lM1pBpevVwF3QxzCc2cBsAPmIvuRa.','normal','2','1234567890','shaz','nesh'),(3,'user4','$2a$10$vuixQ74IvL4o.LqOILITJOS7Nn1KADH6kOYZyhr8B50QDGt6hgVDW','normal','1','1234567890','user2','user3'),(6,'dan54','$2a$10$xQPrRV34fD5m9UNghbePcuS7qyCJQUCqlA795W0A0nDGn.oiUJ5sm','normal','1','1234567890','dan ','mutugi');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-10 20:51:03
