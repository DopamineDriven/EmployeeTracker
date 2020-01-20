const inquirer = require("inquirer");
const connection = require("./db");

//figlet utility
const { displayFiglet } = require("./utilities/figlet");

//employee controller
const {
    addEmployee,
    removeEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewAllEmployees,
    viewByDepartment,
    viewByManager
} = require('./controllers/employee');

//budget controller
const {
    viewTotalBudget,
    viewTotalUtilizedBudgetByDepartment
} = require('./controllers/budget');

//department controller
const {
    addDepartment,
    removeDepartment,
    viewAllDepartments
} = require('./controllers/department');

//role controller
const {
    addRole,
    removeRole,
    viewAllRoles
} = require('./controllers/role');


//asynchronous to increase app performance && responsiveness
async function init() {
    connection.dropAndInitialize();
    await displayFiglet();
    await runTerminal();
}

async function runTerminal() {
    const answer = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "Add Department",
                "Remove Department",
                "Add Role",
                "Remove Role",
                "View Total Budget",
                "View Total Utilized Budget By Department",
                "Exit"
            ]
        });
            switch (answer.action) {
                case "View All Employees":
                    await viewAllEmployees();
                    runTerminal();
                    break;
                
                case "View All Employees By Department":
                    await viewByDepartment();
                    runTerminal();
                    break;
                
                case "View All Employees By Manager":
                    await viewByManager();
                    runTerminal();
                    break;
                
                case "View All Departments":
                    await viewAllDepartments();
                    runTerminal();
                    break;

                case "View All Roles":
                    await viewAllRoles();
                    runTerminal();
                    break;
                
                case "Add Employee":
                    await addEmployee();
                    runTerminal();
                    break;

                case "Remove Employee":
                    await removeEmployee();
                    runTerminal();
                    break;

                case "Update Employee Role":
                    await updateEmployeeRole();
                    runTerminal();
                    break;
                
                case "Update Employee Manager":
                    await updateEmployeeManager();
                    runTerminal();
                    break;
                
                case "Add Department":
                    await addDepartment();
                    runTerminal();
                    break;

                case "Remove Department":
                    await removeDepartment();
                    runTerminal();
                    break;

                case "Add Role":
                    await addRole();
                    runTerminal();
                    break;
                
                case "Remove Role":
                    await removeRole();
                    runTerminal();
                    break;

                case "View Total Budget":
                    await viewTotalBudget();
                    runTerminal();
                    break;

                case "View Total Utilized Budget By Department":
                    await viewTotalUtilizedBudgetByDepartment();
                    runTerminal();
                    break;
                
                case "Exit":
                    console.log('Thank you for using employee tracker')
                    connection.dropAndStop();
                default:
                    break;
            }
     };

init();