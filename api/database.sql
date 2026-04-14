CREATE DATABASE celular_shop
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

	
CREATE TABLE celulares (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    imei VARCHAR(20) UNIQUE NOT NULL,
    preco DECIMAL(10, 2),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT
);