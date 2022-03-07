-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2022 at 11:58 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_coffeeteria`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Coffee', '2021-10-26 05:46:57', '2022-02-09 01:28:37'),
(2, 'Non Coffee', '2022-01-28 21:23:59', '2022-02-09 01:29:03'),
(3, 'Food', '2022-02-09 01:29:36', NULL),
(4, 'Add-on', '2022-02-09 01:29:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `payment` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('undelivered','received') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `category_id`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`) VALUES
(23, 'Veggie Tomato Mix', 34000, 'http://localhost:3939/uploads/1645025608094-Wed_Feb_16_2022-22.33.28-Veggie_Tomato_Mix.png', 'This food is named Veggie Tomato Mix because Veggie Tomato Mix is Veggie Tomato Mix', 3, 0, '2022-02-07 01:00:11', '2022-02-16 15:33:28', NULL),
(25, 'Hazelnut Latte', 25000, 'http://localhost:3939/uploads/1645025631296-Wed_Feb_16_2022-22.33.51-Hazelnut_Latte.png', 'This drink is named Hazelnut Latte because Hazelnut Latte is Hazelnut Latte', 1, 0, '2022-02-07 01:08:21', '2022-02-16 15:33:51', NULL),
(26, 'Summer Fried Rice', 32000, 'http://localhost:3939/uploads/1645025649926-Wed_Feb_16_2022-22.34.09-Summer_Fried_Rice.png', 'This food is named Summer Fried Rice because Summer Fried Rice is Summer Fried Rice', 3, 0, '2022-02-07 01:09:51', '2022-02-16 15:34:09', NULL),
(27, 'Creamy Ice Latte', 27000, 'http://localhost:3939/uploads/1645025666410-Wed_Feb_16_2022-22.34.26-Creamy_Ice_Latte.png', 'This drink is named Creamy Ice Latte because Creamy Ice Latte is Creamy Ice Latte', 1, 0, '2022-02-07 01:16:41', '2022-02-16 15:34:26', NULL),
(28, 'Drum Sticks', 30000, 'http://localhost:3939/uploads/1645025693241-Wed_Feb_16_2022-22.34.53-Drum_Sticks.png', 'This food is named Drum Sticks because Drum Sticks is Drum Sticks', 3, 0, '2022-02-07 01:17:45', '2022-02-16 15:34:53', NULL),
(29, 'Salty Rice', 20000, 'http://localhost:3939/uploads/1645025712425-Wed_Feb_16_2022-22.35.12-Salty_Rice.png', 'This food is named Salty Rice because Salty Rice is Salty Rice', 3, 0, '2022-02-07 01:18:49', '2022-02-16 15:35:12', NULL),
(30, 'Pinky Promise', 30000, 'http://localhost:3939/uploads/1645025728528-Wed_Feb_16_2022-22.35.28-Pinky_Promise.png', 'This drink is named Pinky Promise because Pinky Promise is Pinky Promise', 2, 0, '2022-02-07 01:19:46', '2022-02-16 15:35:28', NULL),
(31, 'Chicken Wings', 40000, 'http://localhost:3939/uploads/1645475570300-Tue_Feb_22_2022-03.32.50-Chicken_Wings.png', 'This food is named Chicken Wings because Chicken Wings is Chicken Wings', 3, 0, '2022-02-07 01:20:35', '2022-02-21 20:32:50', NULL),
(32, 'Cold Brew', 30000, 'http://localhost:3939/uploads/1645025755941-Wed_Feb_16_2022-22.35.55-Cold_Brew.png', 'This drink is named Cold Brew because Cold Brew is Cold Brew', 2, 0, '2022-02-07 01:22:27', '2022-02-16 15:35:55', NULL),
(44, 'Coffee Latte', 15000, 'http://localhost:3939/uploads/1645363787616-Sun_Feb_20_2022-20.29.47-Cofee_Latte.jpg', 'Coffee Latte is named Coffee Latte because Coffee Latte is Coffee Latte', 1, 0, '2022-02-20 13:29:47', NULL, NULL),
(45, 'Cappucino', 5000, 'http://localhost:3939/uploads/1645363825647-Sun_Feb_20_2022-20.30.25-Cappucino.jpg', 'Cappucino is named Cappucino because Cappucino is Cappucino', 1, 0, '2022-02-20 13:30:25', NULL, NULL),
(46, 'Red Velvet Latte', 33000, 'http://localhost:3939/uploads/1645363883554-Sun_Feb_20_2022-20.31.23-Red_Velvet_Latte.jpg', 'Red Velvet Latte is named Red Velvet Latte because Red Velvet Latte is Red Velvet Latte', 1, 0, '2022-02-20 13:31:23', NULL, NULL),
(47, 'Choco Rhum', 28000, 'http://localhost:3939/uploads/1645363980533-Sun_Feb_20_2022-20.33.00-Choco_Rhum.jpg', 'Choco Rhum is named Choco Rhum because Choco Rhum is Choco Rhum', 4, 0, '2022-02-20 13:33:00', NULL, NULL),
(50, 'Salmon Truffle Teriyaki', 60000, 'http://localhost:3939/uploads/1645364114911-Sun_Feb_20_2022-20.35.14-Salmon_Truffle_Teriyaki.jpg', 'Salmon Truffle Teriyaki is named Salmon Truffle Teriyaki because Salmon Truffle Teriyaki is Salmon Truffle Teriyaki', 3, 0, '2022-02-20 13:35:14', NULL, NULL),
(51, 'Wiener Schnitzel', 69000, 'http://localhost:3939/uploads/1645364163509-Sun_Feb_20_2022-20.36.03-Wiener_Schnitzel.jpg', 'Wiener Schnitzel is named Wiener Schnitzel because Wiener Schnitzel is Wiener Schnitzel', 3, 0, '2022-02-20 13:36:03', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','customer') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `phone`, `role`, `created_at`, `updated_at`) VALUES
(17, 'Terra', 'terra@gmail.com', '$2a$10$Jf.edJC46NAcSr//vnXlAu20DtgKrf55dVhN/sMBi6rF67LW6zr16', '+6281234567890', 'admin', '2022-02-09 20:56:54', '2022-02-21 20:11:18');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` datetime DEFAULT NULL,
  `gender` enum('male','female') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `first_name`, `last_name`, `birth_date`, `gender`, `address`, `image`, `created_at`, `updated_at`) VALUES
(1, 17, 'Terra', 'Firma', '2022-02-18 00:00:00', 'male', 'Example Road, Block. AA, No. 00, Example City', 'http://localhost:3939/uploads/1645289817890-Sat_Feb_19_2022-23.56.57-A2.jpeg', '2022-02-09 20:56:54', '2022-02-21 20:11:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `order_items_ibfk_2` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_details_ibfk_1` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_details` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
