const inquirer = require("inquirer");
const connection = require("./db");

//figlet generated banner
const { displayFiglet } = ("./utilities/figlet");

//controllers
const {
    addEmployee,
    removeEmployee,
    updateEmployeeRole,
    updateEmployeeRole,
    allEmployees,
    byDepartment,
    byManager
} = require('./controllers/employee');

const {
    totalBudget,
    totalUtilizedBudgetByDepartment
} = require('./controllers/budget');

const {
    addDepartment,
    removeDepartment,
    allDepartments
} = require('./controllers/department');

const {
    addRole,
    removeRole,
    allRoles
} = require('./controllers/role');


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
        })
            switch (answer.action) {
                case "View All Employees":
                    await allEmployees();
                    runTerminal();
                    break;
                
                case "View All Employees By Department":
                    await byDepartment();
                    runTerminal();
                    break;
                
                case "View All Employees By Manager":
                    await byManager();
                    runTerminal();
                    break;
                
                case "View All Departments":
                    await allDepartments();
                    runTerminal();
                    break;

                case "View All Roles":
                    await allRoles();
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
                    await updateManager();
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
                    await totalBudget();
                    runTerminal();
                    break;

                case "View Total Utilized Budget By Department":
                    await totalUtilizedBudgetByDepartment();
                    runTerminal();
                    break;
                
                case "Exit":
                    console.log('Thank you for using employee tracker')
                    connection.dropAndStop();
                default:
                    break;
            }
     }

init();