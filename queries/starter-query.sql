
CREATE DATABASE Robt;

USE Robt;

CREATE TABLE Status (
	id TINYINT PRIMARY KEY NOT NULL,
	title VARCHAR(15)
);

CREATE TABLE Account (
	id VARCHAR(50) PRIMARY KEY NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	role VARCHAR(25) NOT NULL,
	status_id TINYINT NOT NULL,
	FOREIGN KEY (status_id) REFERENCES Status(id)
);

CREATE TABLE User (
	id VARCHAR(50) PRIMARY KEY NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	account_id VARCHAR(50) NOT NULL, 
	FOREIGN KEY (account_id) REFERENCES Account(id)
);

CREATE TABLE Job(
	id VARCHAR(50) PRIMARY KEY NOT NULL,
	title VARCHAR(50) NOT NULL,
	location VARCHAR(100) NOT NULL,
	company VARCHAR(50) NOT NULL,
	company_rate SMALLINT,
	publication_date DATE NOT NULL,
	description VARCHAR(200),
	salary DOUBLE NOT NULL,
	responsabilities JSON NOT NULL,
	requierements JSON NOT NULL
);

INSERT INTO Job (id, title, location, company, company_rate, publication_date, description, salary, responsabilities, requierements)
VALUES ('j1', 'React Developer', 'NY, USA', 'Facebook', '4.3', '2021-12-14', 'We are looking for an amazing React Developer for our team', 250.50, 
'["develop", "test", "design"]', '["4 year of experience", "Software Engineering degree", "React 17"]');

INSERT INTO Status (id, title) VALUES (1, "active");
INSERT INTO Status (id, title) VALUES (0, "inactive");

INSERT INTO Account (id, email, password, role, status_id) VALUES ('321', 'john@domain.com', 'john123', "job-seeker", 1);

INSERT INTO User (id, account_id) VALUES ('123', '321');


