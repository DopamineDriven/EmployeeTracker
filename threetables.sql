DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Engineering");

CREATE TABLE employee_role (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    role VARCHAR(30),
    salary DECIMAL(12,4),
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    );

INSERT INTO employee_role (role, salary, department_id)
VALUES ("Software Engineer", 200000, 1);

CREATE TABLE employee (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Ross", 1, 4);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;