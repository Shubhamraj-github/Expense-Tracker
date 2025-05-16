-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: expense_tracker
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (8,'Education'),(5,'Entertainment'),(1,'Food'),(7,'Groceries'),(6,'Healthcare'),(10,'Insurance'),(13,'Miscellaneous'),(4,'Rent'),(12,'Savings'),(11,'Shopping'),(2,'Transportation'),(9,'Travel'),(3,'Utilities');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Expenses`
--

DROP TABLE IF EXISTS `Expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `description` text,
  `status` tinyint DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Expenses`
--

LOCK TABLES `Expenses` WRITE;
/*!40000 ALTER TABLE `Expenses` DISABLE KEYS */;
INSERT INTO `Expenses` VALUES (3,16,'8',999.00,'2025-04-24','For Education Purpose',1,'2025-05-15 22:05:54','16',NULL,NULL),(4,16,'1',111.00,'2025-05-08','For Food Purpose',1,'2025-05-15 22:06:54','16',NULL,NULL),(5,16,'7',229.00,'2025-05-12','For Groceries',1,'2025-05-15 22:08:04','16',NULL,NULL),(6,16,'6',789.00,'2025-01-22','For Healthcare',1,'2025-05-15 22:08:31','16',NULL,NULL),(7,16,'4',3567.00,'2023-12-06','For Rent',1,'2025-05-15 22:08:58','16',NULL,NULL),(8,16,'11',567.00,'2022-06-15','For Shopping..',0,'2025-05-15 22:09:48','16','2025-05-15 22:11:29','16');
/*!40000 ALTER TABLE `Expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `password` varchar(255) NOT NULL,
  `user_type` enum('admin','user') DEFAULT 'user',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (14,'Admin','admin@gmail.com',1,'a29c57c6894dee6e8251510d58c07078ee3f49bf','admin','2025-05-15 17:55:39'),(16,'Shubham Raj','shubham@gmail.com',1,'40430383aa399ef2c3af8ef4232d660fb93b057a','user','2025-05-15 22:02:29'),(17,'User','User1@gmail.com',1,'40430383aa399ef2c3af8ef4232d660fb93b057a','user','2025-05-15 22:17:35'),(18,'Testing','testing@gmail.com',1,'40430383aa399ef2c3af8ef4232d660fb93b057a','user','2025-05-15 22:18:00'),(19,'Demo','demo@gmail.com',1,'40430383aa399ef2c3af8ef4232d660fb93b057a','user','2025-05-15 22:18:14'),(20,'hbefkdjsf','hvdjs@gmail.com',0,'40430383aa399ef2c3af8ef4232d660fb93b057a','user','2025-05-15 22:18:47');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'expense_tracker'
--
/*!50003 DROP PROCEDURE IF EXISTS `AddExpenses` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddExpenses`(
    IN p_category VARCHAR(100),
    IN p_date DATE,
    IN p_amount DECIMAL(10,2),
    IN p_description TEXT,
    IN p_user_id VARCHAR(10),
    IN p_id VARCHAR(100)
)
BEGIN
    IF p_id IS NOT NULL AND p_id > 0 THEN
        UPDATE Expenses
        SET
            category = p_category,
            amount = p_amount,
            date = p_date,
            description = p_description,
            updated_at = NOW(),
            updated_by = p_user_id
        WHERE id = p_id;
        
        SELECT 2 AS flag;
    ELSE
        INSERT INTO Expenses (
            user_id, category, amount, date, description, created_at, created_by
        ) VALUES (
            p_user_id, p_category, p_amount, p_date, p_description, NOW(), p_user_id
        );
        SELECT 1 AS flag;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteExpenseById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteExpenseById`(
    IN p_id VARCHAR(255)
)
BEGIN
    UPDATE Expenses
    Set status =0
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteUserById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteUserById`(
    IN p_user_id VARCHAR(10)
)
BEGIN
    UPDATE Users
    set status = 0
    WHERE id = p_user_id;
    UPDATE Expenses
    set status = 0
    where user_id = p_user_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllCategories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllCategories`()
BEGIN
    SELECT * FROM Categories ORDER  BY name asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllUsersByName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllUsersByName`(
    IN p_name VARCHAR(100),
    IN p_page INT,
    IN p_size INT
)
BEGIN
    DECLARE v_offset INT;
    DECLARE v_total_count INT;

    SET v_offset = (p_page - 1) * p_size;

    -- Count total matching users with status = 1
    SELECT COUNT(*) INTO v_total_count
    FROM Users
    WHERE status = 1 AND name LIKE CONCAT('%', p_name, '%') and user_type = 'user';

    -- Fetch paginated user list with status = 1
    SELECT 
        id,
        name,
        email
    FROM Users
    WHERE status = 1 AND name LIKE CONCAT('%', p_name, '%') and user_type = 'user'
    LIMIT p_size OFFSET v_offset;

    -- Pagination metadata
    SELECT 
        v_total_count AS total_count,
        CEIL(v_total_count / p_size) AS total_page;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCategoryList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCategoryList`()
BEGIN
SELECT * from Categories ORDER BY name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetExpenseByUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetExpenseByUser`(
IN `p_expense_id` VARCHAR(20)
-- IN `p_user_id` VARCHAR(20)
)
BEGIN
SELECT category,amount,date,description from Expenses e where e.id = p_expense_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetExpenseListByUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetExpenseListByUser`(
    IN p_page INT,
    IN p_size INT,
    IN p_category VARCHAR(100),
    IN p_start_date VARCHAR(50),
    IN p_end_date VARCHAR(50),
    IN p_user_id VARCHAR(10)
)
BEGIN
    DECLARE v_offset INT;
    DECLARE v_total_count INT;

    SET v_offset = (p_page - 1) * p_size;

    -- Count total matching records
    SELECT COUNT(*) INTO v_total_count
    FROM Expenses e
    LEFT JOIN Categories c ON e.category = c.id
    WHERE e.user_id = p_user_id
      AND e.status = 1
      AND (p_category = '' OR e.category = CAST(p_category AS UNSIGNED))
      AND (p_start_date = '' OR DATE(e.date) >= STR_TO_DATE(p_start_date, '%Y-%m-%d'))
      AND (p_end_date = '' OR DATE(e.date) <= STR_TO_DATE(p_end_date, '%Y-%m-%d'));

    -- Fetch paginated expense list
    SELECT 
        e.id,
        e.user_id,
        c.name AS category_name,
        e.amount,
        e.date,
        e.description
    FROM Expenses e
    LEFT JOIN Categories c ON e.category = c.id
    WHERE e.user_id = p_user_id
      AND e.status = 1
      AND (p_category = '' OR e.category = CAST(p_category AS UNSIGNED))
      AND (p_start_date = '' OR DATE(e.date) >= STR_TO_DATE(p_start_date, '%Y-%m-%d'))
      AND (p_end_date = '' OR DATE(e.date) <= STR_TO_DATE(p_end_date, '%Y-%m-%d'))
    ORDER BY e.date DESC
    LIMIT p_size OFFSET v_offset;

    -- Pagination meta
    SELECT 
        v_total_count AS total_count,
        CEIL(v_total_count / p_size) AS total_page;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getSpendingPrediction` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSpendingPrediction`(
    IN p_user_id VARCHAR(10)
)
BEGIN
    DECLARE month1 DATE;
    DECLARE month2 DATE;
    DECLARE month3 DATE;
    DECLARE total1 DECIMAL(10,2);
    DECLARE total2 DECIMAL(10,2);
    DECLARE total3 DECIMAL(10,2);
    DECLARE predicted_amount DECIMAL(10,2);

    -- Get last 3 full months
    SET month1 = DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01');
    SET month2 = DATE_FORMAT(CURDATE() - INTERVAL 2 MONTH, '%Y-%m-01');
    SET month3 = DATE_FORMAT(CURDATE() - INTERVAL 3 MONTH, '%Y-%m-01');

    -- Sum amounts for each month (only where Status = 1)
    SELECT IFNULL(SUM(amount), 0) INTO total1
    FROM Expenses
    WHERE user_id = p_user_id
      AND Status = 1
      AND DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(month1, '%Y-%m');

    SELECT IFNULL(SUM(amount), 0) INTO total2
    FROM Expenses
    WHERE user_id = p_user_id
      AND Status = 1
      AND DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(month2, '%Y-%m');

    SELECT IFNULL(SUM(amount), 0) INTO total3
    FROM Expenses
    WHERE user_id = p_user_id
      AND Status = 1
      AND DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(month3, '%Y-%m');

    -- Calculate average
    SET predicted_amount = ROUND((total1 + total2 + total3) / 3, 2);

    -- Return data
    SELECT
        DATE_FORMAT(month3, '%b') AS month,
        total3 AS amount
    UNION
    SELECT
        DATE_FORMAT(month2, '%b') AS month,
        total2 AS amount
    UNION
    SELECT
        DATE_FORMAT(month1, '%b') AS month,
        total1 AS amount
    UNION
    SELECT
        CONCAT('Pred. (', DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%b'), ')') AS month,
        predicted_amount AS amount;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTopThreeExpensesByUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTopThreeExpensesByUser`(
    IN p_user_id VARCHAR(10)
)
BEGIN
    SELECT 
        amount,
        date
    FROM Expenses
    WHERE user_id = p_user_id AND status = 1
    ORDER BY CAST(amount AS DECIMAL(10,2)) DESC
    LIMIT 3;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTotalSpendByCategory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTotalSpendByCategory`()
BEGIN
    SELECT 
        c.name AS category_name,
        SUM(e.amount) AS total_amount
    FROM Expenses e
    JOIN categories c ON e.category = c.id
    WHERE e.status = 1
    GROUP BY c.name
    ORDER BY total_amount DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserMonthlySpendingChange` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserMonthlySpendingChange`(IN p_user_id VARCHAR(10))
BEGIN
    SELECT
        DATE_FORMAT(MIN(date), '%Y-%m') AS month,
        ROUND(
            (SUM(amount) - 
             LAG(SUM(amount)) OVER (ORDER BY YEAR(date), MONTH(date))
            ) / 
            LAG(SUM(amount)) OVER (ORDER BY YEAR(date), MONTH(date)) * 100,
        2) AS percentage_change
    FROM Expenses
    WHERE user_id = p_user_id AND status = 1
    GROUP BY YEAR(date), MONTH(date)
    ORDER BY YEAR(date), MONTH(date);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserProfile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserProfile`(
IN p_userID VARCHAR(100)
)
BEGIN
    SELECT email, name, status, user_type, id
    FROM Users us where us.id = p_userID AND status = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Login`(IN p_email VARCHAR(150))
BEGIN
    DECLARE user_exists INT DEFAULT 0;
    DECLARE is_deleted INT DEFAULT 0;
    
    SELECT COUNT(*) INTO user_exists 
    FROM Users 
    WHERE email = p_email;

    IF user_exists = 0 THEN
        SELECT 1 AS flag;
    ELSE
        SELECT COUNT(*) INTO is_deleted 
        FROM Users 
        WHERE email = p_email AND status = 0;

        IF is_deleted = 1 THEN
            SELECT 2 AS flag;
        ELSE
            SELECT 3 AS flag, email, password, name, status,user_type, id
            FROM Users 
            WHERE email = p_email;
        END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PredictNextMonthSpending` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PredictNextMonthSpending`(IN p_user_id INT)
BEGIN
  SELECT month, amount FROM (
    -- Last 3 months actual
    SELECT 
      DATE_FORMAT(date, '%b') AS month,
      ROUND(SUM(amount), 2) AS amount,
      DATE_FORMAT(date, '%Y-%m-01') AS sort_date,
      1 AS order_by
    FROM Expenses
    WHERE user_id = p_user_id
      AND status = 1
      AND date >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 3 MONTH), '%Y-%m-01')
    GROUP BY YEAR(date), MONTH(date)

    UNION ALL

    -- Predicted next month
    SELECT 
      CONCAT('Pred. (', DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%b'), ')'),
      ROUND(AVG(monthly_total), 2),
      DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01'),
      2
    FROM (
      SELECT 
        DATE_FORMAT(date, '%Y-%m') AS month,
        SUM(amount) AS monthly_total
      FROM Expenses
      WHERE user_id = p_user_id
        AND status = 1
        AND date >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 3 MONTH), '%Y-%m-01')
      GROUP BY YEAR(date), MONTH(date)
    ) AS avg_data
  ) AS final_data
  ORDER BY sort_date;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegisterUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterUser`(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE emailExists INT;

    SELECT COUNT(*) INTO emailExists FROM Users WHERE email = p_email;

    IF emailExists > 0 THEN
        SELECT 1 AS result_flag;
    ELSE
        INSERT INTO Users (name, email, password)
        VALUES (p_name, p_email, p_password);

        SELECT 2 AS result_flag;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-16 12:41:43
