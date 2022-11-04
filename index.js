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
                db.query('SELECT * FROM role', function (err, role) {
                    console.table(role);
                });
                break;
            case "View all employees":

                break;
            case "Add a department":

                break;
            case "Add a role":

                break;
            case "Add an employee":

                break;
            case "Update an employee":

                break;
            default:
                break;
        }
    })
}

initQuestion()