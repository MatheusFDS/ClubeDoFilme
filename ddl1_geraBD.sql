-- MySQL Script generated by MySQL Workbench
-- Sun Jun 26 15:05:14 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema grupodh
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema grupodh
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `grupodh` DEFAULT CHARACTER SET utf8 ;
USE `grupodh` ;

-- -----------------------------------------------------
-- Table `grupodh`.`assinaturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grupodh`.`assinaturas` (
  `id_assinatura` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_assinatura` VARCHAR(30) NOT NULL,
  `tipo_assinatura` ENUM('BASICA', 'PADRAO', 'AVANCADA') NOT NULL,
  `valor` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`id_assinatura`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `grupodh`.`filmes`
-- -----------------------------------------------------
drop table if exists grupodh.filmes;
CREATE TABLE IF NOT EXISTS `grupodh`.`filmes` (
  `id_filme` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(40) NOT NULL,
  `sinopse` VARCHAR(1500) NOT NULL,
  `avaliacao` FLOAT(2,1) NOT NULL,
  -- `data_cadastro` DATE NULL DEFAULT NULL,
  `ano` SMALLINT NOT NULL,
  `faixa_etaria` TINYINT NOT NULL,
  `duracao` SMALLINT NOT NULL,
  `direcao` VARCHAR(50) NOT NULL,
  `elenco` VARCHAR(400) NOT NULL,
  `roteiro` VARCHAR(400) NOT NULL,
  `produtora` VARCHAR(40),
  `avatar` VARCHAR(35) NOT NULL,
  `rota_filme` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_filme`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `grupodh`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grupodh`.`usuarios` (
  `id_matricula` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(30) NOT NULL,
  `nickname` VARCHAR(15) NOT NULL,
  `nascimento` DATE NULL DEFAULT NULL,
  `email` VARCHAR(50) NOT NULL,
  `data_cadastro` DATE NULL DEFAULT NULL,
  `id_assinatura` INT(11) NOT NULL,
  PRIMARY KEY (`id_matricula`),
  -- INDEX `id_assinatura` (`id_assinatura` ASC) VISIBLE, 
  CONSTRAINT `usuarios_ibfk_1`
    FOREIGN KEY (`id_assinatura`)
    REFERENCES `grupodh`.`assinaturas` (`id_assinatura`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `grupodh`.`assistidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grupodh`.`assistidos` (
  `id_assistidos` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_filme` VARCHAR(30) NOT NULL,
  `nome_usuario` VARCHAR(30) NOT NULL,
  `data_inicio` DATE NULL DEFAULT NULL,
  `id_filme` INT(11) NULL DEFAULT NULL,
  `id_matricula` INT(11) NOT NULL,
  PRIMARY KEY (`id_assistidos`),
  -- INDEX `id_filme` (`id_filme` ASC) VISIBLE,
--   INDEX `id_matricula` (`id_matricula` ASC) VISIBLE,
  CONSTRAINT `assistidos_ibfk_1`
    FOREIGN KEY (`id_filme`)
    REFERENCES `grupodh`.`filmes` (`id_filme`),
  CONSTRAINT `assistidos_ibfk_2`
    FOREIGN KEY (`id_matricula`)
    REFERENCES `grupodh`.`usuarios` (`id_matricula`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `grupodh`.`categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS categorias;
CREATE TABLE IF NOT EXISTS `grupodh`.`categorias` (
  `id_categoria` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_categoria` VARCHAR(30) NOT NULL,
  -- `tipo_categoria` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `grupodh`.`filme_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS filme_categoria;
CREATE TABLE IF NOT EXISTS `grupodh`.`filme_categoria` (
  `id_filme_categoria` INT(11) NOT NULL AUTO_INCREMENT,
  `id_categoria` INT(11) NOT NULL,
  `id_filme` INT(11) NOT NULL,
  PRIMARY KEY (`id_filme_categoria`),
  -- INDEX `id_filme` (`id_filme` ASC) VISIBLE,
--   INDEX `id_categoria` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `filme_categoria_ibfk_1`
    FOREIGN KEY (`id_filme`)
    REFERENCES `grupodh`.`filmes` (`id_filme`),
  CONSTRAINT `filme_categoria_ibfk_2`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `grupodh`.`categorias` (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `grupodh`.`mensalidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grupodh`.`mensalidade` (
  `id_mensalidade` INT(11) NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(6,2) NOT NULL,
  `vencimento` DATE NOT NULL,
  `id_matricula` INT(11) NOT NULL,
  `id_assinatura` INT(11) NOT NULL,
  PRIMARY KEY (`id_mensalidade`),
  -- INDEX `id_assinatura` (`id_assinatura` ASC) VISIBLE,
--   INDEX `id_matricula` (`id_matricula` ASC) VISIBLE,
  CONSTRAINT `mensalidade_ibfk_1`
    FOREIGN KEY (`id_assinatura`)
    REFERENCES `grupodh`.`assinaturas` (`id_assinatura`),
  CONSTRAINT `mensalidade_ibfk_2`
    FOREIGN KEY (`id_matricula`)
    REFERENCES `grupodh`.`usuarios` (`id_matricula`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
