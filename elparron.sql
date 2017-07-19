-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2017 a las 21:49:35
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `elparron`
--
CREATE DATABASE IF NOT EXISTS `elparron` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `elparron`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `masasabor`
--

CREATE TABLE `masasabor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `masasabor`
--

INSERT INTO `masasabor` (`id`, `nombre`) VALUES
(1, 'Blanco'),
(2, 'Chocolate'),
(3, 'Nuez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `masatipo`
--

CREATE TABLE `masatipo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `masatipo`
--

INSERT INTO `masatipo` (`id`, `nombre`) VALUES
(1, 'Bizcocho'),
(2, 'Hoja'),
(3, 'Merengue'),
(4, 'Panqueque');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `solicitante` varchar(200) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `fechaEntrega` datetime NOT NULL,
  `sucursalRetiro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `torta_id`, `solicitante`, `telefono`, `tamano_id`, `precio`, `fechaEntrega`, `sucursalRetiro`) VALUES
(8, 1, 'Pablo Mendez', '821235645', 2, 5000, '2017-05-30 07:00:00', 4),
(10, 3, 'Jose Ca?as', '54321', 1, 5000, '2017-05-06 12:35:56', 1),
(15, 1, 'qas', '21321', 1, 1000, '2017-06-01 13:09:00', 1),
(16, 1, 'pedro', '52165232', 4, 5000, '2017-06-01 13:24:00', 1),
(19, 1, 'Rollo', '76258215', 2, 10000, '2017-06-07 03:49:00', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precio`
--

CREATE TABLE `precio` (
  `id` int(11) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `precio`
--

INSERT INTO `precio` (`id`, `precio`) VALUES
(1, 10000),
(2, 20000),
(3, 30000),
(4, 40000),
(5, 50000),
(6, 60000),
(7, 70000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sabor`
--

CREATE TABLE `sabor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `sabor`
--

INSERT INTO `sabor` (`id`, `nombre`) VALUES
(1, 'Piña'),
(2, 'Lúcuma'),
(3, 'Nuez'),
(4, 'Frambuesa'),
(5, 'Chocolate'),
(6, 'Solo manjar'),
(7, 'Vainilla'),
(8, 'Chantilly');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semanacab`
--

CREATE TABLE `semanacab` (
  `id` int(11) NOT NULL,
  `dia` int(11) NOT NULL,
  `sucursal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `semanacab`
--

INSERT INTO `semanacab` (`id`, `dia`, `sucursal_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 1),
(6, 2, 2),
(7, 2, 3),
(8, 2, 4),
(9, 3, 1),
(10, 3, 2),
(11, 3, 3),
(12, 3, 4),
(13, 4, 1),
(14, 4, 2),
(15, 4, 3),
(16, 4, 4),
(17, 5, 1),
(18, 5, 2),
(19, 5, 3),
(20, 5, 4),
(21, 6, 1),
(22, 6, 2),
(23, 6, 3),
(24, 6, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semanadet`
--

CREATE TABLE `semanadet` (
  `id` int(11) NOT NULL,
  `semanaCab_id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `semanadet`
--

INSERT INTO `semanadet` (`id`, `semanaCab_id`, `torta_id`, `tamano_id`, `cantidad`) VALUES
(1, 1, 1, 1, 4),
(2, 1, 1, 2, 8),
(3, 1, 1, 3, 6),
(4, 1, 1, 4, 4),
(5, 1, 2, 1, 6),
(6, 1, 2, 2, 5),
(7, 1, 2, 3, 4),
(8, 1, 2, 4, 5),
(9, 1, 3, 1, 3),
(10, 1, 3, 2, 4),
(11, 1, 3, 3, 5),
(12, 1, 3, 4, 5),
(13, 1, 4, 1, 5),
(14, 1, 4, 2, 3),
(15, 1, 4, 3, 6),
(16, 1, 4, 4, 4),
(17, 1, 5, 1, 4),
(18, 1, 5, 2, 4),
(19, 1, 5, 3, 4),
(20, 1, 5, 4, 4),
(21, 1, 6, 1, 4),
(22, 1, 6, 2, 4),
(23, 1, 6, 3, 4),
(24, 1, 6, 4, 4),
(25, 1, 7, 1, 4),
(26, 1, 7, 2, 4),
(27, 1, 7, 3, 4),
(28, 1, 7, 4, 4),
(29, 1, 8, 1, 4),
(30, 1, 8, 2, 4),
(31, 1, 8, 3, 4),
(32, 1, 8, 4, 4),
(33, 1, 9, 1, 4),
(34, 1, 9, 2, 4),
(35, 1, 9, 3, 4),
(36, 1, 9, 4, 4),
(37, 1, 10, 1, 4),
(38, 1, 10, 2, 4),
(39, 1, 10, 3, 4),
(40, 1, 10, 4, 4),
(41, 1, 11, 1, 4),
(42, 1, 11, 2, 4),
(43, 1, 11, 3, 4),
(44, 1, 11, 4, 4),
(45, 7, 1, 1, 4),
(46, 7, 1, 2, 8),
(47, 7, 1, 3, 6),
(48, 7, 1, 4, 4),
(49, 7, 2, 1, 6),
(50, 7, 2, 2, 5),
(51, 7, 2, 3, 4),
(52, 7, 2, 4, 5),
(53, 7, 3, 1, 3),
(54, 7, 3, 2, 4),
(55, 7, 3, 3, 5),
(56, 7, 3, 4, 5),
(57, 7, 4, 1, 5),
(58, 7, 4, 2, 3),
(59, 7, 4, 3, 6),
(60, 7, 4, 4, 4),
(61, 7, 5, 1, 4),
(62, 7, 5, 2, 4),
(63, 7, 5, 3, 4),
(64, 7, 5, 4, 4),
(65, 7, 6, 1, 4),
(66, 7, 6, 2, 4),
(67, 7, 6, 3, 4),
(68, 7, 6, 4, 4),
(69, 7, 7, 1, 4),
(70, 7, 7, 2, 4),
(71, 7, 7, 3, 4),
(72, 7, 7, 4, 4),
(73, 7, 8, 1, 4),
(74, 7, 8, 2, 4),
(75, 7, 8, 3, 4),
(76, 7, 8, 4, 4),
(77, 7, 9, 1, 4),
(78, 7, 9, 2, 4),
(79, 7, 9, 3, 4),
(80, 7, 9, 4, 4),
(81, 7, 10, 1, 4),
(82, 7, 10, 2, 4),
(83, 7, 10, 3, 4),
(84, 7, 10, 4, 4),
(85, 7, 11, 1, 4),
(86, 7, 11, 2, 4),
(87, 7, 11, 3, 4),
(88, 7, 11, 4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `comuna` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `sucursal`
--

INSERT INTO `sucursal` (`id`, `nombre`, `direccion`, `comuna`) VALUES
(1, 'La Cisterna', 'Gran Avenida 7960 (Paradero 21)', 'La Cisterna'),
(2, 'La Florida', 'Serafín Zamora 46', 'La Florida'),
(3, 'Maipú', 'Gonzalo Pérez Llona 138', 'Maipú'),
(4, 'San Bernardo', 'Arturo Pratt 668', 'San Bernardo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tamano`
--

CREATE TABLE `tamano` (
  `id` int(11) NOT NULL,
  `num` varchar(20) NOT NULL,
  `personas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `tamano`
--

INSERT INTO `tamano` (`id`, `num`, `personas`) VALUES
(1, '1/2', 6),
(2, '1', 12),
(3, '2', 18),
(4, '3', 24),
(5, '4', 30),
(6, '5', 40),
(7, '6', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torta`
--

CREATE TABLE `torta` (
  `id` int(11) NOT NULL,
  `masaTipo_id` int(11) NOT NULL,
  `masaSabor_id` int(11) NOT NULL,
  `sabor_id` int(11) NOT NULL,
  `imagen` text CHARACTER SET latin1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `torta`
--

INSERT INTO `torta` (`id`, `masaTipo_id`, `masaSabor_id`, `sabor_id`, `imagen`) VALUES
(1, 1, 1, 1, NULL),
(2, 1, 1, 2, NULL),
(3, 1, 3, 3, NULL),
(4, 1, 1, 4, NULL),
(5, 1, 1, 5, NULL),
(6, 1, 1, 6, NULL),
(7, 2, 1, 8, NULL),
(8, 2, 1, 2, NULL),
(9, 2, 1, 3, NULL),
(10, 2, 1, 7, NULL),
(11, 2, 1, 6, NULL),
(12, 3, 2, 7, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tortaprecio`
--

CREATE TABLE `tortaprecio` (
  `id` int(11) NOT NULL,
  `torta_id` int(11) NOT NULL,
  `tamano_id` int(11) NOT NULL,
  `precio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `tortaprecio`
--

INSERT INTO `tortaprecio` (`id`, `torta_id`, `tamano_id`, `precio_id`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3),
(4, 1, 4, 4),
(5, 1, 5, 5),
(6, 1, 6, 6),
(7, 1, 7, 7),
(8, 2, 1, 1),
(9, 2, 2, 2),
(10, 2, 3, 3),
(11, 2, 4, 4),
(12, 2, 5, 5),
(13, 2, 6, 6),
(14, 2, 7, 7),
(15, 3, 1, 1),
(16, 3, 2, 2),
(17, 3, 3, 3),
(18, 3, 4, 4),
(19, 3, 5, 5),
(20, 3, 6, 6),
(21, 3, 7, 7),
(22, 4, 1, 1),
(23, 4, 2, 2),
(24, 4, 3, 3),
(25, 4, 4, 4),
(26, 4, 5, 5),
(27, 4, 6, 6),
(28, 4, 7, 7),
(29, 5, 1, 1),
(30, 5, 2, 2),
(31, 5, 3, 3),
(32, 5, 4, 4),
(33, 5, 5, 5),
(34, 5, 6, 6),
(35, 5, 7, 7),
(36, 6, 1, 1),
(37, 6, 2, 2),
(38, 6, 3, 3),
(39, 6, 4, 4),
(40, 6, 5, 5),
(41, 6, 6, 6),
(42, 6, 7, 7),
(43, 7, 1, 1),
(44, 7, 2, 2),
(45, 7, 3, 3),
(46, 7, 4, 4),
(47, 7, 5, 5),
(48, 7, 6, 6),
(49, 7, 7, 7),
(50, 8, 1, 1),
(51, 8, 2, 2),
(52, 8, 3, 3),
(53, 8, 4, 4),
(54, 8, 5, 5),
(55, 8, 6, 6),
(56, 8, 7, 7),
(57, 9, 1, 1),
(58, 9, 2, 2),
(59, 9, 3, 3),
(60, 9, 4, 4),
(61, 9, 5, 5),
(62, 9, 6, 6),
(63, 9, 7, 7),
(64, 10, 1, 1),
(65, 10, 2, 2),
(66, 10, 3, 3),
(67, 10, 4, 4),
(68, 10, 5, 5),
(69, 10, 6, 6),
(70, 10, 7, 7),
(71, 11, 1, 1),
(72, 11, 2, 2),
(73, 11, 3, 3),
(74, 11, 4, 4),
(75, 11, 5, 5),
(76, 11, 6, 6),
(77, 11, 7, 7),
(78, 12, 1, 1),
(79, 12, 2, 2),
(80, 12, 3, 3),
(81, 12, 4, 4),
(82, 12, 5, 5),
(83, 12, 6, 6),
(84, 12, 7, 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `masasabor`
--
ALTER TABLE `masasabor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `masatipo`
--
ALTER TABLE `masatipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `torta_id` (`torta_id`,`tamano_id`),
  ADD KEY `tamano_id` (`tamano_id`),
  ADD KEY `sucursalRetiro` (`sucursalRetiro`);

--
-- Indices de la tabla `precio`
--
ALTER TABLE `precio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sabor`
--
ALTER TABLE `sabor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `semanacab`
--
ALTER TABLE `semanacab`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_DIA` (`dia`,`sucursal_id`),
  ADD KEY `sucursal_id` (`sucursal_id`);

--
-- Indices de la tabla `semanadet`
--
ALTER TABLE `semanadet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historicoCab_id` (`semanaCab_id`,`torta_id`,`tamano_id`),
  ADD KEY `torta_id` (`torta_id`),
  ADD KEY `tamano_id` (`tamano_id`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tamano`
--
ALTER TABLE `tamano`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `torta`
--
ALTER TABLE `torta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_torta` (`masaTipo_id`,`masaSabor_id`,`sabor_id`) USING BTREE,
  ADD KEY `masaTipo_id` (`masaTipo_id`,`masaSabor_id`,`sabor_id`),
  ADD KEY `masaSabor_id` (`masaSabor_id`),
  ADD KEY `sabor_id` (`sabor_id`);

--
-- Indices de la tabla `tortaprecio`
--
ALTER TABLE `tortaprecio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tamanoPrecioTorta_id` (`torta_id`,`tamano_id`,`precio_id`) USING BTREE,
  ADD KEY `tamano_id` (`tamano_id`),
  ADD KEY `precio_id` (`precio_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `masasabor`
--
ALTER TABLE `masasabor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `masatipo`
--
ALTER TABLE `masatipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT de la tabla `precio`
--
ALTER TABLE `precio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `sabor`
--
ALTER TABLE `sabor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `semanacab`
--
ALTER TABLE `semanacab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `semanadet`
--
ALTER TABLE `semanadet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tamano`
--
ALTER TABLE `tamano`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `torta`
--
ALTER TABLE `torta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `tortaprecio`
--
ALTER TABLE `tortaprecio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`),
  ADD CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`sucursalRetiro`) REFERENCES `sucursal` (`id`),
  ADD CONSTRAINT `pedido_ibfk_4` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`);

--
-- Filtros para la tabla `semanacab`
--
ALTER TABLE `semanacab`
  ADD CONSTRAINT `semanacab_ibfk_1` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursal` (`id`);

--
-- Filtros para la tabla `semanadet`
--
ALTER TABLE `semanadet`
  ADD CONSTRAINT `semanadet_ibfk_1` FOREIGN KEY (`semanaCab_id`) REFERENCES `semanacab` (`id`),
  ADD CONSTRAINT `semanadet_ibfk_3` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`),
  ADD CONSTRAINT `semanadet_ibfk_4` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`);

--
-- Filtros para la tabla `torta`
--
ALTER TABLE `torta`
  ADD CONSTRAINT `torta_ibfk_1` FOREIGN KEY (`masaTipo_id`) REFERENCES `masatipo` (`id`),
  ADD CONSTRAINT `torta_ibfk_2` FOREIGN KEY (`masaSabor_id`) REFERENCES `masasabor` (`id`),
  ADD CONSTRAINT `torta_ibfk_3` FOREIGN KEY (`sabor_id`) REFERENCES `sabor` (`id`);

--
-- Filtros para la tabla `tortaprecio`
--
ALTER TABLE `tortaprecio`
  ADD CONSTRAINT `tortaprecio_ibfk_1` FOREIGN KEY (`torta_id`) REFERENCES `torta` (`id`),
  ADD CONSTRAINT `tortaprecio_ibfk_2` FOREIGN KEY (`tamano_id`) REFERENCES `tamano` (`id`),
  ADD CONSTRAINT `tortaprecio_ibfk_3` FOREIGN KEY (`precio_id`) REFERENCES `precio` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
