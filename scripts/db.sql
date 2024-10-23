CREATE DATABASE IF NOT EXISTS datalouna;
CREATE SCHEMA IF NOT EXISTS test;

CREATE TABLE IF NOT EXISTS test.users (
  id SERIAL PRIMARY KEY NOT NULL,
  password TEXT, 
  nickname TEXT NOT NULL DEFAULT 'user-nickname',
  balance INT DEFAULT 111111,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO test.users(
	id, nickname, password, balance, created_at)
	VALUES (DEFAULT , DEFAULT, crypt('some_password', gen_salt('md5')) , DEFAULT,  DEFAULT);

CREATE TABLE IF NOT EXISTS test.items (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL DEFAULT 'item-name',
  price INT DEFAULT 100,
  owner INT DEFAULT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO test.items(
	id, name, price, created_at)
	VALUES (DEFAULT , 'item-name-1' , DEFAULT,  DEFAULT),
     (DEFAULT , 'item-name-2' , DEFAULT,  DEFAULT), 
     (DEFAULT , 'item-name-3' , DEFAULT,  DEFAULT) ,
     (DEFAULT , 'item-name-4' , DEFAULT,  DEFAULT);