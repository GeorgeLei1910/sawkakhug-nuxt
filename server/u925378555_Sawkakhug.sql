-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 06, 2023 at 04:55 AM
-- Server version: 10.6.12-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u925378555_Sawkakhug`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `ID` varchar(3) NOT NULL,
  `CreatedOn` datetime DEFAULT current_timestamp(),
  `Type` char(3) NOT NULL,
  `Title` text NOT NULL,
  `Description` text NOT NULL,
  `Color` tinytext NOT NULL,
  `Picture` text DEFAULT NULL,
  `square_category_id` text DEFAULT NULL,
  `Show` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`ID`, `CreatedOn`, `Type`, `Title`, `Description`, `Color`, `Picture`, `square_category_id`, `Show`) VALUES
('CRO', '2020-05-08 00:00:00', 'TSU', 'Caring Others', 'I have plain mask for daily use. <br>I am putting this item at cost in order to encourage people to wear them.', 'FF4F98', 'images\\Products\\Sewing\\CareMask_1.jpg', 'JKKHDCSN6G4V63BVBNTOKOXX', 0),
('DGR', '2019-12-07 00:00:00', 'AMI', 'Dongri', 'I wanted to make a hat which covers light like feathers. When I thought of the shape, only the shape which came to my mind was \"acorn\". This hat series will be called \"Dongri (acorn)\" reminiscing that God cares for feeding little creatures such as squirrels. I hope that we can share the reminder of God\'s kindness and provision.', 'C4A3CF', 'Dongri.jpg', 'EQUHVNBVYZGVEDBYGNZFIB65', 1),
('FLY', '2020-05-10 00:00:00', 'TSU', 'I Will Fly Away', 'Since someone said this pattern reminds of the birds flying, this song has been in my mind. So I call these face masks \" I\'ll fly away\" for now.  I made 2 of them with slightly different stitch. The difference is very subtle though.</p><p>Red in Japan has been seen as sacred colour. Red has been seen as protection from evil and inviting the goodness. Also the symbol of life and passion.  This one I used particular \"enji\", Japanese carmine.', 'EBB5D5', 'images\\Products\\Sewing\\FlyAway_Red1.jpg', NULL, 0),
('HWR', '2021-06-10 00:00:00', 'TSU', 'Honwari', 'Note: \"in\" means the flower pattern with three bands, \"&\" means the flower pattern with 7 stripes', 'FFCB88', 'Honwari.jpg', 'XCI473HOE6E5TEOTS3XAY2OB', 1),
('MA', '2019-07-10 00:00:00', 'AMI', 'Neck Warmers: Mamotte Ageru', '\"Mamotte Ageru\" means I will protect you.', '3EB3C8', 'MamotteAgeru.jpg', 'KFY32IDKZABZTH5RM4N27ZLT', 1),
('RMS', '2020-04-21 00:00:00', 'TSU', 'Romans 8:26', 'Sometime, maybe often, I want to make something with \"unnecessarily\".</p><p> When you think of it, masks should be pragmatic and utilitarian.</p><p>If so, is there still the space for something \"unnecessary\"? </br> I made this because I was thinking of COVID-19 and Romans 8:26. It is mostly hand stitched.</br> We know our prayers are with in Him and He knows even when we cannot express with words. He knows us so deep... This is one and only mask.</br><span style=\"font-weight: bold\">Children Sizes are available</span>', 'FFCB88', 'images\\Products\\Sewing\\Rm826_3.jpg', NULL, 0),
('SOH', '2019-07-09 00:00:00', 'AMI', 'A Shape of a Hug', 'I have been thinking of how to make a hug for a long time. How can I send a hug to the friends how are far a way. This is what came out from those thought.', '62AB42', 'ShapeOfHug.jpg', 'DYMDL5LBYLXC46EYLPT76QZ6', 1),
('SOP', '2023-03-10 20:49:56', 'TMG', 'A Shape Of Prayers', '', 'ffa89e', 'AShapeOfPrayer.jpeg', 'HUOA7FSTHWH6YEOWUTSVEABP', 1),
('TMU', '2022-07-20 18:28:38', 'TMG', 'Shape of Hug', 'Tsumugi also means \"to put together the thoughts and emotions\" ', '1fb592', 'TsumugiSOH.jpg', '53K3J566MVBHXG6P4L2YRXOT', 1),
('TNG', '2021-07-01 00:00:00', 'TSU', 'Tsunagu', '\"Tsunagu\" means connecting. Relationship starts with connecting with others. That is how we cultivate culture and how our lives are built, with dots of people and dots of events, dots of memories, dots of emotions... I am making this series to think of how each of us connect the \"dots\".  It never be like the following the templates, all of them are unique and “straight” in their own way so I stitched \"straight\" without using a ruler but using my hands to guide the dots. I hope these will bless you daily. Life become a bit of reminder that we are connected by the loving hand of God.', '3A34AD', 'Tsunagu.jpg', 'YL5VDTUP7Z5WFVIN2LZDMQIQ', 1),
('TOT', '2019-08-11 00:00:00', 'AMI', 'Hand Mitts: Te O Tsunago', 'Te o tsunago means let\'s hold hand. I like fingerless mitts because you can hold things better.', 'B04D30', 'TeOTsunago.jpg', 'VT5AIBIOKYE4X2L6UHZDOGMB', 1);

-- --------------------------------------------------------

--
-- Table structure for table `supercategories`
--

CREATE TABLE `supercategories` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `init` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `display` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supercategories`
--

INSERT INTO `supercategories` (`id`, `name`, `init`, `description`, `created_on`, `display`) VALUES
(1, 'TSUMUGI', 'TMG', 'Japanese word for spinning / weaving', '2022-09-18 07:00:00', 1),
(2, 'AMIMONO', 'AMI', 'Japanese word for knitting / crocheting', '2022-09-16 07:00:00', 1),
(3, 'TSUKUROI', 'TSU', 'Japanese word for mending / remaking', '2022-09-18 02:07:46', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CreatedOn` (`CreatedOn`);

--
-- Indexes for table `supercategories`
--
ALTER TABLE `supercategories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `supercategories`
--
ALTER TABLE `supercategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
