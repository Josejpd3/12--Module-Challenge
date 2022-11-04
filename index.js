const inquirer = require('inquirer');
const db = require('./config/connection')

const initQuestion = function () {
    inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee",
                "Quit"
            ],
        }
    ])
    .then(choice => {
        console.log(`You have selected ${choice.start}`);

        switch (choice.start) {
            case "View all departments":
                db.query('SELECT id, department_name FROM department', function (err, department) {
                    console.table(department);
                    initQuestion()
                });
                break;
            case "View all roles":
                db.query(`SELECT role.id, role.title, department.department_name AS department, role.salary FROM role JOIN department ON role.department_id = department.id;`, function (err, role) {
                    console.table(role);
                    initQuestion()
                });
                break;
            case "View all employees":
                db.query('SELECT * FROM employee', function (err, department) {
                    console.table(department);
                    initQuestion()
                });
                break;
            case "Add a department":

                break;
            case "Add a role":

                break;
            case "Add an employee":

                break;
            case "Update an employee":

                break;
            case "Quit":
                process.exit();
                break;
            default:
                break;
        }
    })
}

initQuestion()