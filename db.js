const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Wordpass3!!!992",
    database: "employee_trackerdb",
    multipleStatements: true
});

const seededDatabase = {
    dropEmployeeRoleTable: 'DROP TABLE IF EXISTS employee_role',
    dropDepartmentTable: 'DROP TABLE IF EXISTS department',
    dropEmployeeTable: 'DROP TABLE IF EXISTS employee',
    createDepartmentTable: `CREATE TABLE IF NOT EXISTS department (
        id INT AUTO_INCREMENT NOT NULL,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY (id)
    )`,
    createEmployeeRoleTable: `CREATE TABLE IF NOT EXISTS employee_role (
        id INT AUTO_INCREMENT NOT NULL,
        role VARCHAR(30) NOT NULL,
        salary DECIMAL(12,2) NOT NULL,
        department_id INT NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY(department_id) REFERENCES department(id)
    )`,
    createEmployeeTable: `CREATE TABLE IF NOT EXISTS employee (
        id INT AUTO_INCREMENT NOT NULL,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY(employee_role_id) REFERENCES employee_role(id),
        FOREIGN KEY(manager_id) REFERENCES employee(id)
    )`,
    reset: function() {
        connection.query(this.dropDepartmentTable, error => {
            if (error) throw error
        });

        connection.query(this.dropEmployeeRoleTable, error => {
            if (error) throw error
        });

        connection.query(this.dropEmployeeTable, error => {
            if (error) throw error
        });

        connection.query(this.createDepartmentTable, error => {
            if (error) throw error
        });

        connection.query(this.createEmployeeRoleTable, error => {
            if (error) throw error
        });

        connection.query(this.createEmployeeTable, error => {
            if (error) throw error
        });
    },
    //seeding tables
    init: function() {
        connection.query(
            `INSERT INTO department (name)
                VALUES
                    ('Engineering'),
                    ('Finance'),
                    ('Legal'),
                    ('Sales'),`,
            error => {
                if (error) {
                    console.log(error)
                    throw error
                }
            }
        );

        connection.query(
            `INSERT INTO employee_role (role, salary, department_id)
                VALUES
                    ('Software Engineer', 150000, 1),
                    ('Lead Software Engineer', 240000, 1),
                    ('Accountant', 165000, 2),
                    ('Lawyer', 200000, 3),
                    ('Lead Lawyer', 300000, 3),
                    ('Salesperson', 90000, 4),
                    ('Lead Salesperson', 120000, 4)`,
            error => {
                if (error) {
                    console.log(error)
                    throw error
                }
            }
        );

        connnection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES 
                ('Andrew', 'Ross', 1, null),
                ('George', 'Daniel', 3, 3),
                ('Joe', 'Shields', 1, null),
                ('Pedrom', 'Keshavarzi', 4, 4),
                ('Kevin', 'Runde', 2, null)`,
            error => {
                if (error) {
                    console.log(error)
                    throw error
                }
            }
        );
    },
    dropAndInitialize: function () {
        this.reset();
        this.init();
    },
    dropAndStop: function () {
        connection.query(this.dropDepartmentTable, error => {
            if (error) throw error
        });

        connection.query(this.dropEmployeeRoleTable, error => {
            if (error) throw error
        });

        connection.query(this.dropEmployeeTable, error => {
            if (error) throw error
        });

        connection.end();
    }
};

module.exports = seededDatabase;