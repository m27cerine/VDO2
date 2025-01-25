-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.7.10-log - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour piecedetache
CREATE DATABASE IF NOT EXISTS `piecedetache` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `piecedetache`;

-- Listage de la structure de la table piecedetache. acheteur
CREATE TABLE IF NOT EXISTS `acheteur` (
  `id_acheteur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_acheteur` varchar(100) NOT NULL,
  `adresse` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `numero_registre_commerce` varchar(50) DEFAULT NULL,
  `numero_identification_fiscale` varchar(50) DEFAULT NULL,
  `article_imposition` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_acheteur`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.acheteur : ~2 rows (environ)
INSERT INTO `acheteur` (`id_acheteur`, `nom_acheteur`, `adresse`, `email`, `telephone`, `numero_registre_commerce`, `numero_identification_fiscale`, `article_imposition`) VALUES
	(1, 'Garage Dupont', '123 rue des Ateliers, Paris', 'contact@garage-dupont.fr', '0102030405', 'RC123456', 'NIF123456', 'AI123'),
	(2, 'Transporteur X', '456 avenue des Transports, Lyon', 'info@transporteurx.com', '0607080910', 'RC789012', 'NIF789012', 'AI456');

-- Listage de la structure de la table piecedetache. acheteur_piece
CREATE TABLE IF NOT EXISTS `acheteur_piece` (
  `id_acheteur` int(11) NOT NULL,
  `id_piece` int(11) NOT NULL,
  PRIMARY KEY (`id_acheteur`,`id_piece`),
  KEY `id_piece` (`id_piece`),
  CONSTRAINT `acheteur_piece_ibfk_1` FOREIGN KEY (`id_acheteur`) REFERENCES `acheteur` (`id_acheteur`),
  CONSTRAINT `acheteur_piece_ibfk_2` FOREIGN KEY (`id_piece`) REFERENCES `piece` (`id_piece`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.acheteur_piece : ~2 rows (environ)
INSERT INTO `acheteur_piece` (`id_acheteur`, `id_piece`) VALUES
	(1, 1),
	(2, 2);

-- Listage de la structure de la table piecedetache. caracteristique
CREATE TABLE IF NOT EXISTS `caracteristique` (
  `id_caracteristique` int(11) NOT NULL AUTO_INCREMENT,
  `nom_caracteristique` varchar(50) NOT NULL,
  PRIMARY KEY (`id_caracteristique`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.caracteristique : ~3 rows (environ)
INSERT INTO `caracteristique` (`id_caracteristique`, `nom_caracteristique`) VALUES
	(1, 'Puissance'),
	(2, 'Cylindrée'),
	(3, 'Couple');

-- Listage de la structure de la table piecedetache. categorie
CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.categorie : ~3 rows (environ)
INSERT INTO `categorie` (`id_categorie`, `nom_categorie`) VALUES
	(1, 'Moteur'),
	(2, 'Transmission'),
	(3, 'Freins');

-- Listage de la structure de la table piecedetache. client
CREATE TABLE IF NOT EXISTS `client` (
  `id_client` int(11) NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(100) NOT NULL,
  `adresse_client` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(100) NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.client : ~2 rows (environ)
INSERT INTO `client` (`id_client`, `nom_client`, `adresse_client`, `email`, `mot_de_passe`) VALUES
	(1, 'Jean Martin', '789 rue des Lilas, Toulouse', 'jean.martin@email.com', 'mdp123'),
	(2, 'Claire Dupuis', '321 boulevard Saint-Michel, Marseille', 'claire.dupuis@email.com', 'securepassword');

-- Listage de la structure de la table piecedetache. client_piece
CREATE TABLE IF NOT EXISTS `client_piece` (
  `id_client` int(11) NOT NULL,
  `id_piece` int(11) NOT NULL,
  PRIMARY KEY (`id_client`,`id_piece`),
  KEY `id_piece` (`id_piece`),
  CONSTRAINT `client_piece_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`),
  CONSTRAINT `client_piece_ibfk_2` FOREIGN KEY (`id_piece`) REFERENCES `piece` (`id_piece`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.client_piece : ~2 rows (environ)
INSERT INTO `client_piece` (`id_client`, `id_piece`) VALUES
	(2, 1),
	(1, 3);

-- Listage de la structure de la table piecedetache. entreprise
CREATE TABLE IF NOT EXISTS `entreprise` (
  `id_entreprise` int(11) NOT NULL,
  `secteur_activite` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_entreprise`),
  CONSTRAINT `entreprise_ibfk_1` FOREIGN KEY (`id_entreprise`) REFERENCES `acheteur` (`id_acheteur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.entreprise : ~2 rows (environ)
INSERT INTO `entreprise` (`id_entreprise`, `secteur_activite`) VALUES
	(1, 'Réparation automobile'),
	(2, 'Transport de marchandises');

-- Listage de la structure de la table piecedetache. marque
CREATE TABLE IF NOT EXISTS `marque` (
  `id_marque` int(11) NOT NULL AUTO_INCREMENT,
  `nom_marque` varchar(50) NOT NULL,
  PRIMARY KEY (`id_marque`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.marque : ~3 rows (environ)
INSERT INTO `marque` (`id_marque`, `nom_marque`) VALUES
	(1, 'Toyota'),
	(2, 'Renault'),
	(3, 'Ford');

-- Listage de la structure de la table piecedetache. modele
CREATE TABLE IF NOT EXISTS `modele` (
  `id_modele` int(11) NOT NULL AUTO_INCREMENT,
  `nom_modele` varchar(50) NOT NULL,
  `id_marque` int(11) NOT NULL,
  `id_type` int(11) NOT NULL,
  PRIMARY KEY (`id_modele`),
  KEY `id_marque` (`id_marque`),
  KEY `id_type` (`id_type`),
  CONSTRAINT `modele_ibfk_1` FOREIGN KEY (`id_marque`) REFERENCES `marque` (`id_marque`),
  CONSTRAINT `modele_ibfk_2` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.modele : ~3 rows (environ)
INSERT INTO `modele` (`id_modele`, `nom_modele`, `id_marque`, `id_type`) VALUES
	(1, 'Corolla', 1, 1),
	(2, 'Duster', 2, 2),
	(3, 'Transit', 3, 3);

-- Listage de la structure de la table piecedetache. motorisation
CREATE TABLE IF NOT EXISTS `motorisation` (
  `id_motorisation` int(11) NOT NULL AUTO_INCREMENT,
  `type_motorisation` varchar(50) NOT NULL,
  `id_modele` int(11) NOT NULL,
  PRIMARY KEY (`id_motorisation`),
  KEY `id_modele` (`id_modele`),
  CONSTRAINT `motorisation_ibfk_1` FOREIGN KEY (`id_modele`) REFERENCES `modele` (`id_modele`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.motorisation : ~3 rows (environ)
INSERT INTO `motorisation` (`id_motorisation`, `type_motorisation`, `id_modele`) VALUES
	(1, 'Essence', 1),
	(2, 'Diesel', 2),
	(3, 'Hybride', 3);

-- Listage de la structure de la table piecedetache. motorisation_categorie
CREATE TABLE IF NOT EXISTS `motorisation_categorie` (
  `id_motorisation` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  PRIMARY KEY (`id_motorisation`,`id_categorie`),
  KEY `id_categorie` (`id_categorie`),
  CONSTRAINT `motorisation_categorie_ibfk_1` FOREIGN KEY (`id_motorisation`) REFERENCES `motorisation` (`id_motorisation`),
  CONSTRAINT `motorisation_categorie_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.motorisation_categorie : ~3 rows (environ)
INSERT INTO `motorisation_categorie` (`id_motorisation`, `id_categorie`) VALUES
	(1, 1),
	(2, 2),
	(3, 3);

-- Listage de la structure de la table piecedetache. piece
CREATE TABLE IF NOT EXISTS `piece` (
  `id_piece` int(11) NOT NULL AUTO_INCREMENT,
  `nom_piece` varchar(100) NOT NULL,
  `description` text,
  `prix` decimal(10,2) NOT NULL,
  `quantite_stock` int(11) NOT NULL,
  `id_sous_categorie` int(11) NOT NULL,
  PRIMARY KEY (`id_piece`),
  KEY `id_sous_categorie` (`id_sous_categorie`),
  CONSTRAINT `piece_ibfk_1` FOREIGN KEY (`id_sous_categorie`) REFERENCES `sous_categorie` (`id_sous_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.piece : ~3 rows (environ)
INSERT INTO `piece` (`id_piece`, `nom_piece`, `description`, `prix`, `quantite_stock`, `id_sous_categorie`) VALUES
	(1, 'Courroie de distribution renforcée', 'Convient pour les moteurs de type Essence', 150.50, 10, 1),
	(2, 'Kit d’embrayage', 'Compatible avec les véhicules utilitaires', 300.00, 5, 2),
	(3, 'Plaquettes de frein haute performance', 'Optimisé pour SUV', 75.20, 20, 3);

-- Listage de la structure de la table piecedetache. piece_caracteristique
CREATE TABLE IF NOT EXISTS `piece_caracteristique` (
  `id_piece` int(11) NOT NULL,
  `id_caracteristique` int(11) NOT NULL,
  `valeur` varchar(100) NOT NULL,
  PRIMARY KEY (`id_piece`,`id_caracteristique`),
  KEY `id_caracteristique` (`id_caracteristique`),
  CONSTRAINT `piece_caracteristique_ibfk_1` FOREIGN KEY (`id_piece`) REFERENCES `piece` (`id_piece`),
  CONSTRAINT `piece_caracteristique_ibfk_2` FOREIGN KEY (`id_caracteristique`) REFERENCES `caracteristique` (`id_caracteristique`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.piece_caracteristique : ~3 rows (environ)
INSERT INTO `piece_caracteristique` (`id_piece`, `id_caracteristique`, `valeur`) VALUES
	(1, 1, '120 CV'),
	(2, 2, '2.0 L'),
	(3, 3, '200 Nm');

-- Listage de la structure de la table piecedetache. piece_motorisation
CREATE TABLE IF NOT EXISTS `piece_motorisation` (
  `id_piece` int(11) NOT NULL,
  `id_motorisation` int(11) NOT NULL,
  `type_relation` varchar(50) NOT NULL,
  PRIMARY KEY (`id_piece`,`id_motorisation`),
  KEY `id_motorisation` (`id_motorisation`),
  CONSTRAINT `piece_motorisation_ibfk_1` FOREIGN KEY (`id_piece`) REFERENCES `piece` (`id_piece`),
  CONSTRAINT `piece_motorisation_ibfk_2` FOREIGN KEY (`id_motorisation`) REFERENCES `motorisation` (`id_motorisation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.piece_motorisation : ~3 rows (environ)
INSERT INTO `piece_motorisation` (`id_piece`, `id_motorisation`, `type_relation`) VALUES
	(1, 1, 'Compatibilité standard'),
	(2, 2, 'Compatibilité renforcée'),
	(3, 3, 'Usage spécifique');

-- Listage de la structure de la table piecedetache. revendeur
CREATE TABLE IF NOT EXISTS `revendeur` (
  `id_revendeur` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_revendeur`),
  CONSTRAINT `revendeur_ibfk_1` FOREIGN KEY (`id_revendeur`) REFERENCES `acheteur` (`id_acheteur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.revendeur : ~0 rows (environ)

-- Listage de la structure de la table piecedetache. revendeur_piece
CREATE TABLE IF NOT EXISTS `revendeur_piece` (
  `id_revendeur` int(11) NOT NULL,
  `id_piece` int(11) NOT NULL,
  PRIMARY KEY (`id_revendeur`,`id_piece`),
  KEY `id_piece` (`id_piece`),
  CONSTRAINT `revendeur_piece_ibfk_1` FOREIGN KEY (`id_revendeur`) REFERENCES `revendeur` (`id_revendeur`),
  CONSTRAINT `revendeur_piece_ibfk_2` FOREIGN KEY (`id_piece`) REFERENCES `piece` (`id_piece`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.revendeur_piece : ~0 rows (environ)

-- Listage de la structure de la table piecedetache. sous_categorie
CREATE TABLE IF NOT EXISTS `sous_categorie` (
  `id_sous_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `nom_sous_categorie` varchar(50) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  PRIMARY KEY (`id_sous_categorie`),
  KEY `id_categorie` (`id_categorie`),
  CONSTRAINT `sous_categorie_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.sous_categorie : ~3 rows (environ)
INSERT INTO `sous_categorie` (`id_sous_categorie`, `nom_sous_categorie`, `id_categorie`) VALUES
	(1, 'Courroie de distribution', 1),
	(2, 'Embrayage', 2),
	(3, 'Plaquettes de frein', 3);

-- Listage de la structure de la table piecedetache. type
CREATE TABLE IF NOT EXISTS `type` (
  `id_type` int(11) NOT NULL AUTO_INCREMENT,
  `nom_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id_type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Listage des données de la table piecedetache.type : ~3 rows (environ)
INSERT INTO `type` (`id_type`, `nom_type`) VALUES
	(1, 'Berline'),
	(2, 'SUV'),
	(3, 'Utilitaire');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
