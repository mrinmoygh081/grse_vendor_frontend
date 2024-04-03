-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2024 at 09:23 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grse_btn`
--

-- --------------------------------------------------------

--
-- Table structure for table `actualsubmissiondate`
--

CREATE TABLE `actualsubmissiondate` (
  `id` int(5) NOT NULL,
  `purchasing_doc_no` varchar(10) NOT NULL,
  `milestoneId` int(2) NOT NULL,
  `milestoneText` text NOT NULL,
  `actualSubmissionDate` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `actualsubmissiondate`
--

INSERT INTO `actualsubmissiondate` (`id`, `purchasing_doc_no`, `milestoneId`, `milestoneText`, `actualSubmissionDate`, `created_at`, `created_by_id`) VALUES
(22, '7800000040', 2, 'ACTUAL DRAWING SUBMISSION DATE', 1711455110864, 1711457056331, '600400'),
(23, '7800000040', 4, 'ACTUAL ILMS SUBMISSION DATE', 1711455172021, 1711457087542, '600400'),
(24, '7800000040', 3, 'ACTUAL QAP SUBMISSION DATE', 1711455133087, 1711458343163, '600947'),
(27, '7800000040', 1, 'ACTUAL SDBG SUBMISSION DATE', 1712341800000, 1711695827451, '600200');

-- --------------------------------------------------------

--
-- Table structure for table `adr6`
--

CREATE TABLE `adr6` (
  `ADDRNUMBER` varchar(10) NOT NULL COMMENT 'Address Number',
  `PERSNUMBER` varchar(10) NOT NULL COMMENT 'Person number',
  `DATE_FROM` date NOT NULL COMMENT 'Valid-from date - in current Release only 00010101 possible',
  `CONSNUMBER` int(3) NOT NULL COMMENT 'Sequence number',
  `FLGDEFAULT` varchar(1) DEFAULT NULL COMMENT 'Flag: this address is the default address',
  `FLG_NOUSE` varchar(1) DEFAULT NULL COMMENT 'Flag: This Communication Number is Not Used',
  `HOME_FLAG` varchar(1) DEFAULT NULL COMMENT 'Recipient address in this communication type (mail sys.grp)',
  `SMTP_ADDR` varchar(241) NOT NULL COMMENT 'E-Mail Address',
  `SMTP_SRCH` varchar(20) NOT NULL COMMENT 'E-Mail Address Search Field',
  `DFT_RECEIV` varchar(1) NOT NULL COMMENT 'Flag: Recipient is standard recipient for this address',
  `R3_USER` varchar(1) NOT NULL COMMENT 'Flag: Connected to an SAP System',
  `ENCODE` varchar(1) NOT NULL COMMENT 'Desired Data Coding (E-Mail)',
  `TNEF` varchar(1) NOT NULL COMMENT 'Flag: Receiver can receive TNEF coding via SMTP',
  `VALID_FROM` varchar(14) NOT NULL COMMENT '		Communication Data: Valid From (YYYYMMDDHHMMSS)Communication Data: Valid From (YYYYMMDDHHMMSS)',
  `VALID_TO` varchar(14) NOT NULL COMMENT 'Communication Data: Valid To (YYYYMMDDHHMMSS)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=' E-Mail Addresses (Business Address Services)';

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `user_type` int(3) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `internal_role_id` int(11) DEFAULT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(250) NOT NULL,
  `name` varchar(45) NOT NULL,
  `vendor_code` varchar(25) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `last_login_time` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `user_type`, `department_id`, `internal_role_id`, `username`, `password`, `name`, `vendor_code`, `datetime`, `last_login_time`) VALUES
(2, 1, 1, 1, 'vendor', '1234', 'Vendor1', '50007545', '2023-10-12 15:55:23', NULL),
(3, 1, 0, 0, 'vendor2', '1234', 'Vendor2', '50000435', '2023-10-12 15:56:56', NULL),
(4, 3, 3, 2, '600231', '1234', 'grse qap staff', '600231', '2023-10-12 15:57:39', NULL),
(5, 4, 3, 1, '600229', '1234', 'grse qap assigner', '600229', '2023-10-12 15:58:16', NULL),
(6, 6, 13, 4, 'super_admin', '0000', 'Kamal Ruidas', '600230', '2023-09-12 10:25:51', NULL),
(7, 2, 3, 2, '600947', '1234', 'grse qap staff', '600947', '2023-10-12 15:58:16', NULL),
(8, 2, 3, 2, '600948', '1234', 'grse qap staff', '600948', '2023-10-12 15:58:16', NULL),
(9, 2, 3, 2, '600232', '1234', 'grse qap staff', '600232', '2023-10-12 15:58:16', NULL),
(10, 2, 3, 2, '600233', '1234', 'grse qap staff', '600233', '2023-10-12 15:58:16', NULL),
(11, 2, 3, 2, '600949', '1234', 'grse qap staff', '600949', '2023-10-12 15:58:16', NULL),
(12, 2, 3, 2, '600951', '1234', 'grse qap staff', '600951', '2023-10-12 15:58:16', NULL),
(13, 2, 3, 2, '600953', '1234', 'grse qap staff', '600953', '2023-10-12 15:58:16', NULL),
(14, 2, 3, 2, '600950', '1234', 'grse qap staff', '600950', '2023-10-12 15:58:16', NULL),
(15, 2, 3, 2, '600252', '1234', 'grse qap staff', '600252', '2023-10-12 15:58:16', NULL),
(16, 0, 14, 1, 'PPC user', '1234', 'ppc_user', '600100', '2024-01-15 14:08:08', NULL),
(18, 0, 15, 1, 'grse_FINANCE_ASSIGNER', '1234', 'grse_FINANCE_ASSIGNER', '600200', '2024-01-23 16:44:53', NULL),
(19, 0, 16, 0, 'RIC', '1234', 'grse_RIC', '600300', '2024-01-23 16:44:53', NULL),
(20, 0, 15, 2, 'grse_FINANCE_STAFF', '1234', 'grse_FINANCE_STAFF', '600201', '2024-01-23 16:44:53', NULL),
(21, 0, 17, 1, 'Po dealing officer', '1234', 'Po dealing officer', '493834', '2024-01-23 16:44:53', NULL),
(22, 2, 2, 1, 'CDO(drawing officer)', '1234', 'CDO(drawing officer)', '600400', '2024-01-23 16:44:53', NULL),
(23, 0, 15, 2, 'grse_FINANCE_STAFF', '1234', 'grse_FINANCE_STAFF', '600202', '2024-01-23 16:44:53', NULL),
(24, 0, 15, 2, 'grse_FINANCE_STAFF', '1234', 'grse_FINANCE_STAFF', '600203', '2024-01-23 16:44:53', NULL),
(25, 2, 5, 1, 'grse_STORE', '1234', 'grse_STORE', '600500', '2024-01-23 16:44:53', NULL),
(27, 2, 18, 1, 'HR', '1234', 'grse_HR', '600600', '2024-01-23 16:44:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `billing_officers`
--

CREATE TABLE `billing_officers` (
  `officer_id` varchar(10) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(85) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `billing_officers`
--

INSERT INTO `billing_officers` (`officer_id`, `first_name`, `last_name`, `email`) VALUES
('00006369', 'Jayanta', 'Sarkar', 'aabhinit96@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `bill_registration`
--

CREATE TABLE `bill_registration` (
  `id` int(11) NOT NULL,
  `po` varchar(15) NOT NULL,
  `vendor_id` varchar(25) NOT NULL,
  `invoice` varchar(55) NOT NULL,
  `bill_date` datetime NOT NULL,
  `bill_submitted` varchar(85) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `file_name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `bill_registration`
--

INSERT INTO `bill_registration` (`id`, `po`, `vendor_id`, `invoice`, `bill_date`, `bill_submitted`, `remarks`, `file_name`) VALUES
(56, '210000006', '00000105', 'afsaf', '2023-09-13 18:30:00', 'abhinit96@gmail.com', 'afdsvsadfsdgv', '1694683104557-grsc.jpg'),
(57, '123', '00006007', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', '1694494082388-user.jpg'),
(58, '210000007', '00006007', 'dfdsfdsf', '2023-09-13 18:30:00', 'mrinmoyghosh102@gmail.com', 'fdsvsdvsdv', '1694683519215-images.png'),
(59, '210000006', '00000105', 'sdfadsaf', '2023-09-13 18:30:00', 'mrinmoyghosh102@gmail.com', 'dfcadsfvds', '1694683529526-images.png'),
(60, '123', '00006007', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', '1694494082388-user.jpg'),
(61, '210000006', '00000105', 'test', '2023-09-13 18:30:00', 'mrinmoyghosh102@gmail.com', 'efwf', '1694683577254-images.png'),
(62, '123', '00006007', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', '1694494082388-user.jpg'),
(63, '123', '00006007', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', '1694494082388-user.jpg'),
(64, '210000006', '00000105', 'INV001', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'TEST1', '1694684134354-images.png'),
(65, '210000006', '00000105', 'INV0ICE2345', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'ABHINKIT', 'null'),
(66, '210000006', '00000105', 'ABHINI234678', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'RWST', 'null'),
(67, '210000006', '00000105', 'ABHINI234456789', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'swqdwqd', '1694685873751-images.png'),
(68, '210000006', '00000105', 'cvcxf', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'vbxbxb', '1694685879280-images.png'),
(69, '210000006', '00000105', 'ABHINI234zdfvds', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'fgttyyyy', '1694686066056-images.png'),
(70, '210000006', '00000105', 'ABHINI234456789', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'test1test1test1test1', '1694754979532-images.png'),
(71, '210000006', '00000105', 'INVOICE0909', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'WEDAR', '1694758395582-grsc.jpg'),
(72, '210000006', '00000105', 'xxxxx', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'xfds', '1694768578586-images.png'),
(73, '123', 'undefined', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', 'undefined'),
(74, '210000006', '00000105', 'bk', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'fesrgsrgsdv', 'undefined'),
(75, '210000006', '00000105', 'sdasfasdf', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'fesdfsdfsf', 'undefined'),
(76, '210000006', '00000105', 'sdasfasdf', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'fesdfsdfsf', 'undefined'),
(77, '210000006', '00000105', 'abhinit123456', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'dfdvd abhinitrttttt', '1694781797265-images.png'),
(78, '210000006', '00000105', 'abhinitanand', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'kolkata', '1694781916351-images.png'),
(79, '210000006', '00000105', 'tetinghhhhhhh', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'treeeeeee', '1695013678848-images.png'),
(80, '210000006', '00000105', 'gk', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'retryutfdfdfg', '1695013765166-grsc.jpg'),
(81, '210000006', '00000105', 'INVICE9009', '2023-09-19 18:30:00', 'aabhinit96@gmail.com', 'REFEFEWFEF', '1695015396700-grsc.jpg'),
(82, '210000006', '00000105', 'INVOICE7777', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'EDEFEF', '1695015638160-images.png'),
(83, '210000006', '00000105', 'abhinit0101', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', '3rewfwfwf', '1695015936385-images.png'),
(84, '210000006', '00000105', 'testing1233445555556', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'ty67', '1695019996428-images.png'),
(85, '210000006', '00000105', 'bk1', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'er', '1695020730970-grsc.jpg'),
(86, '210000006', '00000105', 'WDWEFWEFWEF', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'TYOPP', '1695032719058-images.png'),
(87, '210000006', '00000105', 'CDCDCDC', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', '', '1695032997845-images.png'),
(88, '210000006', '00000105', 'ABHINI234', '2023-09-18 18:30:00', 'aabhinit96@gmail.com', 'recod', '1695105182795-abhi.png'),
(89, '210000006', '00000105', 'free', '2023-09-19 18:30:00', 'aabhinit96@gmail.com', 'wfwf', '1695210670268-abhi.png'),
(90, '210000006', '00000105', 'bk12', '2023-09-19 18:30:00', 'aabhinit96@gmail.com', '2qe3rwrt', '1695210884205-abhi.png'),
(91, '210000006', '00000105', 'rttttt', '2023-09-20 18:30:00', 'aabhinit96@gmail.com', 'today', '1695277061510-abhi.png'),
(92, '210000006', '00000105', 'INVOICE60009', '2023-09-20 18:30:00', 'aabhinit96@gmail.com', 'kkkkkkkkkkkk', '1695278021712-abhi.png'),
(93, '210000006', '00000105', 'dfwfg', '2023-09-20 18:30:00', 'aabhinit96@gmail.com', 'gggggggggggg', 'undefined'),
(94, '210000006', '00000105', 'ABC', '2023-09-20 18:30:00', 'aabhinit96@gmail.com', 'DSD', '1695292722734-abhi.png'),
(95, '7800000040', '50007545', 'afdfsgdrgesrg', '2023-09-25 18:30:00', 'aabhinit96@gmail.com', 'grfgergerg', '1695723989731-abhi.png'),
(96, '7800000040', '50007545', 'frrrrrrrrrrrrrr', '2023-09-26 18:30:00', 'aabhinit96@gmail.com', 'dsadsadasdasdadadad', '1695791365926-abhi.png');

-- --------------------------------------------------------

--
-- Table structure for table `btn`
--

CREATE TABLE `btn` (
  `btn_num` varchar(30) NOT NULL,
  `purchasing_doc_no` varchar(30) NOT NULL,
  `invoice_no` varchar(30) DEFAULT NULL,
  `invoice_filename` varchar(150) NOT NULL,
  `invoice_value` varchar(30) DEFAULT NULL,
  `e_invoice_no` varchar(30) DEFAULT NULL,
  `e_invoice_filename` varchar(150) DEFAULT NULL,
  `debit_note` varchar(15) DEFAULT NULL,
  `credit_note` varchar(15) DEFAULT NULL,
  `debit_credit_filename` varchar(150) DEFAULT NULL,
  `net_claim_amount` varchar(15) DEFAULT NULL,
  `c_sdbg_date` varchar(30) DEFAULT NULL,
  `c_sdbg_filename` varchar(150) DEFAULT NULL,
  `a_sdbg_date` varchar(30) DEFAULT NULL,
  `demand_raise_filename` varchar(150) DEFAULT NULL,
  `gate_entry_no` varchar(30) DEFAULT NULL,
  `get_entry_filename` varchar(150) DEFAULT NULL,
  `gate_entry_date` varchar(30) DEFAULT NULL,
  `grn_no_1` varchar(30) DEFAULT NULL,
  `grn_no_2` varchar(30) DEFAULT NULL,
  `grn_no_3` varchar(30) DEFAULT NULL,
  `grn_no_4` varchar(30) DEFAULT NULL,
  `icgrn_no_1` varchar(30) DEFAULT NULL,
  `icgrn_no_2` varchar(30) DEFAULT NULL,
  `icgrn_no_3` varchar(30) DEFAULT NULL,
  `icgrn_no_4` varchar(30) DEFAULT NULL,
  `icgrn_total` varchar(30) DEFAULT NULL,
  `c_drawing_date` varchar(30) DEFAULT NULL,
  `a_drawing_date` varchar(30) DEFAULT NULL,
  `c_qap_date` varchar(30) DEFAULT NULL,
  `a_qap_date` varchar(30) DEFAULT NULL,
  `c_ilms_date` varchar(30) DEFAULT NULL,
  `a_ilms_date` varchar(30) DEFAULT NULL,
  `pbg_filename` varchar(150) DEFAULT NULL,
  `hsn_gstn_icgrn` tinyint(1) DEFAULT NULL,
  `ld_gate_entry_date` varchar(30) DEFAULT NULL,
  `ld_contractual_date` varchar(30) DEFAULT NULL,
  `ld_amount` varchar(15) NOT NULL,
  `c_drawing_date_do` varchar(30) DEFAULT NULL,
  `a_drawing_date_do` varchar(30) DEFAULT NULL,
  `drawing_penalty` varchar(15) DEFAULT NULL,
  `c_qap_date_do` varchar(30) DEFAULT NULL,
  `a_qap_date_do` varchar(30) DEFAULT NULL,
  `qap_penalty` varchar(15) DEFAULT NULL,
  `c_ilms_date_do` varchar(30) DEFAULT NULL,
  `a_ilms_date_do` varchar(30) DEFAULT NULL,
  `ilms_penalty` varchar(15) DEFAULT NULL,
  `other_penalty` varchar(15) DEFAULT NULL,
  `total_penalty` varchar(15) NOT NULL,
  `net_payable_amount` varchar(15) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `btn`
--

INSERT INTO `btn` (`btn_num`, `purchasing_doc_no`, `invoice_no`, `invoice_filename`, `invoice_value`, `e_invoice_no`, `e_invoice_filename`, `debit_note`, `credit_note`, `debit_credit_filename`, `net_claim_amount`, `c_sdbg_date`, `c_sdbg_filename`, `a_sdbg_date`, `demand_raise_filename`, `gate_entry_no`, `get_entry_filename`, `gate_entry_date`, `grn_no_1`, `grn_no_2`, `grn_no_3`, `grn_no_4`, `icgrn_no_1`, `icgrn_no_2`, `icgrn_no_3`, `icgrn_no_4`, `icgrn_total`, `c_drawing_date`, `a_drawing_date`, `c_qap_date`, `a_qap_date`, `c_ilms_date`, `a_ilms_date`, `pbg_filename`, `hsn_gstn_icgrn`, `ld_gate_entry_date`, `ld_contractual_date`, `ld_amount`, `c_drawing_date_do`, `a_drawing_date_do`, `drawing_penalty`, `c_qap_date_do`, `a_qap_date_do`, `qap_penalty`, `c_ilms_date_do`, `a_ilms_date_do`, `ilms_penalty`, `other_penalty`, `total_penalty`, `net_payable_amount`, `updated_by`, `created_at`, `created_by_id`) VALUES
('btn-1711459221725', '7800000040', 'demo2', '1711459221665-sample.pdf', '300000', 'ghjkl E-Invoice lhgf', '1711459221666-sample.pdf', '3000', '1000', '1711459221666-sample.pdf', '32000', '1699255657917', '1711459221667-sample.pdf', '1711456341026', '1711459221670-sample.pdf', '302000', '1711459221666-sample.pdf', '2024-04-07', '4234', '42344', '423444', '4234444', '234', '2344', '23444', '2434444', '2342344234442434444', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '1711459221670-sample.pdf', 0, ',', 'null', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', 0, ''),
('btn-1711459820794', '7800000040', 'demo', '1711459820778-sample.pdf', '30000', '20000', '1711459820778-sample.pdf', '10000', '5000', '1711459820778-sample.pdf', '35000', '1699255657917', '1711459820778-sample.pdf', '1711456341026', '1711459820780-sample.pdf', '56789', '1711459820778-sample.pdf', '2024-03-31', '4234', '42344', '423444', '4234444', '234', '2344', '23444', '2434444', '2342344234442434444', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '1711459820780-sample.pdf', 0, ',', 'null', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', 0, ''),
('btn-1711537868756', '7800000040', 'demo223', '1711537868743-sample.pdf', '300000', 'null', 'null', '100', '50', '1711537868743-sample.pdf', '300050', '1699255657917', '1711537868744-sample.pdf', '1711456341026', '1711537868744-sample.pdf', '56789', '1711537868744-sample.pdf', '2024-03-30', '4234', 'null', 'null', 'null', '234', 'null', 'null', 'null', '234', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '1711537868744-sample.pdf', 0, ',', 'null', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', 0, ''),
('BTN202403274031', '7800000040', 'demo221', '1711538776070-sample.pdf', '30000', 'null', 'null', '1000', '500', '1711538776071-sample.pdf', '30500', '1699255657917', '1711538776071-sample.pdf', '1711456341026', '1711538776071-sample.pdf', '56789', '1711538776071-sample.pdf', '2024-03-30', '4234', '42344', 'null', 'null', '234', '2344', 'null', 'null', '2342344', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '1711538776074-sample.pdf', 0, ',', 'null', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `demande_management`
--

CREATE TABLE `demande_management` (
  `id` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  `action_type` varchar(60) NOT NULL,
  `reference_no` varchar(30) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `line_item_no` int(11) NOT NULL,
  `request_amount` int(11) DEFAULT NULL,
  `recived_quantity` int(11) DEFAULT 0,
  `delivery_date` bigint(20) DEFAULT NULL,
  `created_at` bigint(20) DEFAULT NULL,
  `created_by_id` varchar(20) DEFAULT NULL,
  `remarks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `demande_management`
--

INSERT INTO `demande_management` (`id`, `status`, `action_type`, `reference_no`, `purchasing_doc_no`, `line_item_no`, `request_amount`, `recived_quantity`, `delivery_date`, `created_at`, `created_by_id`, `remarks`) VALUES
(1, 'REQUEST', 'material', 'DM-1711303929932-0100', '7800000040', 15, 2, 0, 1710760850178, 1711303929932, '600100', 'requested'),
(2, 'REQUEST', 'material', 'DM-1711304031790-0100', '7800000040', 40, 2, 0, 1710760850178, 1711304031790, '600100', 'requested'),
(4, 'SUBMITTED', 'material', 'DM-1711304235227-0100', '7800000040', 70, 2, 0, 1710760850178, 1711304235227, '600100', 'requested'),
(5, 'SUBMITTED', 'material', 'DM-1711304253056-0100', '7800000040', 80, 2, 0, 1710760850178, 1711304253056, '600100', 'requested'),
(6, 'RECEIVED', 'material', 'DM-1711304280393-0100', '7800000040', 20, 2, 1, 1710760850178, 1711304280393, '600100', 'requested'),
(7, 'SUBMITTED', 'material', 'DM-1711440962820-0100', '7800000040', 20, 2, 0, 1710760850178, 1711440962820, '600100', 'requested'),
(8, 'RECEIVED', 'material', 'DM-1711440962820-0100', '7800000040', 20, 2, 1, 1710760850178, 1711441692649, '600100', 'received'),
(9, 'SUBMITTED', 'material', 'DM-1711444636900-0100', '7800000040', 50, 2, 0, 1710760850178, 1711444636900, '600100', 'requested'),
(10, 'RECEIVED', 'material', 'DM-1711444636900-0100', '7800000040', 50, 2, 1, 1710760850178, 1711444698425, '600100', 'received'),
(11, 'SUBMITTED', 'material', 'DM-1711444928656-0100', '7800000040', 15, 2, 0, 1710760850178, 1711444928657, '600100', 'requested'),
(12, 'RECEIVED', 'material', 'DM-1711444928656-0100', '7800000040', 15, 2, 1, 1710760850178, 1711445006218, '600100', 'received'),
(13, 'SUBMITTED', 'Material Requirement', 'DM-1711529961165-0100', '7800000040', 40, 15, 0, 1710354600, 1711529961165, '600100', 'TESTINg'),
(14, 'RECEIVED', 'Material Requirement', 'DM-1711529961165-0100', '7800000040', 40, 15, 7, 1710354600, 1711531288549, '600100', 'Received!'),
(15, 'SUBMITTED', 'Material Requirement', 'DM-1711616207739-0100', '7800000047', 20, 40, 0, 1712341800, 1711616207739, '600100', 'Need Urgently!'),
(16, 'RECEIVED', 'Material Requirement', 'DM-1711616207739-0100', '7800000047', 20, 40, 10, 1712341800, 1711616253991, '600100', 'Received Today!');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` varchar(10) NOT NULL COMMENT 'Department Id',
  `department_name` varchar(50) NOT NULL COMMENT 'Department Name',
  `department_code` varchar(6) NOT NULL COMMENT 'Department Code'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='department table';

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`, `department_code`) VALUES
('D1', 'Material', 'MTRL'),
('D1', 'Finance', 'FNC'),
('D3', 'Testing', 'TST'),
('1', 'BTS Reg Center', 'BTS_RE'),
('2', 'Department', 'DEPT'),
('3', 'Finance Section', 'FNC'),
('4', 'Banking Section', 'BNKG');

-- --------------------------------------------------------

--
-- Table structure for table `department_wise_log`
--

CREATE TABLE `department_wise_log` (
  `id` int(11) NOT NULL,
  `user_id` int(8) NOT NULL,
  `vendor_code` varchar(10) DEFAULT NULL,
  `depertment` varchar(100) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `dept_table_id` int(11) DEFAULT NULL,
  `remarks` text NOT NULL,
  `purchasing_doc_no` varchar(10) DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department_wise_log`
--

INSERT INTO `department_wise_log` (`id`, `user_id`, `vendor_code`, `depertment`, `action`, `dept_table_id`, `remarks`, `purchasing_doc_no`, `created_at`, `created_by_id`) VALUES
(7, 50007545, '50007545', '3', 'PENDING', 10, 'QAP uploaded . . ', '4800001795', 1702986935158, '50007545'),
(8, 600229, '50007545', '3', 'ASSIGNED', 11, 'QAP ASSIGN ', '4800001795', 1702986996069, '600229'),
(9, 600231, '50007545', '3', 'REJECTED', 12, 'QAP  REJECTED', '4800001795', 1702987058141, '600231'),
(10, 50007545, '50007545', '3', 'RE_SUBMITTED', 13, 'QAP uploaded . . ', '4800001795', 1702987787360, '50007545'),
(11, 50007545, '50007545', '3', 'RE_SUBMITTED', 14, 'QAP uploaded . . ', '4800001795', 1702987790056, '50007545'),
(12, 50007545, '50007545', '3', 'RE_SUBMITTED', 15, 'QAP uploaded . . ', '4800001795', 1702987791069, '50007545'),
(13, 50007545, '50007545', '3', 'RE_SUBMITTED', 16, 'QAP uploaded . . ', '4800001795', 1702987791845, '50007545'),
(14, 50007545, '50007545', '3', 'RE_SUBMITTED', 17, 'QAP uploaded . . ', '4800001795', 1702987792569, '50007545'),
(15, 600231, '50007545', '3', 'ACCEPTED', 18, 'QAP ACCEPTED . . . . ', '4800001795', 1702988034657, '600231'),
(16, 600231, '50007545', '3', 'APPROVED', 19, 'QAP  APPROVED .......', '4800001795', 1702988098157, '600231'),
(17, 50007545, '50007545', '3', 'PENDING', 20, 'QAP uploaded . . ', '4800001795', 1703053565425, '50007545'),
(18, 50007545, '50007545', '3', 'PENDING', 24, 'QAP uploaded . . ', '4800001795', 1703054719006, '50007545'),
(19, 50007545, '50007545', '3', 'RE_SUBMITTED', 25, 'QAP uploaded . . ', '4800001795', 1703054735094, '50007545'),
(20, 50007545, '50007545', '3', 'RE_SUBMITTED', 26, 'QAP uploaded . . ', '4800001795', 1703056033021, '50007545'),
(21, 50007545, '50007545', '3', 'PENDING', 27, 'QAP uploaded . . ', '4800001795', 1703056044279, '50007545'),
(22, 50007545, '50007545', '3', 'PENDING', 28, 'QAP uploaded . . ', '4800001795', 1703057319647, '50007545'),
(23, 50007545, '50007545', '3', 'PENDING', 29, 'QAP uploaded . . ', '4800001795', 1703057344803, '50007545'),
(24, 50007545, '50007545', '3', 'PENDING', 30, 'QAP uploaded . . ', '4800001795', 1703057390217, '50007545'),
(25, 50007545, '50007545', '3', 'RE_SUBMITTED', 31, 'QAP uploaded . . ', '4800001795', 1703057483988, '50007545'),
(26, 50007545, '50007545', '3', 'PENDING', 32, 'QAP uploaded . . ', '4800001795', 1703064235003, '50007545'),
(27, 50007545, '50007545', '3', 'PENDING', 33, 'QAP uploaded . . ', '4800001795', 1703064364255, '50007545'),
(28, 50007545, '50007545', '3', 'PENDING', 34, 'QAP uploaded . . ', '4800001795', 1704105642, '50007545'),
(29, 600231, '50007545', '3', 'PENDING', 35, 'QAP uploaded . . ', '4800001795', 1705747242, '50007545'),
(30, 600231, '50007545', '3', 'PENDING', 4, 'QAP uploaded . . ', '4800001795', 1704073242, '50007545'),
(31, 600229, '50007545', '3', 'ASSIGNED', 5, 'QAP ASSIGN ', '4800001795', 1704451242, '600229'),
(32, 600229, '50007545', '3', 'ASSIGNED', 6, 'QAP ASSIGN ', '4800001795', 1703132618912, '600229'),
(33, 600229, '50007545', '3', 'ASSIGNED', 7, 'QAP ASSIGN ', '4800001795', 1703133868612, '600229'),
(34, 600229, '50007545', '3', 'ASSIGNED', 8, 'QAP ASSIGN ', '4800001795', 1703134836244, '600229'),
(35, 600231, '50007545', '3', 'REJECTED', 9, 'QAP  REJECTED', '4800001795', 1703135338176, '600231'),
(36, 50007545, '50007545', '3', 'RE_SUBMITTED', 11, 'QAP uploaded . . ', '4800001795', 1703135469587, '50007545'),
(37, 600229, '50007545', '3', 'ASSIGNED', 12, 'QAP ASSIGN ', '4800001795', 1703135706322, '600229'),
(38, 600229, '50007545', '3', 'ACCEPTED', 13, 'QAP ACCEPTED . . . . ', '4800001795', 1703135719932, '600229'),
(39, 600229, '50007545', '3', 'APPROVED', 14, 'QAP  APPROVED .......', '4800001795', 1703135744897, '600229'),
(40, 50007545, '50007545', '3', 'PENDING', 15, 'QAP uploaded . . ', '4800001795', 1703143894338, '50007545'),
(41, 50000435, '50005041', '3', 'PENDING', 16, 'Vendor upload sdbg', '4765476434', 1704272766110, '50000435'),
(42, 50000435, '50005041', '3', 'PENDING', 17, 'Vendor upload sdbg', '4765476434', 1704273023796, '50000435'),
(600232, 50007545, '50007545', '3', 'PENDING', 32, 'Uploading QAP', '7800000040', 1707200314877, '50007545'),
(600233, 493834, '50007545', '17', 'PENDING', 35, 'SDBG uploaded . . ', '7800000040', 1705747242, '493834'),
(600234, 493834, '50007545', '17', 'PENDING', 4, 'QAP uploaded . . ', '7800000040', 1704073242, '493834'),
(600235, 493834, '50007545', '17', 'ASSIGNED', 5, 'QAP ASSIGN ', '7800000040', 1704451242, '493834'),
(600236, 600229, '50007545', '3', 'ASSIGNED', 36, 'hhh', '7800000040', 1707470818242, '600229'),
(600237, 50007545, '50007545', '3', 'PENDING', 37, 'HELLLO', '7800000040', 1708593794721, '50007545'),
(600238, 50007545, '50007545', '3', 'PENDING', 38, 'Hello', '7800000040', 1708595450561, '50007545'),
(600239, 50007545, '50007545', '3', 'PENDING', 39, 'THis is a sample file', '7800000040', 1708752970259, '50007545'),
(600240, 50007545, '50007545', '3', 'PENDING', 1, 'HEllo', '7800000040', 1708753398901, '50007545'),
(600241, 50007545, '50007545', '3', 'PENDING', 2, 'Demo QAP Upload', '7800000040', 1708753854960, '50007545'),
(600242, 50007545, '50007545', '3', 'PENDING', 1, 'QAP Upload', '7800000040', 1708753930033, '50007545'),
(600243, 600229, '50007545', '3', 'ASSIGNED', 2, 'Assigned!', '7800000040', 1708754416054, '600229'),
(600244, 50007545, '50007545', '3', 'PENDING', 3, 'again', '7800000040', 1708754938726, '50007545'),
(600245, 600953, '50007545', '3', 'ACCEPTED', 5, 'Accepted!', '7800000040', 1708755581861, '600953'),
(600246, 600953, '50007545', '3', 'ACCEPTED', 6, 'Again Accepted!', '7800000040', 1708755638235, '600953'),
(600247, 600953, '50007545', '3', 'REJECTED', 7, 'Wrong File!', '7800000040', 1708755704641, '600953'),
(600248, 600953, '50007545', '3', 'APPROVED', 8, 'Approved!', '7800000040', 1708755720085, '600953'),
(600249, 50007545, '50007545', '3', 'PENDING', 9, 'Hello Dada, test krchi', '7800000040', 1708758829658, '50007545'),
(600250, 50007545, '50007545', '3', 'PENDING', 1, 'Uploading QAP File.', '7800000040', 1708781018387, '50007545'),
(600251, 600229, '50007545', '3', 'ASSIGNED', 2, 'ASsinged!', '7800000040', 1708781132164, '600229'),
(600252, 600949, '50007545', '3', 'ACCEPTED', 4, 'this file is almost correct.', '7800000040', 1708781358259, '600949'),
(600253, 600949, '50007545', '3', 'APPROVED', 5, 'Approved', '7800000040', 1708781481193, '600949'),
(600254, 50007545, '50007545', '3', 'PENDING', 6, 'Hello', '7800000047', 1709207306831, '50007545'),
(600255, 50007545, '50007545', '3', 'PENDING', 7, 'Uploading!', '7800000040', 1709209012646, '50007545'),
(600256, 600229, '50007545', '3', 'ASSIGNED', 8, 'Ok!', '7800000040', 1709209070696, '600229'),
(600257, 50007545, '50007545', '3', 'PENDING', 9, 'Hello Testing', '7800000040', 1709525257478, '50007545'),
(600258, 50007545, '50007545', '3', 'PENDING', 10, 'HEllo', '7800000040', 1709525915112, '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `depertment_master`
--

CREATE TABLE `depertment_master` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `depertment_master`
--

INSERT INTO `depertment_master` (`id`, `name`) VALUES
(1, 'SDBG'),
(2, 'DRAWING'),
(3, 'QAP'),
(5, 'STORE'),
(6, 'USER'),
(7, 'OTH'),
(8, 'NCM'),
(9, 'PAYMENT_RECOMMENDATION'),
(10, 'VENDOR'),
(11, 'PAYMENT_VOUCHER'),
(12, 'ADMIN'),
(13, 'SUPER_ADMIN'),
(14, 'PPC'),
(15, 'FINANCE'),
(16, 'RIC'),
(17, 'PURCHASE'),
(18, 'HR');

-- --------------------------------------------------------

--
-- Table structure for table `drawing`
--

CREATE TABLE `drawing` (
  `id` int(11) NOT NULL,
  `reference_no` varchar(60) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `actionType` varchar(100) DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `drawing`
--

INSERT INTO `drawing` (`id`, `reference_no`, `purchasing_doc_no`, `file_name`, `vendor_code`, `file_path`, `remarks`, `status`, `actionType`, `updated_by`, `created_at`, `created_by_id`) VALUES
(23, 'DW-1711455110877-7545', '7800000040', '1711455110860-sample.pdf', '50007545', 'uploads\\submitDrawing\\1711455110860-sample.pdf', 'Coverletter', 'SUBMITTED', 'Upload Drawing ail Chain', 'VENDOR', 1711455110864, '50007545'),
(24, 'DW-1711455110877-7545', '7800000040', NULL, '50007545', NULL, 'approved!!!', 'APPROVED', 'Acknowledgement/Remarks', 'GRSE', 1711457056331, '600400'),
(25, 'DW-1711692123616-7545', '7800000040', '1711692123594-sample.pdf', '50007545', 'uploads\\submitDrawing\\1711692123594-sample.pdf', 'HEllo', 'SUBMITTED', 'Upload Drawing ail Chain', 'VENDOR', 1711692123600, '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `ekbe`
--

CREATE TABLE `ekbe` (
  `EBELN` varchar(10) NOT NULL COMMENT ' Document Number',
  `EBELP` int(5) NOT NULL COMMENT 'Item Number of\r\n Purchasing\r\n Document',
  `GJAHR` int(4) NOT NULL COMMENT 'Material Document\r\n Year',
  `BELNR` varchar(10) NOT NULL COMMENT 'Number of\r\n Material\r\n Document'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=' History per Purchasing Document';

--
-- Dumping data for table `ekbe`
--

INSERT INTO `ekbe` (`EBELN`, `EBELP`, `GJAHR`, `BELNR`) VALUES
('7800000040', 10, 2022, '5000231739'),
('7800000040', 10, 2022, '5000231739'),
('7800000040', 10, 2022, '5000231740'),
('7800000040', 10, 2022, '5000231741'),
('7800000040', 10, 2022, '5000231742');

-- --------------------------------------------------------

--
-- Table structure for table `eket`
--

CREATE TABLE `eket` (
  `EBELN` varchar(10) NOT NULL COMMENT 'Purchasing Document\r\n Number',
  `EBELP` int(5) NOT NULL COMMENT 'Item Number of\r\n Purchasing Document',
  `ETENR` int(4) NOT NULL COMMENT 'Delivery Schedule\r\n Line Counter',
  `EINDT` date NOT NULL COMMENT 'Item Delivery Date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eket`
--

INSERT INTO `eket` (`EBELN`, `EBELP`, `ETENR`, `EINDT`) VALUES
('7800000040', 10, 1, '2014-03-14'),
('2100010812', 20, 1, '2014-03-15'),
('7800000040', 10, 1, '2015-07-24'),
('7800000040', 10, 1, '2016-07-04'),
('4700013553', 15, 1, '2016-04-30'),
('4700013553', 20, 1, '2016-04-30'),
('7800000040', 30, 1, '2016-04-30'),
('4700013553', 40, 1, '2016-04-30'),
('4700013553', 50, 1, '2016-04-30'),
('7800000040', 10, 1, '2016-04-29'),
('7800000040', 10, 1, '2013-04-15'),
('7800000040', 10, 1, '2014-03-22'),
('4800003580', 20, 1, '2014-04-15'),
('7800000047', 20, 1, '2024-04-15');

-- --------------------------------------------------------

--
-- Table structure for table `ekko`
--

CREATE TABLE `ekko` (
  `EBELN` varchar(10) NOT NULL COMMENT 'Purchasing Document Number',
  `BUKRS` varchar(4) NOT NULL COMMENT 'Company Code',
  `BSTYP` varchar(1) DEFAULT NULL COMMENT 'Purchasing Document Category',
  `BSART` varchar(4) DEFAULT NULL COMMENT 'Purchasing Document Type',
  `LOEKZ` varchar(1) DEFAULT NULL COMMENT '	Deletion Indicator in Purchasing Document',
  `AEDAT` date DEFAULT NULL COMMENT '	Date on Which Record Was Created',
  `ERNAM` varchar(12) DEFAULT NULL COMMENT 'Name Of Person Who Created Object',
  `LIFNR` varchar(10) DEFAULT NULL COMMENT 'Vendor Account Number',
  `EKORG` varchar(4) DEFAULT NULL COMMENT 'Purchasing Organization',
  `EKGRP` varchar(3) DEFAULT NULL COMMENT 'Puchasing Group'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Purchasing Document Header';

--
-- Dumping data for table `ekko`
--

INSERT INTO `ekko` (`EBELN`, `BUKRS`, `BSTYP`, `BSART`, `LOEKZ`, `AEDAT`, `ERNAM`, `LIFNR`, `EKORG`, `EKGRP`) VALUES
('4700013227', 'GRSE', 'F', 'ZDM', NULL, '2015-02-12', 'ERPDM', '50005041', 'GRSE', 'ERP'),
('4700013553', 'GRSE', 'F', 'ZDM', NULL, '2015-03-27', 'ERPDM', '50005041', 'GRSE', 'ERP'),
('4700016027', 'GRSE', 'F', 'ZDM', NULL, '2016-01-29', '487412', '50005041', 'GRSE', 'ERP'),
('4800001795', 'GRSE', 'F', 'ZDM', NULL, '2012-11-28', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800003580', 'GRSE', 'F', 'ZDM', NULL, '2014-03-18', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800004078', 'GRSE', 'F', 'ZDM', NULL, '2014-06-25', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800005422', 'GRSE', 'F', 'ZDM', NULL, '2015-03-19', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800007095', 'GRSE', 'F', 'ZDM', NULL, '2015-09-11', '487412', '50005041', 'GRSE', 'ERP'),
('4800008195', 'GRSE', 'F', 'ZDM', NULL, '2016-03-31', '487412', '50005041', 'GRSE', 'ERP'),
('4800011669', 'GRSE', 'F', 'ZDM', NULL, '2017-05-15', '487412', '50005041', 'GRSE', 'ERP'),
('4800011727', 'GRSE', 'F', 'ZDM', NULL, '2017-05-22', '600229', '50005041', 'GRSE', 'ERP'),
('4800011728', 'GRSE', 'F', 'ZDM', NULL, '2017-05-22', '600229', '50005041', 'GRSE', 'ERP'),
('4800011745', 'GRSE', 'F', 'ZDM', NULL, '2017-05-24', '600229', '50005041', 'GRSE', 'ERP'),
('4800013770', 'GRSE', 'F', 'ZDM', NULL, '2017-12-04', '600229', '50005041', 'GRSE', 'ERP'),
('4800019411', 'GRSE', 'F', 'ZDM', NULL, '2020-06-12', '493916', '50005041', 'GRSE', 'ERP'),
('4800022399', 'GRSE', 'F', 'ZDM', NULL, '2022-04-23', '493916', '50005041', 'GRSE', 'DP3'),
('4800022835', 'GRSE', 'F', 'ZDM', NULL, '2022-09-13', '491646', '50005041', 'GRSE', 'DP3'),
('7800000040', 'GRSE', 'F', 'ZGSR', NULL, '2023-09-10', '493834', '50007545', 'GRSE', 'DP3'),
('7800000041', 'GRSE', 'F', 'ZGSR', NULL, '2024-01-23', '493834', '50007546', 'GRSE', 'DP3'),
('7800000047', 'GRSE', 'F', 'ZDM', NULL, '2022-06-28', '493834', '50007545', 'GRSE', 'DP3'),
('QQ00013227', '5788', 'S', 'ABCD', 'W', '2023-11-07', '34567656787', '1234567890', '1234', '123');

-- --------------------------------------------------------

--
-- Table structure for table `ekpo`
--

CREATE TABLE `ekpo` (
  `EBELN` varchar(10) NOT NULL COMMENT 'Purchasing Document\r\n Number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of\r\n Purchasing Document',
  `LOEKZ` varchar(1) DEFAULT NULL COMMENT 'Deletion Indicator in\r\n Purchasing Document',
  `STATU` varchar(1) DEFAULT NULL COMMENT 'RFQ status',
  `AEDAT` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document\r\n Item Change Date',
  `TXZ01` varchar(40) DEFAULT NULL COMMENT 'Material Number',
  `MATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `BUKRS` varchar(4) DEFAULT NULL COMMENT 'Company Code',
  `WERKS` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `LGORT` varchar(4) DEFAULT NULL COMMENT 'Storage Location',
  `MATKL` varchar(9) DEFAULT NULL COMMENT 'Material Group',
  `KTMNG` int(13) DEFAULT NULL COMMENT 'Target Quantity',
  `MENGE` int(13) DEFAULT NULL COMMENT 'Purchase Order Quantity',
  `MEINS` varchar(4) DEFAULT NULL COMMENT 'Purchase Order Unit of\r\n Measure',
  `NETPR` varchar(11) DEFAULT NULL COMMENT 'Net Price in Purchasing\r\n Document (in Document\r\n Currency)',
  `NETWR` varchar(13) DEFAULT NULL COMMENT 'Net Order Value in PO\r\n Currency',
  `MWSKZ` varchar(2) DEFAULT NULL COMMENT 'Tax on sales/purchases\r\n code'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=': Purchasing Document Item';

--
-- Dumping data for table `ekpo`
--

INSERT INTO `ekpo` (`EBELN`, `EBELP`, `LOEKZ`, `STATU`, `AEDAT`, `TXZ01`, `MATNR`, `BUKRS`, `WERKS`, `LGORT`, `MATKL`, `KTMNG`, `MENGE`, `MEINS`, `NETPR`, `NETWR`, `MWSKZ`) VALUES
('2100010812', 20, '', '', '07.03.2014', 'Modification of ZINC prog in SAP Payroll', '', 'GRSE', '100', '', 'SE57', 1, 0, 'AU', '0', '0', ''),
('7800000040', 15, '', '', '12.01.2017', '1. Project Systems & Production Planning', 'SER08205', 'GRSE', '100', '', 'SE74', 20, 1, 'AU', '1,557,165.0', '1,557,165.00', 'TV'),
('4700013553', 20, '', '', '22.03.2016', '2. Workflows', 'SER08205', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '204,218.00', '204,218.00', 'SU'),
('4700013553', 30, '', '', '22.03.2016', '3. ABAP Reports', 'SER08205', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '81,690.00', '81,690.00', '4S'),
('7800000040', 40, '', '', '12.01.2017', '4. Testing', 'SER08205', 'GRSE', '100', '', 'SE74', 20, 1, 'AU', '163,376.00', '163,376.00', 'TV'),
('7800000040', 50, '', '', '12.01.2017', '5. Commissioning the system', 'SER08205', 'GRSE', '100', '', 'SE74', 20, 1, 'AU', '81,688.00', '81,688.00', 'TV'),
('4700013553', 60, '', '', '20.06.2019', '6. Warranty Support', 'SER08205', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '490,076.00', '490,076.00', 'TV'),
('7800000040', 70, '', '', '12.01.2017', '7. Training', 'SER08205', 'GRSE', '100', '', 'SE74', 20, 1, 'AU', '81,687.00', '81,687.00', 'TV'),
('7800000040', 80, '', '', '12.01.2017', '8. Documentation', 'SER08205', 'GRSE', '100', '', 'SE74', 20, 1, 'LS', '147,037.00', '147,037.00', 'TV'),
('7800000040', 20, '', '', '18.03.2014', 'Modification of ZINC prog in SAP Payroll', '', 'GRSE', '100', '', 'SE57', 20, 1, 'AU', '127,200.00', '127,200.00', 'SG'),
('4800008195', 20, '', '', '11.01.2018', 'Reverse Charge Service tax process', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '154,361.00', '154,361.00', 'TV'),
('4800008195', 30, '', '', '11.01.2018', 'TDS reconciliation', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '210,492.00', '210,492.00', 'TV'),
('4800008195', 40, '', '', '11.01.2018', 'Improvement of sales of B & D Spare', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '526,229.00', '526,229.00', '12'),
('4800008195', 50, '', '', '11.01.2018', 'Customized reports required by SLP', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '1,059,475.0', '1,059,475.00', '12'),
('4800008195', 60, '', '', '11.01.2018', 'Improvement in Salary & Wages & PF', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '280,656.00', '280,656.00', 'TV'),
('4800008195', 70, 'L', '', '31.10.2018', 'General Requirements of Finance', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '420,984.00', '420,984.00', '4S'),
('4800008195', 80, '', '', '26.09.2018', 'Purchase Order Release', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '554,295.00', '554,295.00', '12'),
('4800008195', 90, 'L', '', '31.10.2018', 'Inclusion of PWD rate in civil contracts', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '70,164.00', '70,164.00', '4S'),
('4800008195', 100, '', '', '10.02.2018', 'Documentation', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '70,164.00', '70,164.00', '12'),
('4800008195', 110, '', '', '10.02.2018', 'Training', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '70,164.00', '70,164.00', '12'),
('4800008195', 120, '', '', '10.02.2018', 'Impl of BB Prod facilities at DEP Ranchi', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '1,430,000.0', '1,430,000.00', '12'),
('4800011669', 20, '', '', '29.03.2018', 'Implementation of GST for GRSE', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '1,938,406.0', '1,938,406.00', '12'),
('7800000047', 20, '', '', '02.01.2023', 'WageRevision forOA(non-ranchi)&RanchiEmp', 'SER08205', 'GRSE', '100', '', 'SE57', 180, 1, 'AU', '1,000,000.0', '1,000,000.00', '12'),
('1234512354', 10023, 'W', '1', '07.03.2014', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('1234512354', 88, 'W', '1', '20.06.2019', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('QQ00013227', 10023, 'W', '1', '07.03.2014', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('QQ00013227', 88, 'W', '1', '20.06.2019', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG');

-- --------------------------------------------------------

--
-- Table structure for table `emp_department_list`
--

CREATE TABLE `emp_department_list` (
  `id` int(11) NOT NULL,
  `dept_name` varchar(20) NOT NULL,
  `dept_id` varchar(5) NOT NULL,
  `internal_role_id` int(11) DEFAULT NULL,
  `sub_dept_name` varchar(20) DEFAULT NULL,
  `sub_dept_id` varchar(20) DEFAULT NULL,
  `emp_id` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='department  and sub dept list table';

--
-- Dumping data for table `emp_department_list`
--

INSERT INTO `emp_department_list` (`id`, `dept_name`, `dept_id`, `internal_role_id`, `sub_dept_name`, `sub_dept_id`, `emp_id`) VALUES
(1, 'QAP', '3', 0, 'hull', '1', '600229'),
(2, 'QAP', '3', 0, 'electrical', '2', '600947'),
(3, 'QAP', '3', 0, 'hull', '1', '600231'),
(4, 'QAP', '3', 0, 'electrical', '2', '600948'),
(5, 'QAP', '3', 0, 'hull', '1', '600232'),
(7, 'QAP', '3', 0, 'machinery', '3', '600233'),
(8, 'QAP', '3', 0, 'electrical', '2', '600949'),
(9, 'QAP', '3', 0, 'plumbing', '4', '600951'),
(10, 'QAP', '3', 0, 'plumbing', '4', '600953'),
(11, 'QAP', '3', 0, 'plumbing', '4', '600950'),
(12, 'QAP', '3', 0, 'machinery', '3', '600252'),
(13, 'FINANCE', '15', 2, '', '', '600201'),
(14, 'FINANCE', '15', 2, '', '', '600202'),
(15, 'FINANCE', '15', 2, '', '', '600203');

-- --------------------------------------------------------

--
-- Table structure for table `essr`
--

CREATE TABLE `essr` (
  `LBLNI` varchar(10) NOT NULL COMMENT 'Entry Sheet Number',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `EBELP` varchar(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=' Service Entry Sheet Header Data';

--
-- Dumping data for table `essr`
--

INSERT INTO `essr` (`LBLNI`, `EBELN`, `EBELP`) VALUES
('1000127607', '7800000040', '10');

-- --------------------------------------------------------

--
-- Table structure for table `grse_personnel`
--

CREATE TABLE `grse_personnel` (
  `MANNO` int(8) NOT NULL,
  `NAME1` varchar(50) NOT NULL,
  `NAME2` varchar(50) NOT NULL,
  `EMAIL` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='GRSE ';

--
-- Dumping data for table `grse_personnel`
--

INSERT INTO `grse_personnel` (`MANNO`, `NAME1`, `NAME2`, `EMAIL`) VALUES
(6317, 'SYAMAL', 'DUTTA', 'DUTTA.SYAMALKUMAR@GRSE.CO.IN'),
(6369, 'AMIYA', 'BHATTACHARYA', 'BHATTACHARYA.AK@GRSE.CO.IN');

-- --------------------------------------------------------

--
-- Table structure for table `hr`
--

CREATE TABLE `hr` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) DEFAULT NULL,
  `action_type` varchar(40) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hr_compliance`
--

CREATE TABLE `hr_compliance` (
  `id` int(11) NOT NULL,
  `reference_no` varchar(60) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `action_type` varchar(60) DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ilms`
--

CREATE TABLE `ilms` (
  `id` int(11) NOT NULL,
  `reference_no` varchar(60) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL,
  `updated_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `ilms`
--

INSERT INTO `ilms` (`id`, `reference_no`, `purchasing_doc_no`, `file_name`, `file_path`, `remarks`, `status`, `vendor_code`, `type`, `created_at`, `created_by_id`, `updated_by`) VALUES
(11, 'ILMS-1711455172021-7545', '7800000040', '1711455172018-sample.pdf', 'uploads\\submitILMS\\1711455172018-sample.pdf', 'FKLDJF', 'SUBMITTED', '50007545', 'Upload ILMS', 1711455172021, '50007545', 'VENDOR'),
(12, 'ILMS-1711455172021-7545', '7800000040', '1711455172018-sample.pdf', 'uploads\\submitILMS\\1711455172018-sample.pdf', 'approved!', 'APPROVED', '50007545', 'Remarks', 1711457087542, '600400', 'GRSE');

-- --------------------------------------------------------

--
-- Table structure for table `inspection_call_letter`
--

CREATE TABLE `inspection_call_letter` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `action_type` varchar(60) DEFAULT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inspection_call_letter`
--

INSERT INTO `inspection_call_letter` (`id`, `purchasing_doc_no`, `file_name`, `action_type`, `vendor_code`, `file_path`, `remarks`, `updated_by`, `created_at`, `created_by_id`) VALUES
(3, '7800000040', '1711455195161-sample.pdf', 'RM INSPECTION CALL LETTER', '50007545', 'uploads\\inspectionCallLetter\\1711455195161-sample.pdf', 'ILMS Remarks!', 'VENDOR', 1711455195162, '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `inspection_release_note`
--

CREATE TABLE `inspection_release_note` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `action_type` varchar(60) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inspection_release_note`
--

INSERT INTO `inspection_release_note` (`id`, `purchasing_doc_no`, `file_name`, `action_type`, `vendor_code`, `file_path`, `remarks`, `updated_by`, `created_at`, `created_by_id`) VALUES
(5, '7800000040', '1711455218576-sample.pdf', 'INSPECTION RELEASE NOTE', '50007545', 'uploads\\submitIRN\\1711455218576-sample.pdf', 'ILMS Release Note', 'VENDOR', 1711455218578, '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `internal_role_master`
--

CREATE TABLE `internal_role_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `internal_role_master`
--

INSERT INTO `internal_role_master` (`id`, `name`) VALUES
(1, 'ASSIGNER'),
(2, 'STAFF'),
(3, 'ADMIN'),
(4, 'SUPER_ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `lfa1`
--

CREATE TABLE `lfa1` (
  `LIFNR` varchar(10) NOT NULL COMMENT 'Account Number of Vendor or Creditor',
  `LAND1` varchar(3) DEFAULT NULL COMMENT 'Country Key',
  `NAME1` varchar(35) DEFAULT NULL COMMENT 'Name 1',
  `ORT01` varchar(35) DEFAULT NULL COMMENT 'City',
  `ORT02` varchar(35) DEFAULT NULL COMMENT 'District',
  `PSTLZ` varchar(6) NOT NULL COMMENT 'Postal Code',
  `STRAS` varchar(50) NOT NULL COMMENT 'House Number and Street',
  `PFACH` varchar(10) DEFAULT NULL COMMENT 'PO Box',
  `REGIO` varchar(3) DEFAULT NULL COMMENT 'Region (State, Province, County)',
  `KTOKK` varchar(4) DEFAULT NULL COMMENT '	Vendor account group',
  `LOEVM_X` varchar(1) DEFAULT NULL COMMENT '	Central Deletion Flag for Master Record',
  `SPRAS` varchar(10) DEFAULT NULL COMMENT 'Language Key',
  `STCD1` varchar(16) DEFAULT NULL COMMENT 'Tax Number 1',
  `TELFX` varchar(31) DEFAULT NULL COMMENT 'Fax Number',
  `STCD3` varchar(18) DEFAULT NULL COMMENT 'Tax Number 3',
  `ZZVENVALDT` date NOT NULL,
  `EMAIL` varchar(241) DEFAULT NULL,
  `PHONE` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `lfa1`
--

INSERT INTO `lfa1` (`LIFNR`, `LAND1`, `NAME1`, `ORT01`, `ORT02`, `PSTLZ`, `STRAS`, `PFACH`, `REGIO`, `KTOKK`, `LOEVM_X`, `SPRAS`, `STCD1`, `TELFX`, `STCD3`, `ZZVENVALDT`, `EMAIL`, `PHONE`) VALUES
('50000437', 'IN', 'TATA STEEL LTD', 'KOLKATA', NULL, '', '', NULL, '25', 'DOMV', NULL, 'EN', 'AAAFA1890Q', '033 2282 1687', '24AAAFA1890Q1Z9', '0000-00-00', NULL, NULL),
('50005041', 'IN', 'PriceWaterhouseCoopers Pvt Ltd', 'KOLKATA', NULL, '', '', NULL, '25', 'DOMV', NULL, 'EN', 'AABCP9181H', NULL, '19AABCP9181H1Z1', '0000-00-00', NULL, NULL),
('50007545', 'IN', 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'KOLKATA', NULL, '700091', 'BG Block', NULL, '25', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00', NULL, NULL),
('50007546', 'IN', 'XYZ (INDIA) PRIV', 'KOLKATA', NULL, '700091', 'BG Block', NULL, '25', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00', NULL, NULL),
('50007560', '900', 'dcg', 'ddd', 'jjdjd', '', '', 'kkkk', 'jjj', 'jeje', 'X', 'uuuu', '876545678', '9876789876', '6677882', '2024-02-24', NULL, NULL),
('50007561', '900', 'dcg', 'ddd', 'jjdjd', '', '', 'kkkk', 'jjj', 'jeje', 'y', 'AAAAA', '876545678', '9876789876', '6677882', '2024-02-24', NULL, NULL),
('50007562', '900', 'dcg', 'ddd', 'jjdjd', '', '', 'kkkk', 'jjj', 'jeje', 'y', 'uuuu', '876545678', '9876789876', '6677882', '2024-02-24', NULL, NULL),
('600229', 'IN', 'naskar sir', 'KOLKATA', NULL, '', '', NULL, '25', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lfa1_old`
--

CREATE TABLE `lfa1_old` (
  `LIFNR` varchar(10) NOT NULL COMMENT 'Account Number of Vendor or Creditor',
  `LAND1` varchar(3) DEFAULT NULL COMMENT 'Country Key',
  `NAME1` varchar(35) DEFAULT NULL COMMENT 'Name 1',
  `ORT01` varchar(35) DEFAULT NULL COMMENT 'City',
  `ORT02` varchar(35) DEFAULT NULL COMMENT 'District',
  `PFACH` varchar(50) DEFAULT NULL COMMENT 'PO Box',
  `REGIO` varchar(3) DEFAULT NULL COMMENT 'Region (State, Province, County)',
  `KTOKK` varchar(4) DEFAULT NULL COMMENT '	Vendor account group',
  `LOEVM_X` varchar(1) DEFAULT NULL COMMENT '	Central Deletion Flag for Master Record',
  `SPRAS` varchar(10) DEFAULT NULL COMMENT 'Language Key',
  `STCD1` varchar(16) DEFAULT NULL COMMENT 'Tax Number 1',
  `TELFX` varchar(31) DEFAULT NULL COMMENT 'Fax Number',
  `STCD3` varchar(18) DEFAULT NULL COMMENT 'Tax Number 3',
  `ZZVENVALDT` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `lfa1_old`
--

INSERT INTO `lfa1_old` (`LIFNR`, `LAND1`, `NAME1`, `ORT01`, `ORT02`, `PFACH`, `REGIO`, `KTOKK`, `LOEVM_X`, `SPRAS`, `STCD1`, `TELFX`, `STCD3`, `ZZVENVALDT`) VALUES
('50000437', 'IN', 'GRSE', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AAAFA1890Q', '033 2282 1687', '24AAAFA1890Q1Z9', '0000-00-00'),
('50005041', 'IN', 'PriceWaterhouseCoopers Pvt Ltd', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AABCP9181H', NULL, '19AABCP9181H1Z1', '0000-00-00'),
('50007545', 'IN', 'XYZ Pvt. Ltd', 'KOLKATA', 'KOLKATA', 'ENGLISH BAZAR', 'WB', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00'),
('50007546', 'IN', 'ABC Pvt Ltd', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AABCP9181H', NULL, '19AABCP9181H1Z1', '0000-00-00'),
('600229', 'IN', 'GRSE', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `makt`
--

CREATE TABLE `makt` (
  `id` int(11) NOT NULL,
  `MATNR` char(18) NOT NULL COMMENT 'Material Number',
  `SPRAS` varchar(1) NOT NULL COMMENT 'Language Key',
  `MAKTX` char(40) NOT NULL COMMENT 'Material Description (Short Text)',
  `MAKTG` char(40) NOT NULL COMMENT 'Material description in upper case for matchcodes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `makt`
--

INSERT INTO `makt` (`id`, `MATNR`, `SPRAS`, `MAKTX`, `MAKTG`) VALUES
(1, '1000001009', '5', 'S', 'ABCD'),
(2, '1000001009', '5', 'S', 'ABCD'),
(3, '1000001009', '5', 'S', 'ABCD'),
(4, '1000001009', '5', 'S', 'ABCD'),
(5, 'M433', '5', 'Some Dummy Description', 'ABCD');

-- --------------------------------------------------------

--
-- Table structure for table `mara`
--

CREATE TABLE `mara` (
  `MATNR` varchar(18) NOT NULL COMMENT 'Material Number',
  `MTART` varchar(4) NOT NULL COMMENT 'Material Type'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Material General Table';

--
-- Dumping data for table `mara`
--

INSERT INTO `mara` (`MATNR`, `MTART`) VALUES
('000000015114117149', 'ZROH'),
('000000015128076737', 'ZROH'),
('9200MAT', 'ZDIN'),
('9200SPARE-28', 'ZDIN'),
('9200SPARE18', 'ZDIN'),
('M433', 'ZDIN'),
('SER08205', 'DIEN'),
('SER08206', 'ZDIN');

-- --------------------------------------------------------

--
-- Table structure for table `mir`
--

CREATE TABLE `mir` (
  `id` int(11) NOT NULL DEFAULT 0,
  `purchasing_doc_no` varchar(11) DEFAULT NULL,
  `type` varchar(40) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mrs`
--

CREATE TABLE `mrs` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) DEFAULT NULL,
  `document_type` varchar(40) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mseg`
--

CREATE TABLE `mseg` (
  `MBLNR` varchar(10) NOT NULL COMMENT 'Number of Material Document',
  `MJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `ZEILE` int(4) DEFAULT NULL COMMENT 'Item in Material Document',
  `LINE_ID` int(6) DEFAULT NULL COMMENT 'Unique identification of document line',
  `PARENT_ID` int(6) DEFAULT NULL COMMENT 'Identifier of immediately superior line',
  `LINE_DEPTH` int(2) DEFAULT NULL COMMENT 'Hierarchy level of line in document',
  `MAA_URZEI` int(4) DEFAULT NULL COMMENT 'Original Line for Account Assignment Item in Material Doc.',
  `BWART` varchar(3) DEFAULT NULL COMMENT 'Movement Type (Inventory Management)',
  `XAUTO` varchar(1) DEFAULT NULL COMMENT 'Item automatically created',
  `MATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `WERKS` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `LGORT` varchar(4) DEFAULT NULL COMMENT 'Storage Location',
  `CHARG` varchar(10) DEFAULT NULL COMMENT 'Batch Number',
  `INSMK` varchar(1) DEFAULT NULL COMMENT 'Stock Type',
  `ZUSCH` varchar(1) DEFAULT NULL COMMENT 'Batch status key',
  `ZUSTD` varchar(1) DEFAULT NULL COMMENT 'Batch in Restricted-Use Stock',
  `SOBKZ` varchar(1) DEFAULT NULL COMMENT 'Special Stock Indicator',
  `LIFNR` varchar(10) DEFAULT NULL COMMENT 'Supplier''s Account Number',
  `KUNNR` varchar(10) DEFAULT NULL COMMENT 'Account number of customer',
  `KDAUF` varchar(10) DEFAULT NULL COMMENT 'Sales Order Number',
  `KDPOS` int(6) DEFAULT NULL COMMENT 'Item Number in Sales Order',
  `KDEIN` int(4) DEFAULT NULL COMMENT 'Delivery schedule for sales order',
  `PLPLA` varchar(10) DEFAULT NULL COMMENT 'Distribution of Differences',
  `SHKZG` varchar(1) DEFAULT NULL COMMENT 'Debit/Credit Indicator',
  `WAERS` varchar(5) DEFAULT NULL COMMENT 'Currency Key',
  `DMBTR` varchar(13) DEFAULT NULL COMMENT 'Amount in local currency',
  `BNBTR` varchar(13) DEFAULT NULL COMMENT 'Delivery costs in local currency',
  `BUALT` varchar(13) DEFAULT NULL COMMENT 'Amount Posted in Alternative Price Control',
  `SHKUM` varchar(1) DEFAULT NULL COMMENT 'Debit/credit indicator in revaluation',
  `DMBUM` varchar(13) DEFAULT NULL COMMENT 'Revaluation amount on back-posting to a previous period',
  `BWTAR` varchar(10) DEFAULT NULL COMMENT 'Valuation Type',
  `MENGE` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `MEINS` varchar(3) DEFAULT NULL COMMENT 'Base Unit of Measure',
  `ERFMG` bigint(13) DEFAULT NULL COMMENT 'Quantity in unit of entry',
  `ERFME` varchar(3) DEFAULT NULL COMMENT 'Unit of entry',
  `BPMNG` bigint(13) DEFAULT NULL COMMENT 'Quantity in Purchase Order Price Unit',
  `BPRME` varchar(3) DEFAULT NULL COMMENT 'Order Price Unit (Purchasing)',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchase order number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document',
  `LFBJA` int(4) DEFAULT NULL COMMENT 'Fiscal Year of a Reference Document',
  `LFBNR` varchar(10) DEFAULT NULL COMMENT 'Document No. of a Reference Document',
  `LFPOS` int(4) DEFAULT NULL COMMENT 'Item of a Reference Document',
  `SJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `SMBLN` varchar(10) DEFAULT NULL COMMENT 'Number of Material Document',
  `SMBLP` int(4) DEFAULT NULL COMMENT 'Item in Material Document',
  `ELIKZ` varchar(1) DEFAULT NULL COMMENT 'Delivery Completed Indicator',
  `SGTXT` varchar(50) DEFAULT NULL COMMENT 'Item Text',
  `EQUNR` varchar(18) DEFAULT NULL COMMENT 'Equipment Number',
  `WEMPF` varchar(12) DEFAULT NULL COMMENT 'Goods recipient',
  `ABLAD` varchar(25) DEFAULT NULL COMMENT 'Unloading Point',
  `GSBER` varchar(4) DEFAULT NULL COMMENT 'Business Area',
  `KOKRS` varchar(4) DEFAULT NULL COMMENT 'Controlling Area',
  `PARGB` varchar(4) DEFAULT NULL COMMENT 'Trading partner''s business area',
  `PARBU` varchar(4) DEFAULT NULL COMMENT 'Clearing company code',
  `KOSTL` varchar(10) DEFAULT NULL COMMENT 'Cost Center',
  `PROJN` varchar(16) DEFAULT NULL COMMENT 'Old: Project number : No longer used --> PS_POSNR',
  `AUFNR` varchar(12) DEFAULT NULL COMMENT 'Order Number',
  `ANLN1` varchar(12) DEFAULT NULL COMMENT 'Main Asset Number',
  `ANLN2` varchar(4) DEFAULT NULL COMMENT 'Asset Subnumber',
  `XSKST` varchar(1) DEFAULT NULL COMMENT 'Indicator: Statistical Posting to Cost Center',
  `XSAUF` varchar(1) DEFAULT NULL COMMENT 'Indicator: Posting to Order Is Statistical',
  `XSPRO` varchar(1) DEFAULT NULL COMMENT 'Indicator: Posting to Project Is Statistical',
  `XSERG` varchar(1) DEFAULT NULL COMMENT 'Indicator: Posting to Profitability Analysis Is Statistical',
  `GJAHR` int(4) DEFAULT NULL COMMENT 'Fiscal Year',
  `XRUEM` varchar(1) DEFAULT NULL COMMENT 'Allow Posting to Previous Period (Backposting)',
  `XRUEJ` varchar(1) DEFAULT NULL COMMENT 'Indicator: post to previous year',
  `BUKRS` varchar(4) DEFAULT NULL COMMENT 'Company Code',
  `BELNR` varchar(10) DEFAULT NULL COMMENT 'Document Number of an Accounting Document',
  `BUZEI` int(3) DEFAULT NULL COMMENT 'Number of Line Item Within Accounting Document',
  `BELUM` varchar(10) DEFAULT NULL COMMENT 'Document Number of an Accounting Document',
  `BUZUM` int(3) DEFAULT NULL COMMENT 'Number of Line Item Within Accounting Document',
  `RSNUM` int(10) DEFAULT NULL COMMENT 'Number of reservation/dependent requirements',
  `RSPOS` int(4) DEFAULT NULL COMMENT 'Item Number of Reservation / Dependent Requirements',
  `KZEAR` varchar(1) DEFAULT NULL COMMENT 'Final Issue for Reservation',
  `PBAMG` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `KZSTR` varchar(1) DEFAULT NULL COMMENT 'Transaction/event is relevant to statistics',
  `UMMAT` varchar(18) DEFAULT NULL COMMENT 'Receiving/Issuing Material',
  `UMWRK` varchar(4) DEFAULT NULL COMMENT 'Receiving plant/issuing plant',
  `UMLGO` varchar(4) DEFAULT NULL COMMENT 'Receiving/issuing storage location',
  `UMCHA` varchar(10) DEFAULT NULL COMMENT 'Receiving/Issuing Batch',
  `UMZST` varchar(1) DEFAULT NULL COMMENT 'Status of Transfer Batch',
  `UMZUS` varchar(1) DEFAULT NULL COMMENT 'Status key of transfer batch',
  `UMBAR` varchar(10) DEFAULT NULL COMMENT 'Valuation Type of Transfer Batch',
  `UMSOK` varchar(1) DEFAULT NULL COMMENT 'Special stock indicator for physical stock transfer',
  `KZBEW` varchar(1) DEFAULT NULL COMMENT 'Movement Indicator',
  `KZVBR` varchar(1) DEFAULT NULL COMMENT 'Consumption posting',
  `KZZUG` varchar(1) DEFAULT NULL COMMENT 'Receipt Indicator',
  `WEUNB` varchar(1) DEFAULT NULL COMMENT 'Goods Receipt, Non-Valuated',
  `PALAN` decimal(11,2) DEFAULT NULL COMMENT 'WMS Number of pallets',
  `LGNUM` varchar(3) DEFAULT NULL COMMENT 'Warehouse Number / Warehouse Complex',
  `LGTYP` varchar(3) DEFAULT NULL COMMENT 'Storage Type',
  `LGPLA` varchar(10) DEFAULT NULL COMMENT 'Storage Bin',
  `BESTQ` varchar(1) DEFAULT NULL COMMENT 'Stock Category in the Warehouse Management System',
  `BWLVS` int(3) DEFAULT NULL COMMENT 'Movement Type for Warehouse Management',
  `TBNUM` int(10) DEFAULT NULL COMMENT 'Transfer Requirement Number',
  `TBPOS` int(4) DEFAULT NULL COMMENT 'Transfer Requirement Item',
  `XBLVS` varchar(1) DEFAULT NULL COMMENT 'Indicator: posting in warehouse management system',
  `VSCHN` varchar(1) DEFAULT NULL COMMENT 'Ind: interim storage posting for source stor.type and bin',
  `NSCHN` varchar(1) DEFAULT NULL COMMENT 'Ind.: interim storage posting for dest.stor.type and bin',
  `DYPLA` varchar(1) DEFAULT NULL COMMENT 'Indicator: dynamic storage bin',
  `UBNUM` int(10) DEFAULT NULL COMMENT 'Posting Change Number',
  `TBPRI` varchar(1) DEFAULT NULL COMMENT 'Transfer Priority',
  `TANUM` int(10) DEFAULT NULL COMMENT 'Transfer Order Number',
  `WEANZ` int(3) DEFAULT NULL COMMENT 'Number of GR/GI Slips to Be Printed',
  `GRUND` int(4) DEFAULT NULL COMMENT 'Reason for Movement',
  `EVERS` varchar(2) DEFAULT NULL COMMENT 'Shipping Instructions',
  `EVERE` varchar(2) DEFAULT NULL COMMENT 'Compliance with Shipping Instructions',
  `IMKEY` varchar(8) DEFAULT NULL COMMENT 'Internal Key for Real Estate Object',
  `KSTRG` varchar(12) DEFAULT NULL COMMENT 'Cost Object',
  `PAOBJNR` int(10) DEFAULT NULL COMMENT 'Profitability Segment Number (CO-PA)',
  `PRCTR` varchar(10) DEFAULT NULL COMMENT 'Profit Center',
  `PS_PSP_PNR` int(8) DEFAULT NULL COMMENT 'Work Breakdown Structure Element (WBS Element)',
  `NPLNR` varchar(12) DEFAULT NULL COMMENT 'Network Number for Account Assignment',
  `AUFPL` int(10) DEFAULT NULL COMMENT 'Routing number of operations in the order',
  `APLZL` int(8) DEFAULT NULL COMMENT 'Internal counter',
  `AUFPS` int(4) DEFAULT NULL COMMENT 'Order item number',
  `VPTNR` varchar(10) DEFAULT NULL COMMENT 'Partner account number',
  `FIPOS` varchar(14) DEFAULT NULL COMMENT 'Commitment Item',
  `SAKTO` varchar(10) DEFAULT NULL COMMENT 'G/L Account Number',
  `BSTMG` bigint(13) DEFAULT NULL COMMENT 'Goods receipt quantity in order unit',
  `BSTME` varchar(3) DEFAULT NULL COMMENT 'Purchase Order Unit of Measure',
  `XWSBR` varchar(1) DEFAULT NULL COMMENT 'Reversal of GR allowed for GR-based IV despite invoice',
  `EMLIF` varchar(10) DEFAULT NULL COMMENT 'Vendor to be supplied/who is to receive delivery',
  `EXBWR` varchar(13) DEFAULT NULL COMMENT 'Externally Entered Posting Amount in Local Currency',
  `VKWRT` varchar(13) DEFAULT NULL COMMENT 'Value at Sales Prices Including Value-Added Tax',
  `AKTNR` varchar(10) DEFAULT NULL COMMENT 'Promotion',
  `ZEKKN` int(2) DEFAULT NULL COMMENT 'Sequential Number of Account Assignment',
  `VFDAT` datetime DEFAULT NULL COMMENT 'Shelf Life Expiration or Best-Before Date',
  `CUOBJ_CH` bigint(18) DEFAULT NULL COMMENT 'Internal object number of the batch classification',
  `EXVKW` varchar(13) DEFAULT NULL COMMENT 'Externally Entered Sales Value in Local Currency',
  `PPRCTR` varchar(10) DEFAULT NULL COMMENT 'Partner Profit Center',
  `RSART` varchar(1) DEFAULT NULL COMMENT 'Record type',
  `GEBER` varchar(10) DEFAULT NULL COMMENT 'Fund',
  `FISTL` varchar(16) DEFAULT NULL COMMENT 'Funds Center',
  `MATBF` varchar(18) DEFAULT NULL COMMENT 'Material in Respect of Which Stock is Managed',
  `UMMAB` varchar(18) DEFAULT NULL COMMENT 'Receiving/Issuing Material',
  `BUSTM` varchar(4) DEFAULT NULL COMMENT 'Posting string for quantities',
  `BUSTW` varchar(4) DEFAULT NULL COMMENT 'Posting String for Values',
  `MENGU` varchar(1) DEFAULT NULL COMMENT 'Quantity Updating in Material Master Record',
  `WERTU` varchar(1) DEFAULT NULL COMMENT 'Value Updating in Material Master Record',
  `LBKUM` bigint(13) DEFAULT NULL COMMENT 'Total valuated stock before the posting',
  `SALK3` varchar(13) DEFAULT NULL COMMENT 'Value of total valuated stock before the posting',
  `VPRSV` varchar(1) DEFAULT NULL COMMENT 'Price control indicator',
  `FKBER` varchar(16) DEFAULT NULL COMMENT 'Functional Area',
  `DABRBZ` datetime DEFAULT NULL COMMENT 'Reference date for settlement',
  `VKWRA` varchar(13) DEFAULT NULL COMMENT 'Value at sales prices excluding value-added tax',
  `DABRZ` datetime DEFAULT NULL COMMENT 'Reference date for settlement',
  `XBEAU` varchar(1) DEFAULT NULL COMMENT 'Purchase order created at time of goods receipt',
  `LSMNG` bigint(13) DEFAULT NULL COMMENT 'Quantity in Unit of Measure from Delivery Note',
  `LSMEH` varchar(3) DEFAULT NULL COMMENT 'Unit of Measure From Delivery Note',
  `KZBWS` varchar(1) DEFAULT NULL COMMENT 'Valuation of Special Stock',
  `QINSPST` varchar(1) DEFAULT NULL COMMENT 'Status of Goods Receipt Inspection',
  `URZEI` int(4) DEFAULT NULL COMMENT 'Original line in material document',
  `J_1BEXBASE` varchar(13) DEFAULT NULL COMMENT 'Alternate base amount in document currency',
  `MWSKZ` varchar(2) DEFAULT NULL COMMENT 'Tax on Sales/Purchases Code',
  `TXJCD` varchar(15) DEFAULT NULL COMMENT 'Tax Jurisdiction',
  `EMATN` varchar(18) DEFAULT NULL COMMENT 'Material number corresponding to manufacturer part number',
  `J_1AGIRUPD` varchar(1) DEFAULT NULL COMMENT 'Goods issue revaluation performed',
  `VKMWS` varchar(2) DEFAULT NULL COMMENT 'Tax on Sales/Purchases Code',
  `HSDAT` datetime DEFAULT NULL COMMENT 'Date of Manufacture',
  `BERKZ` varchar(1) DEFAULT NULL COMMENT 'Material Staging Indicator for Production Supply',
  `MAT_KDAUF` varchar(10) DEFAULT NULL COMMENT 'Sales order number of valuated sales order stock',
  `MAT_KDPOS` int(6) DEFAULT NULL COMMENT 'Sales Order Item of Valuated Sales Order Stock',
  `MAT_PSPNR` int(8) DEFAULT NULL COMMENT 'Valuated Sales Order Stock WBS Element',
  `XWOFF` varchar(1) DEFAULT NULL COMMENT 'Calculation of val. open',
  `BEMOT` varchar(2) DEFAULT NULL COMMENT 'Accounting Indicator',
  `PRZNR` varchar(12) DEFAULT NULL COMMENT 'Business Process',
  `LLIEF` varchar(10) DEFAULT NULL COMMENT 'Supplying Vendor',
  `LSTAR` varchar(6) DEFAULT NULL COMMENT 'Activity Type',
  `XOBEW` varchar(1) DEFAULT NULL COMMENT 'Vendor Stock Valuation Indicator',
  `GRANT_NBR` varchar(20) DEFAULT NULL COMMENT 'Grant',
  `ZUSTD_T156M` varchar(1) DEFAULT NULL COMMENT 'Stock Type Modification (Read from Table T156M)',
  `SPE_GTS_STOCK_TY` varchar(1) DEFAULT NULL COMMENT 'GTS Stock Type',
  `KBLNR` varchar(10) DEFAULT NULL COMMENT 'Document Number for Earmarked Funds',
  `KBLPOS` int(3) DEFAULT NULL COMMENT 'Earmarked Funds: Document Item',
  `XMACC` varchar(1) DEFAULT NULL COMMENT 'Multiple Account Assignment',
  `VGART_MKPF` varchar(2) DEFAULT NULL COMMENT 'Transaction/Event Type',
  `BUDAT_MKPF` datetime DEFAULT NULL COMMENT 'Posting Date in the Document',
  `CPUDT_MKPF` datetime DEFAULT NULL COMMENT 'Day On Which Accounting Document Was Entered',
  `CPUTM_MKPF` time DEFAULT NULL COMMENT 'Time of Entry',
  `USNAM_MKPF` varchar(12) DEFAULT NULL COMMENT 'User Name',
  `XBLNR_MKPF` varchar(16) DEFAULT NULL COMMENT 'Reference Document Number',
  `TCODE2_MKPF` varchar(20) DEFAULT NULL COMMENT 'Transaction Code',
  `VBELN_IM` varchar(10) DEFAULT NULL COMMENT 'Delivery',
  `VBELP_IM` int(6) DEFAULT NULL COMMENT 'Delivery Item',
  `SGT_SCAT` varchar(16) DEFAULT NULL COMMENT 'Stock Segment',
  `SGT_UMSCAT` varchar(16) DEFAULT NULL COMMENT 'Receiving/Issuing Stock Segment',
  `SGT_RCAT` varchar(16) DEFAULT NULL COMMENT 'Requirement Segment',
  `DISUB_OWNER` varchar(10) DEFAULT NULL COMMENT 'Owner of stock',
  `FSH_SEASON_YEAR` varchar(4) DEFAULT NULL COMMENT 'Season Year',
  `FSH_SEASON` varchar(4) DEFAULT NULL COMMENT 'Season',
  `FSH_COLLECTION` varchar(2) DEFAULT NULL COMMENT 'Fashion Collection',
  `FSH_THEME` varchar(4) DEFAULT NULL COMMENT 'Fashion Theme',
  `FSH_UMSEA_YR` varchar(4) DEFAULT NULL COMMENT 'Receiving/Issuing Season Year',
  `FSH_UMSEA` varchar(4) DEFAULT NULL COMMENT 'Receiving/Issuing Season',
  `FSH_UMCOLL` varchar(2) DEFAULT NULL COMMENT 'Receiving/Issuing Collection',
  `FSH_UMTHEME` varchar(4) DEFAULT NULL COMMENT 'Receiving/Issuing Theme',
  `SGT_CHINT` varchar(1) DEFAULT NULL COMMENT 'Discrete Batch Number',
  `FSH_DEALLOC_QTY` bigint(13) DEFAULT NULL COMMENT 'ARun Allocated Quantity',
  `OINAVNW` varchar(13) DEFAULT NULL COMMENT 'Non-deductible input tax',
  `OICONDCOD` varchar(2) DEFAULT NULL COMMENT 'Joint Venture Indicator (Condition Key)',
  `CONDI` varchar(2) DEFAULT NULL COMMENT 'Joint Venture Indicator (Condition Key)',
  `WRF_CHARSTC1` varchar(18) DEFAULT NULL COMMENT 'Characteristic Value 1',
  `WRF_CHARSTC2` varchar(18) DEFAULT NULL COMMENT 'Characteristic Value 2',
  `WRF_CHARSTC3` varchar(18) DEFAULT NULL COMMENT 'Characteristic Value 3'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mseg`
--

INSERT INTO `mseg` (`MBLNR`, `MJAHR`, `ZEILE`, `LINE_ID`, `PARENT_ID`, `LINE_DEPTH`, `MAA_URZEI`, `BWART`, `XAUTO`, `MATNR`, `WERKS`, `LGORT`, `CHARG`, `INSMK`, `ZUSCH`, `ZUSTD`, `SOBKZ`, `LIFNR`, `KUNNR`, `KDAUF`, `KDPOS`, `KDEIN`, `PLPLA`, `SHKZG`, `WAERS`, `DMBTR`, `BNBTR`, `BUALT`, `SHKUM`, `DMBUM`, `BWTAR`, `MENGE`, `MEINS`, `ERFMG`, `ERFME`, `BPMNG`, `BPRME`, `EBELN`, `EBELP`, `LFBJA`, `LFBNR`, `LFPOS`, `SJAHR`, `SMBLN`, `SMBLP`, `ELIKZ`, `SGTXT`, `EQUNR`, `WEMPF`, `ABLAD`, `GSBER`, `KOKRS`, `PARGB`, `PARBU`, `KOSTL`, `PROJN`, `AUFNR`, `ANLN1`, `ANLN2`, `XSKST`, `XSAUF`, `XSPRO`, `XSERG`, `GJAHR`, `XRUEM`, `XRUEJ`, `BUKRS`, `BELNR`, `BUZEI`, `BELUM`, `BUZUM`, `RSNUM`, `RSPOS`, `KZEAR`, `PBAMG`, `KZSTR`, `UMMAT`, `UMWRK`, `UMLGO`, `UMCHA`, `UMZST`, `UMZUS`, `UMBAR`, `UMSOK`, `KZBEW`, `KZVBR`, `KZZUG`, `WEUNB`, `PALAN`, `LGNUM`, `LGTYP`, `LGPLA`, `BESTQ`, `BWLVS`, `TBNUM`, `TBPOS`, `XBLVS`, `VSCHN`, `NSCHN`, `DYPLA`, `UBNUM`, `TBPRI`, `TANUM`, `WEANZ`, `GRUND`, `EVERS`, `EVERE`, `IMKEY`, `KSTRG`, `PAOBJNR`, `PRCTR`, `PS_PSP_PNR`, `NPLNR`, `AUFPL`, `APLZL`, `AUFPS`, `VPTNR`, `FIPOS`, `SAKTO`, `BSTMG`, `BSTME`, `XWSBR`, `EMLIF`, `EXBWR`, `VKWRT`, `AKTNR`, `ZEKKN`, `VFDAT`, `CUOBJ_CH`, `EXVKW`, `PPRCTR`, `RSART`, `GEBER`, `FISTL`, `MATBF`, `UMMAB`, `BUSTM`, `BUSTW`, `MENGU`, `WERTU`, `LBKUM`, `SALK3`, `VPRSV`, `FKBER`, `DABRBZ`, `VKWRA`, `DABRZ`, `XBEAU`, `LSMNG`, `LSMEH`, `KZBWS`, `QINSPST`, `URZEI`, `J_1BEXBASE`, `MWSKZ`, `TXJCD`, `EMATN`, `J_1AGIRUPD`, `VKMWS`, `HSDAT`, `BERKZ`, `MAT_KDAUF`, `MAT_KDPOS`, `MAT_PSPNR`, `XWOFF`, `BEMOT`, `PRZNR`, `LLIEF`, `LSTAR`, `XOBEW`, `GRANT_NBR`, `ZUSTD_T156M`, `SPE_GTS_STOCK_TY`, `KBLNR`, `KBLPOS`, `XMACC`, `VGART_MKPF`, `BUDAT_MKPF`, `CPUDT_MKPF`, `CPUTM_MKPF`, `USNAM_MKPF`, `XBLNR_MKPF`, `TCODE2_MKPF`, `VBELN_IM`, `VBELP_IM`, `SGT_SCAT`, `SGT_UMSCAT`, `SGT_RCAT`, `DISUB_OWNER`, `FSH_SEASON_YEAR`, `FSH_SEASON`, `FSH_COLLECTION`, `FSH_THEME`, `FSH_UMSEA_YR`, `FSH_UMSEA`, `FSH_UMCOLL`, `FSH_UMTHEME`, `SGT_CHINT`, `FSH_DEALLOC_QTY`, `OINAVNW`, `OICONDCOD`, `CONDI`, `WRF_CHARSTC1`, `WRF_CHARSTC2`, `WRF_CHARSTC3`) VALUES
('1000001012', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, '7800000040', 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001013', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, '7800000040', 70, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001014', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, '7800000040', 80, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001015', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, '7800000040', 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001016', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, '7800000040', 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001017', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '7800000040', 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001019', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, '7800000040', 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001020', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '7800000040', 50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001021', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '7800000040', 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001022', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '7800000040', 70, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001023', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '7800000040', 80, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `new_auth`
--

CREATE TABLE `new_auth` (
  `auth_id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(250) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(85) NOT NULL,
  `vendor_code` varchar(25) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `refreshToken` varchar(5000) NOT NULL COMMENT 'Refresh token'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `new_auth`
--

INSERT INTO `new_auth` (`auth_id`, `username`, `password`, `name`, `email`, `vendor_code`, `datetime`, `refreshToken`) VALUES
(1, 'admin', 'admin@213', 'Mrinmoy Ghosh', 'mrinmoygh081@gmail.com', '00000105', '2023-09-12 10:25:51', ''),
(2, 'kamalruidas', 'kamal', 'Kamal Ruidas', 'kamalruidas@gmail.com', '50007545', '2023-10-05 11:33:46', '5678987654567898qwe765567.76545678gfdfghj.oiuytdfghjkjhvc876545678.6r6'),
(3, 'u1', 'password', 'name1', 'kamalruidas@gmail.com', '23443242424', '2023-10-09 10:25:27', '5678987654567898qwe765567.76545678gfdfghj.oiuytdfghjkjhvc876545678.6r6');

-- --------------------------------------------------------

--
-- Table structure for table `new_bill_registration`
--

CREATE TABLE `new_bill_registration` (
  `zbtno` varchar(11) NOT NULL,
  `action_by_id` varchar(50) NOT NULL,
  `action_by_name` varchar(50) NOT NULL,
  `bill_submit_date` date NOT NULL,
  `bill_submit_to_email` varchar(50) NOT NULL,
  `bill_submit_to_name` varchar(50) NOT NULL,
  `bill_submit_time` time NOT NULL,
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  `created_epoch_time` int(13) NOT NULL,
  `created_time` time NOT NULL DEFAULT current_timestamp(),
  `file_name` varchar(255) NOT NULL,
  `invoice_no` varchar(40) NOT NULL,
  `purchasing_doc_no` varchar(10) NOT NULL,
  `remarks` varchar(140) NOT NULL,
  `vendor_ac_no` varchar(10) NOT NULL,
  `vendor_email` varchar(50) NOT NULL,
  `vendor_name` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `new_bill_registration`
--

INSERT INTO `new_bill_registration` (`zbtno`, `action_by_id`, `action_by_name`, `bill_submit_date`, `bill_submit_to_email`, `bill_submit_to_name`, `bill_submit_time`, `created_date`, `created_epoch_time`, `created_time`, `file_name`, `invoice_no`, `purchasing_doc_no`, `remarks`, `vendor_ac_no`, `vendor_email`, `vendor_name`) VALUES
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '00:00:00', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '0000-00-00', 'kamal.ruidas@gmail.com', 'kmal ruidas', '00:00:00', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '0000-00-00', 'kamal.ruidas@gmail.com', 'kmal ruidas', '00:00:00', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927002', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927002', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927007', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927007', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927007', '00000105', 'Mrinmoy Ghosh', '2023-09-26', 'aabhinit96@gmail.com', 'Jayanta Sarkar', '16:36:28', '2023-09-27', 2147483647, '00:00:00', '1695812801280-abhi.png', 'dfdfdf', '7800000040', 'tyyyyyyyyyyybbb', '50007545', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927007', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927008', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927009', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927011', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927013', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927015', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927016', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927017', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927018', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927019', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927020', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927021', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927022', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927023', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927024', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927025', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927026', '00000105', 'Mrinmoy Ghosh', '2023-09-26', 'aabhinit96@gmail.com', 'Jayanta Sarkar', '16:51:24', '2023-09-27', 2147483647, '00:00:00', '1695813698745-abhi.png', 'bksingh', '7800000040', 'trycatch', '50007545', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230929001', '00000105', 'Mrinmoy Ghosh', '2023-09-13', 'aabhinit96@gmail.com', 'Jayanta Sarkar', '16:53:08', '2023-09-29', 2147483647, '00:00:00', '1695986602456-essr.pdf', '234543212345t', '7800000040', 'ee', '50007545', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20231123001', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-11-23', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20231123002', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-11-23', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos');

-- --------------------------------------------------------

--
-- Table structure for table `new_payments`
--

CREATE TABLE `new_payments` (
  `sl_no` int(10) NOT NULL,
  `venor_code` varchar(10) DEFAULT NULL,
  `contactors_name` varchar(255) DEFAULT NULL,
  `po_no` varchar(20) DEFAULT NULL,
  `MAIN` int(7) DEFAULT NULL,
  `FOJ` int(7) DEFAULT NULL,
  `RBD` int(7) DEFAULT NULL,
  `COL_61P` int(7) DEFAULT NULL,
  `TU` int(7) DEFAULT NULL,
  `TTC` int(7) DEFAULT NULL,
  `G_HOUSE` int(7) DEFAULT NULL,
  `BELUR` int(7) DEFAULT NULL,
  `NSSY` int(7) DEFAULT NULL,
  `IHQ_DELHI` int(7) DEFAULT NULL,
  `WAGES_PAID_UPTO` datetime DEFAULT NULL,
  `PF_DEPOSIT_UPTO` datetime DEFAULT NULL,
  `ESI_DEPISIT_UPTO` datetime DEFAULT NULL,
  `REMARKS` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by_name` varchar(255) DEFAULT NULL,
  `created_by_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_name` varchar(255) DEFAULT NULL,
  `updated_by_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `new_payments`
--

INSERT INTO `new_payments` (`sl_no`, `venor_code`, `contactors_name`, `po_no`, `MAIN`, `FOJ`, `RBD`, `COL_61P`, `TU`, `TTC`, `G_HOUSE`, `BELUR`, `NSSY`, `IHQ_DELHI`, `WAGES_PAID_UPTO`, `PF_DEPOSIT_UPTO`, `ESI_DEPISIT_UPTO`, `REMARKS`, `created_at`, `created_by_name`, `created_by_id`, `status`, `updated_at`, `updated_by_name`, `updated_by_id`) VALUES
(92, 'v0909899', 'contactors_name 1', '121310', 121, 233, 245, 67876, 87878, 878987, 78787, 8787, 87678987, 878987, NULL, NULL, NULL, 'REMARKS _1', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(93, NULL, 'contactors_name 2', '121311', 122, 234, 246, 67877, 87879, 878987, 78787, 8788, 87678988, 878988, NULL, NULL, NULL, 'REMARKS _2', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(94, NULL, 'contactors_name 3', '121312', 123, 235, 247, 67878, 87880, 878987, 78788, 8789, 87678989, 878989, NULL, NULL, NULL, 'REMARKS _3', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(95, NULL, 'contactors_name 4', '121313', 124, 236, 248, 67879, 87881, 878987, 78789, 8790, 87678990, 878990, NULL, NULL, NULL, 'REMARKS _4', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(96, NULL, 'contactors_name 5', '121314', 125, 237, 249, 67880, 87882, 878987, 78790, 8791, 87678991, 878991, NULL, NULL, NULL, 'REMARKS _5', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(97, NULL, 'contactors_name 6', '121315', 126, 238, 250, 67881, 87883, 878987, 78791, 8792, 87678992, 878992, NULL, NULL, NULL, 'REMARKS _6', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `new_sdbg`
--

CREATE TABLE `new_sdbg` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `new_sdbg`
--

INSERT INTO `new_sdbg` (`id`, `purchasing_doc_no`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `bank_name`, `transaction_id`, `vendor_code`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '2100010812', '1699252992110-pa0105.pdf', 'uploads\\sdbg\\1699252992110-pa0105.pdf', 'REMARKS', 'PENDING', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699252992115, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(2, '7800000040', '1699253021629-pa0105.pdf', 'uploads\\sdbg\\1699253021629-pa0105.pdf', 'Uploding SDVG', 'PENDING', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699253021633, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'kamal.sspur@gmai.com'),
(3, '4700013227', '1699253035296-pa0105.pdf', 'uploads\\sdbg\\1699253035296-pa0105.pdf', 'REMARKS', 'PENDING', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699253035304, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(4, '7800000040', '1699254320543-marksheet.pdf', 'uploads\\sdbg\\1699254320543-marksheet.pdf', 'hello', 'ACKNOWLEDGE', 'GRSE', NULL, NULL, NULL, 1699254320871, 'dgfghjhjghfgdf', '1234'),
(5, '2100010812', '1699254432586-marksheet.pdf', 'uploads\\sdbg\\1699254432586-marksheet.pdf', 'hello', 'ACKNOWLEDGE', 'GRSE', NULL, NULL, NULL, 1699254432771, 'dgfghjhjghfgdf', '1234'),
(6, '2100010812', '1699254561136-marksheet.pdf', 'uploads\\sdbg\\1699254561136-marksheet.pdf', 'hello', 'ACKNOWLEDGE', 'GRSE', NULL, NULL, NULL, 1699254561244, 'dgfghjhjghfgdf', '1234'),
(7, '4700013227', '1699255043424-pa0105.pdf', 'uploads\\sdbg\\1699255043424-pa0105.pdf', 'REMARKS', 'PENDING', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255043440, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(8, '4700013227', '1699255124185-pa0105.pdf', 'uploads\\sdbg\\1699255124185-pa0105.pdf', 'REMARKS', 'PENDING', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255124203, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(9, '4700013227', '1699255125107-pa0105.pdf', 'uploads\\sdbg\\1699255125107-pa0105.pdf', 'REMARKS', 'PENDING', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255125117, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(10, '4700013227', '1699255126091-pa0105.pdf', 'uploads\\sdbg\\1699255126091-pa0105.pdf', 'REMARKS', 'PENDING', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255126102, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(11, '4700013227', '1699255635431-pa0105.pdf', 'uploads\\sdbg\\1699255635431-pa0105.pdf', 'REMARKS', 'PENDING', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255635447, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(12, '4700013227', '1699255657899-pa0105.pdf', 'uploads\\sdbg\\1699255657899-pa0105.pdf', 'REMARKS', 'ACKNOWLEDGE', 'GRSE', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255657917, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(13, '2100010812', '1699332918868-marksheet.pdf', 'uploads\\sdbg\\1699332918868-marksheet.pdf', 'hello by md md', 'ACKNOWLEDGE', 'GRSE', NULL, NULL, NULL, 1699332919001, 'by mainak dd', '1234'),
(14, '1234567810', '1699606302376-sample.pdf', 'uploads\\sdbg\\1699606302376-sample.pdf', 'cdvsv', 'ACKNOWLEDGE', 'TATA STEEL LTD', '65432343545', '654367899876', '50000437', 1699606302380, 'TATA STEEL LTD', 'grse_department@grse.com'),
(15, '34567876525', '1699606470836-sample.pdf', 'uploads\\sdbg\\1699606470836-sample.pdf', NULL, 'ACKNOWLEDGE', 'GRSE', NULL, NULL, '23114', 1699606470838, 'Abhinit ', '6380'),
(16, '1234567810', '1699606489000-sample.pdf', 'uploads\\sdbg\\1699606489000-sample.pdf', 'cdvsv', 'ACKNOWLEDGE', 'TATA STEEL LTD', '65432343545', '654367899876', '50000437', 1699606489002, 'TATA STEEL LTD', 'grse_department@grse.com'),
(17, '1234567810', '1699606490515-sample.pdf', 'uploads\\sdbg\\1699606490515-sample.pdf', 'cdvsv', 'ACKNOWLEDGE', 'TATA STEEL LTD', '65432343545', '654367899876', '50000437', 1699606490519, 'TATA STEEL LTD', 'grse_department@grse.com'),
(18, '1234567810', '1699606833987-sample.pdf', 'uploads\\sdbg\\1699606833987-sample.pdf', 'test76', 'ACKNOWLEDGE', 'TATA STEEL LTD', 'state bank of india', '5678987654', '50000437', 1699606833990, 'TATA STEEL LTD', 'grse_department@grse.com'),
(19, '1234567810', '1699606947084-sample.pdf', 'uploads\\sdbg\\1699606947084-sample.pdf', 'test76', 'ACKNOWLEDGE', 'TATA STEEL LTD', 'state bank of india', '5678987654', '50000437', 1699606947087, 'TATA STEEL LTD', 'grse_department@grse.com'),
(20, '1234567810', '1699607122187-sample.pdf', 'uploads\\sdbg\\1699607122187-sample.pdf', 'yup', 'ACKNOWLEDGE', 'TATA STEEL LTD', 'axis bank', '9898787898656', '50000437', 1699607122189, 'TATA STEEL LTD', 'grse_department@grse.com'),
(21, '1234567810', '1699607141933-sample.pdf', 'uploads\\sdbg\\1699607141933-sample.pdf', 'yup', 'ACKNOWLEDGE', 'TATA STEEL LTD', 'axis bank', '9898787898656', '50000437', 1699607141935, 'TATA STEEL LTD', 'grse_department@grse.com'),
(22, '1234567810', '1699607193012-abhi.png', 'uploads\\sdbg\\1699607193012-abhi.png', 'jk', 'ACKNOWLEDGE', 'TATA STEEL LTD', 'ngcngv', '746747657868976', '50000437', 1699607193014, 'TATA STEEL LTD', 'grse_department@grse.com'),
(23, '1234567810', '1699607605468-abhi.png', 'uploads\\sdbg\\1699607605468-abhi.png', 'jk', 'ACKNOWLEDGE', 'TATA STEEL LTD', 'ngcngv', '746747657868976', '50000437', 1699607605470, 'TATA STEEL LTD', 'grse_department@grse.com'),
(24, '1234567810', '1699607674540-abhi.png', 'uploads\\sdbg\\1699607674540-abhi.png', 'jk', 'ACKNOWLEDGE', 'TATA STEEL LTD', 'ngcngv', '746747657868976', '50000437', 1699607674543, 'TATA STEEL LTD', 'grse_department@grse.com'),
(25, '1234567810', '1699607768983-abhi.png', 'uploads\\sdbg\\1699607768983-abhi.png', 'jk', 'ACKNOWLEDGE', 'TATA STEEL LTD', 'ngcngv', '746747657868976', '50000437', 1699607768987, 'TATA STEEL LTD', 'grse_department@grse.com'),
(26, '1234567897', '1699610572931-sample.pdf', 'uploads\\sdbg\\1699610572931-sample.pdf', 'Uploading SDBG', 'ACKNOWLEDGE', 'DCG DATA -CORE SYSTEMS (INDIA)', 'state bank of india', '78967689897897', '50007545', 1699610572938, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'vendor@vendor.com'),
(27, '34567876525', '1699616425614-sample.pdf', 'uploads\\sdbg\\1699616425614-sample.pdf', NULL, 'ACKNOWLEDGE', 'GRSE', NULL, NULL, '23114', 1699616425616, 'Abhinit ', '6380'),
(28, '7800000040', '1699942575546-sample.pdf', 'uploads\\sdbg\\1699942575546-sample.pdf', 'Returning SDBG for correction', 'ACKNOWLEDGE', 'DCG DATA -CORE SYSTEMS (INDIA)', 'State Bank of India', '45678986546789', '50007545', 1699942575550, 'GRSE', 'vendor@vendor.com'),
(29, '7800000040', '1699942929173-sample.pdf', 'uploads\\sdbg\\1699942929173-sample.pdf', 'Resubmitting corrected SDBG', 'ACKNOWLEDGE', 'DCG DATA -CORE SYSTEMS (INDIA)', 'State Bank of India', '676554577876565', '50007545', 1699942929175, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'vendor@vendor.com'),
(30, '7800000040', '1699942990187-sample.pdf', 'uploads\\sdbg\\1699942990187-sample.pdf', 'SDBG receipt acknowledgement', 'ACKNOWLEDGE', 'DCG DATA -CORE SYSTEMS (INDIA)', 'State Bank of India', '765787654657876', '50007545', 1699942990191, 'GRSE', 'vendor@vendor.com'),
(31, '4700013553', '1701327287629-sample.pdf', 'uploads\\sdbg\\1701327287629-sample.pdf', 'Uploading SDBG', 'PENDING', 'VENDOR', 'SBI', '67654678778', '50007545', 1701327287641, 'XYZ Pvt. Ltd', 'aabhinit96@gmail.com'),
(39, '4700013553', '1701427171403-sample.pdf', 'uploads\\sdbg\\1701427171403-sample.pdf', 'Testing jkk', 'PENDING', 'VENDOR', 'SBI', '213456888', '50007545', 1701427171404, 'XYZ Pvt. Ltd', 'aabhinit96@gmail.com'),
(40, '4700013227', '1701428335861-sample.pdf', 'uploads\\sdbg\\1701428335861-sample.pdf', 'Testing file', 'PENDING', 'VENDOR', 'SBI', '21343213422', '50007545', 1701428335863, 'XYZ Pvt. Ltd', 'aabhinit96@gmail.com'),
(41, '4700013227', '1701428488590-sample.pdf', 'uploads\\sdbg\\1701428488590-sample.pdf', 'Approved SDBG', 'ACKNOWLEDGED', 'GRSE', 'SBI', '222222', '600229', 1701428488592, 'GRSE', 'mrinmoygh081@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `pa0000`
--

CREATE TABLE `pa0000` (
  `PERNR` varchar(8) NOT NULL COMMENT 'Key for HR Master Data',
  `SUBTY` varchar(4) DEFAULT NULL COMMENT 'Subtype',
  `OBJPS` varchar(2) DEFAULT NULL COMMENT 'Object Identification',
  `SPRPS` varchar(1) DEFAULT NULL COMMENT 'Lock Indicator for HR Master Data Record',
  `ENDDA` date DEFAULT NULL COMMENT 'Start Date',
  `BEGDA` date DEFAULT NULL COMMENT 'End Date',
  `SEQNR` int(3) DEFAULT NULL COMMENT 'Number of Infotype Record With Same Key',
  `AEDTM` date DEFAULT NULL COMMENT 'Changed On',
  `UNAME` varchar(12) DEFAULT NULL COMMENT 'Name of Person Who Changed Object',
  `MASSN` varchar(2) DEFAULT NULL COMMENT 'Action Type',
  `MASSG` varchar(2) DEFAULT NULL COMMENT 'Reason for Action',
  `STAT1` varchar(1) DEFAULT NULL COMMENT 'Customer-Specific Status',
  `STAT2` varchar(1) DEFAULT NULL COMMENT 'Employment Status',
  `STAT3` varchar(1) DEFAULT NULL COMMENT 'Special Payment Status'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='HR Master Record: Infotype 0000 (Actions)';

--
-- Dumping data for table `pa0000`
--

INSERT INTO `pa0000` (`PERNR`, `SUBTY`, `OBJPS`, `SPRPS`, `ENDDA`, `BEGDA`, `SEQNR`, `AEDTM`, `UNAME`, `MASSN`, `MASSG`, `STAT1`, `STAT2`, `STAT3`) VALUES
('600229', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'ZP', '2', NULL, '3', '1'),
('600231', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'ZP', '2', NULL, '3', '1'),
('600232', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600233', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'ZP', '2', NULL, '3', '1'),
('600252', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'ZP', '2', NULL, '3', '1'),
('600947', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600948', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600949', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600950', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600951', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600953', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1');

-- --------------------------------------------------------

--
-- Table structure for table `pa0001`
--

CREATE TABLE `pa0001` (
  `PERNR` int(8) NOT NULL COMMENT 'Personnel Number',
  `SUBTY` varchar(4) DEFAULT NULL COMMENT 'Subtype',
  `OBJPS` varchar(2) DEFAULT NULL COMMENT 'Object\r\n Identification',
  `SPRPS` varchar(1) DEFAULT NULL COMMENT 'Lock Indicator for\r\n HR Master Data\r\n Record',
  `ENDDA` date DEFAULT NULL COMMENT 'Start Date',
  `BEGDA` date DEFAULT NULL COMMENT 'End Date',
  `SEQNR` int(3) DEFAULT NULL COMMENT 'Number of Infotype\r\n Record with Same\r\n Key',
  `AEDTM` date DEFAULT NULL COMMENT 'Changed On',
  `UNAME` varchar(12) DEFAULT NULL COMMENT 'Name of Person Who Changed Object',
  `BUKRS` varchar(4) DEFAULT NULL COMMENT 'Company Code',
  `WERKS` varchar(4) DEFAULT NULL COMMENT 'Personnel Area',
  `PERSG` varchar(1) DEFAULT NULL COMMENT 'Employee Group',
  `PERSK` varchar(2) DEFAULT NULL COMMENT 'Employee Subgroup',
  `VDSK1` varchar(14) DEFAULT NULL COMMENT 'Organizational Key',
  `GSBER` varchar(4) DEFAULT NULL COMMENT 'Business Area',
  `BTRTL` varchar(4) DEFAULT NULL COMMENT 'Personnel Subarea',
  `ABKRS` varchar(2) DEFAULT NULL COMMENT 'Work Contract',
  `KOSTL` varchar(10) DEFAULT NULL COMMENT 'Cost Center',
  `ORGEH` int(8) DEFAULT NULL COMMENT 'Organizational Unit',
  `PLANS` int(8) DEFAULT NULL COMMENT 'Position'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT=' HR Master Record: Infotype 0001 (Org. Assignment)';

--
-- Dumping data for table `pa0001`
--

INSERT INTO `pa0001` (`PERNR`, `SUBTY`, `OBJPS`, `SPRPS`, `ENDDA`, `BEGDA`, `SEQNR`, `AEDTM`, `UNAME`, `BUKRS`, `WERKS`, `PERSG`, `PERSK`, `VDSK1`, `GSBER`, `BTRTL`, `ABKRS`, `KOSTL`, `ORGEH`, `PLANS`) VALUES
(600229, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600231, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600232, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '474862', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSM', 'NA', 'GRSM', 'GK', '1011172', 50000508, 50039060),
(600233, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600252, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600947, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '474862', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSM', 'NA', 'GRSM', 'GK', '1011172', 50000508, 50039060),
(600948, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '474862', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSM', 'NA', 'GRSM', 'GK', '1011172', 50000508, 50039060),
(600949, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '474862', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSM', 'NA', 'GRSM', 'GK', '1011172', 50000508, 50039060),
(600950, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600951, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600953, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678);

-- --------------------------------------------------------

--
-- Table structure for table `pa0002`
--

CREATE TABLE `pa0002` (
  `PERNR` int(8) NOT NULL COMMENT 'Personnel Number',
  `SUBTY` varchar(4) DEFAULT NULL COMMENT 'Subtype',
  `OBJPS` varchar(2) DEFAULT NULL COMMENT 'Object\r\n Identification',
  `SPRPS` varchar(1) DEFAULT NULL COMMENT 'Lock Indicator for\r\n HR Master Data\r\n Record',
  `ENDDA` date DEFAULT NULL COMMENT 'End Date',
  `BEGDA` date DEFAULT NULL COMMENT 'Start Date',
  `SEQNR` int(3) DEFAULT NULL COMMENT 'Number of Infotype\r\n Record with Same\r\n Key',
  `AEDTM` date DEFAULT NULL COMMENT 'Changed On',
  `UNAME` varchar(12) DEFAULT NULL COMMENT 'Name of Person Who Changed Object',
  `CNAME` varchar(80) DEFAULT NULL COMMENT 'Complete Name',
  `GESCH` varchar(1) DEFAULT NULL COMMENT 'Gender',
  `GBDAT` date DEFAULT NULL COMMENT 'Date of Birth',
  `NATIO` varchar(3) DEFAULT NULL COMMENT 'Nationality'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT=': HR Master Record: Infotype 0002 (Personal Data)';

--
-- Dumping data for table `pa0002`
--

INSERT INTO `pa0002` (`PERNR`, `SUBTY`, `OBJPS`, `SPRPS`, `ENDDA`, `BEGDA`, `SEQNR`, `AEDTM`, `UNAME`, `CNAME`, `GESCH`, `GBDAT`, `NATIO`) VALUES
(60020, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'TAPAS PAL', '1', '0000-00-00', 'IN'),
(493834, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '493834', 'S.K.Naskar', '1', '0000-00-00', 'IN'),
(600201, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'Rabi Teja', '1', '0000-00-00', 'IN'),
(600202, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'Mohit Kumar', '1', '0000-00-00', 'IN'),
(600203, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'Amit Sha', '1', '0000-00-00', 'IN'),
(600229, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', 'HRAHRISOA1', 'RAJENDRA BANERJEE', '1', '0000-00-00', 'IN'),
(600230, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'KAMAL RUIDAS', NULL, NULL, NULL),
(600231, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', 'HRAHRISOA1', 'A RAJA BANERJEE', '1', '0000-00-00', 'IN'),
(600232, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ABHINIT ANAND', NULL, NULL, NULL),
(600233, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'MRINMOY GHOSH', '1', '0000-00-00', 'IN'),
(600947, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'TAMAL SEN', '1', '0000-00-00', 'IN'),
(600948, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', 'HRAHRISOA1', 'JUNIOR PC ROY', '1', '0000-00-00', 'IN'),
(600949, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'SR MRINMOY GHOSH', NULL, NULL, NULL),
(600950, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', 'HRAHRISOA1', 'OM PRAKASH GHOSH', '1', '0000-00-00', 'IN'),
(600951, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ABHINIT RAJ', NULL, NULL, NULL),
(600952, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'MR. MRINMOY GHOSH', '1', '0000-00-00', 'IN'),
(600953, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'TAPAS PAL', '1', '0000-00-00', 'IN');

-- --------------------------------------------------------

--
-- Table structure for table `pa0105`
--

CREATE TABLE `pa0105` (
  `PERNR` int(8) NOT NULL COMMENT 'Personnel Number',
  `SUBTY` varchar(4) DEFAULT NULL COMMENT 'Subtype',
  `OBJPS` varchar(2) DEFAULT NULL COMMENT 'Object Identification',
  `SPRPS` varchar(1) DEFAULT NULL COMMENT 'Lock Indicator for HR Master Data Record',
  `ENDDA` date DEFAULT NULL COMMENT 'End Date',
  `BEGDA` date DEFAULT NULL COMMENT 'Start Date',
  `SEQNR` int(3) DEFAULT NULL COMMENT 'Number of Infotype Record with Same Key',
  `AEDTM` date DEFAULT NULL COMMENT 'Changed On',
  `UNAME` varchar(12) DEFAULT NULL COMMENT 'Name of Person Who Changed Object',
  `USRTY` varchar(4) DEFAULT NULL COMMENT 'Communication Type',
  `USRID` varchar(30) DEFAULT NULL COMMENT 'Communication ID/Number',
  `USRID_LONG` varchar(241) DEFAULT NULL COMMENT 'Communication: Long\r\n Identification/Number'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='HR Master Record: Infotype 0105 (Communications)';

--
-- Dumping data for table `pa0105`
--

INSERT INTO `pa0105` (`PERNR`, `SUBTY`, `OBJPS`, `SPRPS`, `ENDDA`, `BEGDA`, `SEQNR`, `AEDTM`, `UNAME`, `USRTY`, `USRID`, `USRID_LONG`) VALUES
(600229, '0030', NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', 'ERPDM1', '10', NULL, 'BANERJEE.RAJENDRA@GRSE.CO.IN'),
(600229, '0010', NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'CEIL', '8584014353', NULL),
(600230, '0030', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'kamal.ruidas@datacoresystems.co.in'),
(600231, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'arajabanerjee@gmail.com'),
(600232, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'aabhnitandand@gmail.com'),
(600233, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'mrinmoyghosh102@gmail.com'),
(600947, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'tamalsen@gmail.com'),
(600948, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'juniorpcroy@gmail.com'),
(600949, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'srmrinoy@gmail.com'),
(600950, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'omprakash@gmail.com'),
(600951, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'aabhnitanand@gmail.com'),
(600952, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'mrinmoyghosh102@gmail.com'),
(600953, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'tapaspal_tapaspal@gmail.com'),
(600201, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'finance1@gmail.com'),
(600202, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'finance2@gmail.com'),
(600203, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'finance3@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `payment_advice`
--

CREATE TABLE `payment_advice` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `document_type` varchar(40) NOT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_advice`
--

INSERT INTO `payment_advice` (`id`, `purchasing_doc_no`, `vendor_code`, `document_type`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '2100010812', 'V1', 'Gate In Entry', '1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\drawing\\1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'SUBMITTED', 'VENDOR', 1699252952514, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(2, '7800000040', 'V1', 'Goods Receipt', '1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\drawing\\1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'Uploading Drawing', 'SUBMITTED', 'VENDOR', 1699253015750, 'XYZ Pvt. Ltd.', 'XYZ@gmai.com'),
(3, '4700013227', 'V1', 'ICGRN Report', '1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\drawing\\1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'SUBMITTED', 'VENDOR', 1699253037643, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(4, '34567876556', '23114', 'Gate In Entry', '1699598638506-sample.pdf', 'uploads\\drawing\\1699598638506-sample.pdf', 'accepted', 'SUBMITTED', 'GRSE', 1699598638509, 'Abhinit ', '6380');

-- --------------------------------------------------------

--
-- Table structure for table `pf`
--

CREATE TABLE `pf` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `vendor_code` varchar(40) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pf`
--

INSERT INTO `pf` (`id`, `purchasing_doc_no`, `vendor_code`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '2233445', '121313134', '1706871027402-Flow chart- Service PO (1).pdf', 'uploads\\pf\\1706871027402-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706871027407, '493834'),
(2, '2233445', '121313134', '1706871216924-Flow chart- Service PO (1).pdf', 'uploads\\pf\\1706871216924-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706871216929, '493834'),
(3, '2233445', '121313134', '1706871219644-Flow chart- Service PO (1).pdf', 'uploads\\pf\\1706871219644-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706871219651, '493834'),
(4, '2233445', '121313134', '1706871235176-Flow chart- Service PO (1).pdf', 'uploads\\pf\\1706871235176-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706871235179, '493834');

-- --------------------------------------------------------

--
-- Table structure for table `po`
--

CREATE TABLE `po` (
  `po_id` varchar(10) NOT NULL,
  `vendor_id` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `po`
--

INSERT INTO `po` (`po_id`, `vendor_id`) VALUES
('210000006', '50007545'),
('210000007', '00006007');

-- --------------------------------------------------------

--
-- Table structure for table `ppc_wbs_project_code`
--

CREATE TABLE `ppc_wbs_project_code` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `purchasing_doc_no` varchar(12) NOT NULL,
  `wbs_element` varchar(60) NOT NULL,
  `project_code` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ppc_wbs_project_code`
--

INSERT INTO `ppc_wbs_project_code` (`id`, `user_id`, `purchasing_doc_no`, `wbs_element`, `project_code`) VALUES
(1, '600100', '7800000040', '1234', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `privilege`
--

CREATE TABLE `privilege` (
  `id` int(4) NOT NULL,
  `department_id` int(11) NOT NULL,
  `internal_role_id` int(11) NOT NULL,
  `sdbg` varchar(2) NOT NULL,
  `drawing` varchar(2) NOT NULL,
  `qap` varchar(2) NOT NULL,
  `inspectionCallLetter` varchar(2) NOT NULL,
  `shippingDocuments` varchar(2) NOT NULL,
  `gateEntry` varchar(2) NOT NULL,
  `grn` varchar(2) NOT NULL,
  `icgrn` varchar(2) NOT NULL,
  `wdc` varchar(2) NOT NULL,
  `bpgCopy` varchar(2) NOT NULL,
  `checkList` varchar(2) NOT NULL,
  `billRegistration` varchar(2) NOT NULL,
  `paymentVoucher` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privilege`
--

INSERT INTO `privilege` (`id`, `department_id`, `internal_role_id`, `sdbg`, `drawing`, `qap`, `inspectionCallLetter`, `shippingDocuments`, `gateEntry`, `grn`, `icgrn`, `wdc`, `bpgCopy`, `checkList`, `billRegistration`, `paymentVoucher`) VALUES
(1, 1, 1, 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(2, 1, 2, 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(3, 2, 3, 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(4, 3, 1, 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(5, 3, 2, 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R');

-- --------------------------------------------------------

--
-- Table structure for table `qap_save`
--

CREATE TABLE `qap_save` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` text NOT NULL,
  `file_path` text NOT NULL,
  `remarks` text NOT NULL,
  `created_by_id` varchar(50) NOT NULL,
  `created_at` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `qap_submission`
--

CREATE TABLE `qap_submission` (
  `id` int(11) NOT NULL,
  `reference_no` varchar(60) DEFAULT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `assigned_from` varchar(100) DEFAULT NULL,
  `assigned_to` varchar(100) DEFAULT NULL,
  `is_assign` int(11) NOT NULL COMMENT '0 => Not Assigned\r\n1 => Assigned',
  `file_path` varchar(500) DEFAULT NULL,
  `action_type` varchar(100) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) DEFAULT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='QAP Table';

--
-- Dumping data for table `qap_submission`
--

INSERT INTO `qap_submission` (`id`, `reference_no`, `purchasing_doc_no`, `file_name`, `vendor_code`, `assigned_from`, `assigned_to`, `is_assign`, `file_path`, `action_type`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(54, 'QAP-1711455133087-7545', '7800000040', '1711455133085-sample.pdf', '50007545', NULL, NULL, 0, 'uploads\\qap\\1711455133085-sample.pdf', 'UPLOAD QAP File', 'QAP fILE', 'SUBMITTED', 'VENDOR', 1711455133087, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545'),
(55, 'QAP Assigned', '7800000040', NULL, NULL, '600229', '600947', 1, NULL, 'QAP Assigned', 'fhdsk', 'ASSIGNED', 'GRSE', 1711456805342, NULL, '600229'),
(59, 'QAP-1711455133087-7545', '7800000040', NULL, '600947', NULL, NULL, 0, NULL, NULL, 'Approved!!!', 'APPROVED', 'GRSE', 1711458343163, 'TAMAL SEN', '600947');

-- --------------------------------------------------------

--
-- Table structure for table `sdbg`
--

CREATE TABLE `sdbg` (
  `id` int(11) NOT NULL,
  `action_type` varchar(15) NOT NULL,
  `reference_no` varchar(60) DEFAULT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `remarks` text DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `assigned_from` varchar(100) DEFAULT NULL,
  `assigned_to` varchar(100) DEFAULT NULL,
  `last_assigned` int(1) NOT NULL DEFAULT 0,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) DEFAULT NULL,
  `created_by_id` varchar(200) NOT NULL,
  `updated_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `sdbg`
--

INSERT INTO `sdbg` (`id`, `action_type`, `reference_no`, `purchasing_doc_no`, `file_name`, `file_path`, `status`, `remarks`, `vendor_code`, `assigned_from`, `assigned_to`, `last_assigned`, `created_at`, `created_by_name`, `created_by_id`, `updated_by`) VALUES
(1, 'SDBG SUBMISSION', 'SD-1711692203947-7545', '7800000040', '1711692203939-sample.pdf', 'uploads\\submitSDBG\\1711692203939-sample.pdf', 'SUBMITTED', 'Remarks!!!', '50007545', NULL, NULL, 0, 1711692203947, NULL, '50007545', 'VENDOR'),
(2, 'SDBG SUBMISSION', 'SD-1711692203947-7545', '7800000040', '1711692203939-sample.pdf', 'uploads\\submitSDBG\\1711692203939-sample.pdf', 'FORWARD_TO_FINANCE', 'BG entry forwarded to Finance.', '50007545', '493834', NULL, 0, 1711693143306, 'Dealing officer', '493834', 'GRSE'),
(5, 'SDBG APPROVED', 'SD-1711692203947-7545', '7800000040', '1711692203939-sample.pdf', 'uploads\\submitSDBG\\1711692203939-sample.pdf', 'APPROVED', 'APPROVED by Finance Officer', '50007545', '600200', NULL, 0, 1711695827412, 'finance dept', '600200', 'GRSE');

-- --------------------------------------------------------

--
-- Table structure for table `sdbg_acknowledgement`
--

CREATE TABLE `sdbg_acknowledgement` (
  `id` int(11) NOT NULL,
  `sdbg_id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(1) NOT NULL,
  `status_updated_at` bigint(20) NOT NULL,
  `status_updated_by_name` varchar(200) NOT NULL,
  `status_updated_by_id` int(11) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL,
  `create_at_datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at_datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

-- --------------------------------------------------------

--
-- Table structure for table `sdbg_entry`
--

CREATE TABLE `sdbg_entry` (
  `id` int(11) NOT NULL,
  `reference_no` varchar(30) NOT NULL,
  `purchasing_doc_no` varchar(18) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `ifsc_code` varchar(20) NOT NULL,
  `bank_addr1` varchar(255) NOT NULL,
  `bank_addr2` varchar(255) DEFAULT NULL,
  `bank_addr3` varchar(255) DEFAULT NULL,
  `bank_city` varchar(255) DEFAULT NULL,
  `bank_pin_code` varchar(7) DEFAULT NULL,
  `bg_no` varchar(255) NOT NULL,
  `bg_date` bigint(20) NOT NULL,
  `bg_ammount` float NOT NULL,
  `department` varchar(255) NOT NULL,
  `po_date` bigint(20) NOT NULL,
  `yard_no` varchar(255) NOT NULL,
  `validity_date` bigint(20) NOT NULL,
  `claim_priod` varchar(150) NOT NULL,
  `check_list_reference` varchar(200) DEFAULT NULL,
  `check_list_date` bigint(20) NOT NULL,
  `bg_type` varchar(60) DEFAULT NULL,
  `vendor_name` varchar(100) DEFAULT NULL,
  `vendor_address1` text DEFAULT NULL,
  `vendor_address2` text DEFAULT NULL,
  `vendor_address3` text DEFAULT NULL,
  `vendor_city` varchar(60) DEFAULT NULL,
  `vendor_pin_code` varchar(255) DEFAULT NULL,
  `extension_date1` bigint(20) NOT NULL,
  `extension_date2` bigint(20) DEFAULT NULL,
  `extension_date3` bigint(20) DEFAULT NULL,
  `extension_date4` bigint(20) DEFAULT NULL,
  `extension_date5` bigint(20) DEFAULT NULL,
  `extension_date6` bigint(20) DEFAULT NULL,
  `release_date` bigint(20) NOT NULL,
  `demand_notice_date` bigint(20) NOT NULL,
  `entension_letter_date` bigint(20) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='sdbg entry';

--
-- Dumping data for table `sdbg_entry`
--

INSERT INTO `sdbg_entry` (`id`, `reference_no`, `purchasing_doc_no`, `bank_name`, `branch_name`, `ifsc_code`, `bank_addr1`, `bank_addr2`, `bank_addr3`, `bank_city`, `bank_pin_code`, `bg_no`, `bg_date`, `bg_ammount`, `department`, `po_date`, `yard_no`, `validity_date`, `claim_priod`, `check_list_reference`, `check_list_date`, `bg_type`, `vendor_name`, `vendor_address1`, `vendor_address2`, `vendor_address3`, `vendor_city`, `vendor_pin_code`, `extension_date1`, `extension_date2`, `extension_date3`, `extension_date4`, `extension_date5`, `extension_date6`, `release_date`, `demand_notice_date`, `entension_letter_date`, `status`, `created_at`, `created_by`) VALUES
(1, 'SD-1711692203947-7545', '7800000040', 'SBI', 'SBIN0012572', '', 'PATHAKPARA', NULL, NULL, 'MILKI', '732209', '123456', 1712341800, 6000, '', 20230910000000, '20', 1715106600, '1714069800', 'SD-1711692203947-7545', 1711693143279, 'SDBG', 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'BG Block', NULL, NULL, 'KOLKATA', '700091', 0, 0, 0, 0, NULL, NULL, 0, 0, 0, 'FORWARD_TO_FINANCE', 1711693143279, '493834');

-- --------------------------------------------------------

--
-- Table structure for table `sdbg_return_submisson`
--

CREATE TABLE `sdbg_return_submisson` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_documents`
--

CREATE TABLE `shipping_documents` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_type_id` int(3) NOT NULL,
  `file_type_name` varchar(255) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping_documents`
--

INSERT INTO `shipping_documents` (`id`, `purchasing_doc_no`, `file_name`, `file_type_id`, `file_type_name`, `vendor_code`, `file_path`, `remarks`, `updated_by`, `created_at`, `created_by_id`) VALUES
(31, '7800000040', '1711455240082-sample.pdf', 0, 'Invoice', '50007545', 'uploads\\shippingDocuments\\1711455240082-sample.pdf', 'Invoice Upload', 'VENDOR', 1711455240083, '50007545'),
(32, '7800000047', NULL, 0, 'REQUESTED to VENDOR', '600500', NULL, 'Please upload your invoice!', 'GRSE', 1711615951571, '600500');

-- --------------------------------------------------------

--
-- Table structure for table `store_gate`
--

CREATE TABLE `store_gate` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `acc_no` varchar(20) NOT NULL,
  `gate_date` varchar(25) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `created_by_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_gate`
--

INSERT INTO `store_gate` (`id`, `purchasing_doc_no`, `acc_no`, `gate_date`, `file_name`, `file_path`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '7800000040', 'ACC3232', '2024-03-28', '', '', '', '2024-03-28', '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `store_grn`
--

CREATE TABLE `store_grn` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `grn_no` varchar(20) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `created_by_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_grn`
--

INSERT INTO `store_grn` (`id`, `purchasing_doc_no`, `grn_no`, `file_name`, `file_path`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '7800000040', 'grn5678', '', '', '', '2024-03-28', '50007546'),
(2, '7800000040', 'grn5671', '', '', '', '2024-03-28', '50007547'),
(3, '7800000040', 'grn5672', '', '', '', '2024-03-28', '50007541');

-- --------------------------------------------------------

--
-- Table structure for table `store_icgrn`
--

CREATE TABLE `store_icgrn` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `icgrn_no` varchar(20) NOT NULL,
  `icgrn_value` varchar(12) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `created_by_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_icgrn`
--

INSERT INTO `store_icgrn` (`id`, `purchasing_doc_no`, `icgrn_no`, `icgrn_value`, `file_name`, `file_path`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '7800000040', 'icgrn2255', '23000', '', '', '', '2024-03-28', '50007545'),
(2, '7800000040', 'icgrn2256', '230009', '', '', '', '2024-03-28', '50007578'),
(3, '7800000040', 'icgrn2252', '45000', '', '', '', '2024-03-28', '50007546');

-- --------------------------------------------------------

--
-- Table structure for table `sub_dept`
--

CREATE TABLE `sub_dept` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_dept`
--

INSERT INTO `sub_dept` (`id`, `name`) VALUES
(1, 'Hull'),
(2, 'Electrical'),
(3, 'Machinery'),
(4, 'Plumbing');

-- --------------------------------------------------------

--
-- Table structure for table `tnc_minutes`
--

CREATE TABLE `tnc_minutes` (
  `id` int(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(500) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(50) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tnc_minutes`
--

INSERT INTO `tnc_minutes` (`id`, `file_name`, `file_path`, `file_type`, `created_at`, `created_by_id`, `purchasing_doc_no`) VALUES
(1, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706177473483, '50007545', '8765678900'),
(2, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706178440432, '50007545', '8765678900'),
(3, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706178444776, '50007545', '8765678900'),
(4, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706178507219, '50007545', '8765678900'),
(5, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706178593666, '50007545', '8765678900'),
(6, '7800000040.pdf', 'uploads\\tncminutes\\7800000040.pdf', 'application/pdf', 1706607258188, '600200', '7800000040'),
(7, '7800000047.pdf', 'uploads\\tncminutes\\7800000047.pdf', 'application/pdf', 1710316253852, '493834', '7800000047');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(4) NOT NULL,
  `user_type_id` int(4) NOT NULL,
  `ven_bill_submit` smallint(1) NOT NULL,
  `ven_bill_show` smallint(1) NOT NULL,
  `ven_bill_edit` smallint(1) NOT NULL,
  `ven_bill_received` smallint(1) NOT NULL,
  `ven_bill_certified` smallint(1) NOT NULL,
  `ven_bill_forward` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `user_type_id`, `ven_bill_submit`, `ven_bill_show`, `ven_bill_edit`, `ven_bill_received`, `ven_bill_certified`, `ven_bill_forward`) VALUES
(1, 1, 1, 1, 1, 0, 0, 0),
(2, 2, 0, 0, 0, 1, 1, 1),
(3, 3, 0, 0, 0, 1, 1, 1),
(4, 4, 0, 0, 0, 1, 1, 1),
(5, 5, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(4) NOT NULL,
  `user_type` varchar(60) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='user type';

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `user_type`, `created_at`, `updated_at`) VALUES
(1, 'VENDOR', 1697106743, 1697106743),
(2, 'GRSE_DEPARTMENT', 1697106743, 1697106743),
(3, 'GRSE_BANKING', 1697106743, 1697106743),
(4, 'GRSE_FINANCE', 1697106743, 1697106743),
(5, 'ADMIN', 1697192466, 1697192466);

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `vendor_id` varchar(25) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(86) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`vendor_id`, `first_name`, `last_name`, `email`) VALUES
('00006007', 'Abhinit', 'Anand', 'abhinit.anand@datacoresystems.co.in'),
('00006008', 'Kamal', 'Ruidas', 'kamal.ruidas@datacoresystems.co.in'),
('50007545', 'Mrinmoy', 'Ghosh', 'mrinmoygh081@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_activities`
--

CREATE TABLE `vendor_activities` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) DEFAULT NULL,
  `action_type` varchar(40) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor_activities`
--

INSERT INTO `vendor_activities` (`id`, `purchasing_doc_no`, `action_type`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_id`) VALUES
(5, '7800000040', 'UPLOAD INSURANCE COVERAGE', '1711455284602-sample.pdf', 'uploads\\vendorActivities\\1711455284602-sample.pdf', 'IC Upload!', 'SUBMITTED', 'VENDOR', 1711455284604, '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `wbs`
--

CREATE TABLE `wbs` (
  `wbs_id` varchar(11) NOT NULL,
  `project_code` varchar(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wbs`
--

INSERT INTO `wbs` (`wbs_id`, `project_code`, `purchasing_doc_no`) VALUES
('W1', 'P1', '4700013227'),
('W1', 'P1', '4800008195'),
('W2', 'P2', '4700016027'),
('W2', 'P2', '4800011669'),
('W1', 'P1', '7800000040'),
('2099656', '7656890', '7800000041');

-- --------------------------------------------------------

--
-- Table structure for table `wdc`
--

CREATE TABLE `wdc` (
  `id` int(11) NOT NULL,
  `reference_no` varchar(60) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `action_type` varchar(10) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `wdc_date` bigint(20) DEFAULT NULL,
  `po_line_iten_no` varchar(100) NOT NULL,
  `job_location` varchar(200) NOT NULL,
  `yard_no` varchar(60) NOT NULL,
  `actual_start_date` bigint(20) NOT NULL,
  `actual_completion_date` bigint(20) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `messurment` varchar(30) NOT NULL,
  `quantity` int(11) NOT NULL,
  `entry_by_production` varchar(60) DEFAULT NULL,
  `stage_datiels` text DEFAULT NULL,
  `actual_payable_amount` int(11) DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wdc`
--

INSERT INTO `wdc` (`id`, `reference_no`, `purchasing_doc_no`, `action_type`, `file_name`, `vendor_code`, `file_path`, `remarks`, `status`, `wdc_date`, `po_line_iten_no`, `job_location`, `yard_no`, `actual_start_date`, `actual_completion_date`, `unit`, `messurment`, `quantity`, `entry_by_production`, `stage_datiels`, `actual_payable_amount`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(11, 'WDC-1711455336825-7545', '7800000040', 'WDC', '1711455336821-sample.pdf', '50007545', 'uploads\\submitWdc\\1711455336821-sample.pdf', 'Demo Remarks!', 'SUBMITTED', 1711455336, '40', '30', '20', 1709231400, 1709317800, '4000', 'Meter', 20, NULL, NULL, NULL, 'VENDOR', 1711455336825, '', '50007545'),
(12, 'JCC-1711455389309-7545', '7800000040', 'JCC', '1711455389307-sample.pdf', '50007545', 'uploads\\submitWdc\\1711455389307-sample.pdf', 'Testing 2', 'SUBMITTED', 1711455389, '50', 'Testing', '20', 1711650600, 1712341800, '20', 'Meter', 5, NULL, NULL, NULL, 'VENDOR', 1711455389309, '', '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `wmc`
--

CREATE TABLE `wmc` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `document_type` varchar(40) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wmc`
--

INSERT INTO `wmc` (`id`, `purchasing_doc_no`, `document_type`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '2233445', '1', '1706867143873-Flow chart- Service PO (1).pdf', 'uploads\\wmc\\1706867143873-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706867143939, '493834'),
(2, '2233445', '1', '1706867725693-Flow chart- Service PO (1).pdf', 'uploads\\wmc\\1706867725693-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706867725698, '493834'),
(3, '2233445', '1', '1706867726733-Flow chart- Service PO (1).pdf', 'uploads\\wmc\\1706867726733-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706867726738, '493834'),
(4, '2233445', '1', '1706867727642-Flow chart- Service PO (1).pdf', 'uploads\\wmc\\1706867727642-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706867727645, '493834'),
(5, '7800000047', 'Upload WMC', NULL, NULL, NULL, 'PENDING', 'VENDOR', 1708850885348, '50007545'),
(6, '7800000047', 'Upload WMC', '1708851093778-SAP_PO.pdf', 'uploads\\wmc\\1708851093778-SAP_PO.pdf', NULL, 'PENDING', 'VENDOR', 1708851093782, '50007545'),
(7, '7800000047', 'Upload WMC', NULL, NULL, 'dfa', 'PENDING', 'VENDOR', 1708851170371, '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `zbtsd`
--

CREATE TABLE `zbtsd` (
  `SRNO` varchar(2) NOT NULL COMMENT 'Serial No',
  `MANNO` int(8) NOT NULL COMMENT 'GRSE MAN NO'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zbtsf`
--

CREATE TABLE `zbtsf` (
  `SRNO` varchar(2) NOT NULL COMMENT 'Serial No',
  `MANNO` int(8) NOT NULL COMMENT 'GRSE MAN NO'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Excemption List for Department Forward (Finanance MAN No)';

-- --------------------------------------------------------

--
-- Table structure for table `zbtsg`
--

CREATE TABLE `zbtsg` (
  `ZBTNO` varchar(11) NOT NULL COMMENT 'Bill Tracking Number',
  `ZGRNO` varchar(2) NOT NULL COMMENT 'Vendor BTS GR or Service No',
  `VGABE` varchar(1) DEFAULT NULL COMMENT 'Transaction/event type, purchase order history',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document',
  `MBLNR` varchar(10) DEFAULT NULL COMMENT 'Number of Material Document',
  `MJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `LBLNI` varchar(10) DEFAULT NULL COMMENT 'Entry Sheet Number',
  `AUGBL` varchar(10) DEFAULT NULL COMMENT 'Document Number of the Clearing Document',
  `OTHER` varchar(50) DEFAULT NULL COMMENT 'Other Receive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Vendor Bill Tracking GR, Service Sheet, MIRO';

--
-- Dumping data for table `zbtsg`
--

INSERT INTO `zbtsg` (`ZBTNO`, `ZGRNO`, `VGABE`, `EBELN`, `EBELP`, `MBLNR`, `MJAHR`, `LBLNI`, `AUGBL`, `OTHER`) VALUES
('20230929001', 'AB', 'X', '89293', 883, '003', 883, '9983', '7839', '3993'),
('20230929001', 'AB', 'X', '89293', 883, '003', 883, '9983', '7839', '3993'),
('20230929001', 'AB', 'X', '89293', 883, '003', 883, '9983', '7839', '3993'),
('20230929001', 'AB', 'X', '89293', 883, '003', 883, '9983', '7839', '3993'),
('5000231739', '', '', '7800000040', 10, '', 0, '1000127607', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `zbtsi`
--

CREATE TABLE `zbtsi` (
  `ZBTNO` varchar(11) NOT NULL COMMENT 'Bill Tracking Number',
  `ZGRNO` varchar(2) DEFAULT NULL COMMENT 'Vendor BTS GR or Service No',
  `ZIVNO` varchar(2) DEFAULT NULL COMMENT '	Vendor BTS Invoice Verification No',
  `BELNR` varchar(10) DEFAULT NULL COMMENT 'Document Number of an Invoice Document',
  `GJAHR` int(4) DEFAULT NULL COMMENT 'Fiscal Year',
  `AUGBL` varchar(10) DEFAULT NULL COMMENT 'Document Number of the Clearing Document'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Not Used Vendor Bill Tracking MIRO and Invoice Verification';

-- --------------------------------------------------------

--
-- Table structure for table `zbtsm`
--

CREATE TABLE `zbtsm` (
  `MANTD` varchar(3) DEFAULT NULL,
  `ZBTNO` varchar(11) NOT NULL COMMENT '	Bill Tracking Number',
  `SRNO` varchar(2) DEFAULT NULL COMMENT 'Serial No',
  `MANNO` int(8) DEFAULT NULL COMMENT 'GRSE MAN NO',
  `ZSECTION` varchar(1) DEFAULT NULL COMMENT 'GRSE BTS SECTION',
  `RMK` varchar(140) DEFAULT NULL COMMENT 'Remarks',
  `ERDAT` date DEFAULT current_timestamp() COMMENT 'Date on Which Record Was Created',
  `ERZET` time DEFAULT current_timestamp() COMMENT 'Entry time',
  `ERNAM` varchar(12) DEFAULT NULL COMMENT 'Name of Person who Created the Object',
  `DRETSEQ` varchar(10) DEFAULT NULL COMMENT '	Department Return Sequence',
  `ALERT_STATUS` varchar(1) DEFAULT NULL COMMENT 'BTS Email Alert Status'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='ZBTSM table (SAP TABLE COPY)';

--
-- Dumping data for table `zbtsm`
--

INSERT INTO `zbtsm` (`MANTD`, `ZBTNO`, `SRNO`, `MANNO`, `ZSECTION`, `RMK`, `ERDAT`, `ERZET`, `ERNAM`, `DRETSEQ`, `ALERT_STATUS`) VALUES
('NA', '20230920001', '1', 600229, '1', NULL, '0000-00-00', '13:23:49', 'DCG1', NULL, NULL),
('NA', '20230920001', '2', 600229, '2', NULL, '0000-00-00', '13:25:44', 'DCG1', NULL, NULL),
('NA', '20230920001', '3', 600229, '2', NULL, '0000-00-00', '10:28:08', 'DCG1', NULL, NULL),
('NA', '20230920001', '4', 600947, '2', NULL, '0000-00-00', '10:28:51', 'DCG1', NULL, NULL),
(NULL, '20230920001', 'N', 0, '1', 'REMARKS', '2023-10-03', '15:32:21', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', 'N/', 0, '1', 'REMARKS', '2023-10-03', '15:30:14', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:36:46', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:36:47', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:38:40', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:40:26', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:40:43', 'LOGIN USER N', '1', 'O');

-- --------------------------------------------------------

--
-- Table structure for table `zmilestone`
--

CREATE TABLE `zmilestone` (
  `MANDT` int(3) NOT NULL COMMENT 'Client',
  `MID` char(3) NOT NULL COMMENT 'Milestone Id',
  `MTEXT` char(60) NOT NULL COMMENT 'Milestone Text'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zpo_milestone`
--

CREATE TABLE `zpo_milestone` (
  `MANDT` int(3) NOT NULL COMMENT 'Client',
  `EBELN` char(10) NOT NULL COMMENT 'Purchasing Document Number',
  `MID` char(3) NOT NULL COMMENT 'Milestone Id',
  `MTEXT` char(60) NOT NULL COMMENT 'Milestone Text',
  `PLAN_DATE` bigint(20) NOT NULL,
  `MO` char(1) NOT NULL COMMENT 'Mandatory/optional'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zpo_milestone`
--

INSERT INTO `zpo_milestone` (`MANDT`, `EBELN`, `MID`, `MTEXT`, `PLAN_DATE`, `MO`) VALUES
(0, 'QQ00013227', '1', 'CONTRACTUAL SDBG/IB SUBMISSION DATE', 1699255657917, 'M'),
(0, 'QQ00013227', '3', 'CONTRACTUAL QAP SUBMISSION DATE', 1699255657917, 'O'),
(1, '1702446752', '2', 'CONTRACTUAL DRAWING SUBMISSION DATE', 1702446752, 'O'),
(1, '4700013227', '1', 'CONTRACTUAL SDBG/IB SUBMISSION DATE', 1699255657917, 'M'),
(1, '4700013227', '2', 'CONTRACTUAL DRAWING SUBMISSION DATE', 1699255657917, 'M'),
(1, '4700013227', '3', 'CONTRACTUAL QAP SUBMISSION DATE', 1699255657917, 'M'),
(1, '4700013553', '1', 'CONTRACTUAL SDBG/IB SUBMISSION DATE', 1699255657917, 'M'),
(1, '4700013553', '2', 'CONTRACTUAL DRAWING SUBMISSION DATE', 1699255657917, 'M'),
(1, '4700013553', '3', 'CONTRACTUAL QAP SUBMISSION DATE', 1699255657917, 'M'),
(1, '7800000040', '1', 'CONTRACTUAL SDBG/IB SUBMISSION DATE', 1699255657917, 'M'),
(1, '7800000040', '2', 'CONTRACTUAL DRAWING SUBMISSION DATE', 1699255657917, 'O'),
(1, '7800000040', '3', 'CONTRACTUAL QAP SUBMISSION DATE', 1699255657917, 'M'),
(1, '7800000040', '4', 'CONTRACTUAL ILMS SUBMISSION DATE', 1699255657917, 'M'),
(1, '7800000047', '1', 'CONTRACTUAL SDBG/IB SUBMISSION DATE', 1702446752000, 'M'),
(1, '7800000047', '2', 'CONTRACTUAL DRAWING SUBMISSION DATE', 1703742752000, 'O'),
(1, '7800000047', '3', 'CONTRACTUAL QAP SUBMISSION DATE', 1705038752000, 'M'),
(1, '7800000047', '4', 'CONTRACTUAL ILMS SUBMISSION DATE', 1706075552000, 'M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actualsubmissiondate`
--
ALTER TABLE `actualsubmissiondate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `billing_officers`
--
ALTER TABLE `billing_officers`
  ADD PRIMARY KEY (`officer_id`);

--
-- Indexes for table `bill_registration`
--
ALTER TABLE `bill_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `btn`
--
ALTER TABLE `btn`
  ADD PRIMARY KEY (`btn_num`);

--
-- Indexes for table `demande_management`
--
ALTER TABLE `demande_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department_wise_log`
--
ALTER TABLE `department_wise_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `depertment_master`
--
ALTER TABLE `depertment_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drawing`
--
ALTER TABLE `drawing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ekko`
--
ALTER TABLE `ekko`
  ADD PRIMARY KEY (`EBELN`);

--
-- Indexes for table `emp_department_list`
--
ALTER TABLE `emp_department_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hr`
--
ALTER TABLE `hr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hr_compliance`
--
ALTER TABLE `hr_compliance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ilms`
--
ALTER TABLE `ilms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inspection_call_letter`
--
ALTER TABLE `inspection_call_letter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inspection_release_note`
--
ALTER TABLE `inspection_release_note`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `internal_role_master`
--
ALTER TABLE `internal_role_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lfa1`
--
ALTER TABLE `lfa1`
  ADD PRIMARY KEY (`LIFNR`);

--
-- Indexes for table `lfa1_old`
--
ALTER TABLE `lfa1_old`
  ADD PRIMARY KEY (`LIFNR`);

--
-- Indexes for table `makt`
--
ALTER TABLE `makt`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mara`
--
ALTER TABLE `mara`
  ADD PRIMARY KEY (`MATNR`);

--
-- Indexes for table `mrs`
--
ALTER TABLE `mrs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mseg`
--
ALTER TABLE `mseg`
  ADD PRIMARY KEY (`MBLNR`);

--
-- Indexes for table `new_auth`
--
ALTER TABLE `new_auth`
  ADD PRIMARY KEY (`auth_id`);

--
-- Indexes for table `new_payments`
--
ALTER TABLE `new_payments`
  ADD PRIMARY KEY (`sl_no`);

--
-- Indexes for table `new_sdbg`
--
ALTER TABLE `new_sdbg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pa0000`
--
ALTER TABLE `pa0000`
  ADD PRIMARY KEY (`PERNR`);

--
-- Indexes for table `pa0001`
--
ALTER TABLE `pa0001`
  ADD PRIMARY KEY (`PERNR`);

--
-- Indexes for table `pa0002`
--
ALTER TABLE `pa0002`
  ADD PRIMARY KEY (`PERNR`);

--
-- Indexes for table `payment_advice`
--
ALTER TABLE `payment_advice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pf`
--
ALTER TABLE `pf`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `po`
--
ALTER TABLE `po`
  ADD PRIMARY KEY (`po_id`);

--
-- Indexes for table `ppc_wbs_project_code`
--
ALTER TABLE `ppc_wbs_project_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privilege`
--
ALTER TABLE `privilege`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qap_save`
--
ALTER TABLE `qap_save`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qap_submission`
--
ALTER TABLE `qap_submission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdbg`
--
ALTER TABLE `sdbg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdbg_acknowledgement`
--
ALTER TABLE `sdbg_acknowledgement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdbg_entry`
--
ALTER TABLE `sdbg_entry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdbg_return_submisson`
--
ALTER TABLE `sdbg_return_submisson`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_documents`
--
ALTER TABLE `shipping_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_gate`
--
ALTER TABLE `store_gate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_grn`
--
ALTER TABLE `store_grn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_icgrn`
--
ALTER TABLE `store_icgrn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_dept`
--
ALTER TABLE `sub_dept`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tnc_minutes`
--
ALTER TABLE `tnc_minutes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vendor_id`);

--
-- Indexes for table `vendor_activities`
--
ALTER TABLE `vendor_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wdc`
--
ALTER TABLE `wdc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wmc`
--
ALTER TABLE `wmc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zbtsi`
--
ALTER TABLE `zbtsi`
  ADD PRIMARY KEY (`ZBTNO`),
  ADD UNIQUE KEY `ZGRNO` (`ZGRNO`);

--
-- Indexes for table `zmilestone`
--
ALTER TABLE `zmilestone`
  ADD PRIMARY KEY (`MANDT`,`MID`);

--
-- Indexes for table `zpo_milestone`
--
ALTER TABLE `zpo_milestone`
  ADD PRIMARY KEY (`MANDT`,`EBELN`,`MID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actualsubmissiondate`
--
ALTER TABLE `actualsubmissiondate`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `bill_registration`
--
ALTER TABLE `bill_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `demande_management`
--
ALTER TABLE `demande_management`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `department_wise_log`
--
ALTER TABLE `department_wise_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=600259;

--
-- AUTO_INCREMENT for table `depertment_master`
--
ALTER TABLE `depertment_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `drawing`
--
ALTER TABLE `drawing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `emp_department_list`
--
ALTER TABLE `emp_department_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `hr`
--
ALTER TABLE `hr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hr_compliance`
--
ALTER TABLE `hr_compliance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ilms`
--
ALTER TABLE `ilms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `inspection_call_letter`
--
ALTER TABLE `inspection_call_letter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inspection_release_note`
--
ALTER TABLE `inspection_release_note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `internal_role_master`
--
ALTER TABLE `internal_role_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `makt`
--
ALTER TABLE `makt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mrs`
--
ALTER TABLE `mrs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `new_auth`
--
ALTER TABLE `new_auth`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `new_payments`
--
ALTER TABLE `new_payments`
  MODIFY `sl_no` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `new_sdbg`
--
ALTER TABLE `new_sdbg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `payment_advice`
--
ALTER TABLE `payment_advice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pf`
--
ALTER TABLE `pf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ppc_wbs_project_code`
--
ALTER TABLE `ppc_wbs_project_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `privilege`
--
ALTER TABLE `privilege`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `qap_save`
--
ALTER TABLE `qap_save`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `qap_submission`
--
ALTER TABLE `qap_submission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `sdbg`
--
ALTER TABLE `sdbg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sdbg_acknowledgement`
--
ALTER TABLE `sdbg_acknowledgement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sdbg_entry`
--
ALTER TABLE `sdbg_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sdbg_return_submisson`
--
ALTER TABLE `sdbg_return_submisson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping_documents`
--
ALTER TABLE `shipping_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `store_gate`
--
ALTER TABLE `store_gate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `store_grn`
--
ALTER TABLE `store_grn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `store_icgrn`
--
ALTER TABLE `store_icgrn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sub_dept`
--
ALTER TABLE `sub_dept`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tnc_minutes`
--
ALTER TABLE `tnc_minutes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vendor_activities`
--
ALTER TABLE `vendor_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `wdc`
--
ALTER TABLE `wdc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `wmc`
--
ALTER TABLE `wmc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
