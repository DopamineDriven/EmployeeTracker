const mysql = require("mysql");
//connect to database

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Wordpass3!!!992",
    database: "employee_trackerdb",
    multipleStatements: true
});

