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

//function to get employee id
obtainEmployeeId = employeeName => {
    if (employeeName === "") {
        return null
    }
    return new Promise ((resolve, reject, response) => {
        const employeeFirstName = employeeName.split(" ")[0];
        const employeeLastName = employeeName.split(" ")[1];
        query = `SELECT id FROM employee WHERE first_name =? AND last_name =?`;
        connection.query(query, [employeeFirstName, employeeLastName], (error, results) => {
            if (!results) {
                console.log(error)
                reject(error);
            } 
            else {
                resolve(results[0].id);
            }
        })
        .catch((error) => {
            console.log(`catch ${error}`)
                .status(500)
        })
    })
};

//function to insert employee 
employeeInsert = employee => {
    return new Promise ((resolve, reject) => {
        if (employee.managerId) {
            const query = `INSERT INTO employee (
                first_name, 
                last_name, 
                role_id, 
                manager_id)
                VALUES (?, ?, ?, ?)`;
            connection.query(
                query,
                [
                    employee.firstName,
                    employee.lastName,
                    employee.roleId,
                    employee.managerId
                ],
                error => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        console.log("employee inserted successfully")
                        resolve();
                    }
                }
            )
        } else {
            const query = `INSERT INTO employee (
                first_name,
                last_name, 
                role_id)
                VALUES (?, ?, ?)`;
            connection.query(
                query,
                [
                    employee.firstName,
                    employee.lastName,
                    employee.roleId
                ],
                error => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        console.log("employee sans Manager ID inserted successfully")
                        resolve();
                    }
                }
            )
        }
    })
}


module.exports = {
    obtainEmployeeId,

}
