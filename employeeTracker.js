const inquirer = require("inquirer");
const db = require("./db");

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
    db.dropAndInit();
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
                "View Total Utilized Budget By Department"
            ]
        })
            switch (answer.action) {
                case "View All Employees":
                    await allEmployees();
                    break;
                
                case "View All Employees By Department":
                    await byDepartment();
                    break;
                
                case "View All Employees By Manager":
                    await byManager();
                    break;
                
                case "View All Departments":
                    await allDepartments();
                    break;

                case "View All Roles":
                    await allRoles();
                    break;
                
                case "Add Employee":
                    await addEmployee();
                    break;

                case "Remove Employee":
                    await removeEmployee();
                    break;

                case "Update Employee Role":
                    await updateEmployeeRole();
                    break;
                
                case "Update Employee Manager":
                    await updateManager();
                    break;
                
                case "Add Department":
                    await addDepartment();
                    break;

                case "Remove Department":
                    await removeDepartment();
                    break;

                case "Add Role":
                    await addRole();
                    break;
                
                case "Remove Role":
                    await removeRole();
                    break;

                case "View Total Budget":
                    await totalBudget();
                    break;

                case "View Total Utilized Budget By Department":
                    totalUtilizedBudgetByDepartment();
                    break;
            }
     }

init();