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
                db.query(`
                WITH RECURSIVE manager AS (
                    SELECT id, first_name, last_name, role_id, manager_id FROM employee WHERE manager_id IS NULL
                    UNION ALL SELECT  e.id, e.first_name, e.last_name, e.role_id, e.manager_id FROM employee e, manager m WHERE e.manager_id = m.id
                )
                SELECT  
                    employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary,
                    CONCAT(manager.first_name, ' ', manager.last_name) as manager_name FROM employee
                    JOIN role ON employee.role_id = role.id
                    JOIN department ON role.department_id = department.id
                    LEFT JOIN manager ON employee.manager_id = manager.id;`, function (err, department) {
                    console.table(department);
                    initQuestion()
                });
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
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


// -----------------------\
// Database modifications  
// -----------------------/


// Add Deparment

function addDepartment () {
    inquirer
         .prompt([
            {
                type: "input",
                name: "dept",
                message: "What is the name of the new department?"
            }
         ])
         .then((data) => {
            db.query(`INSERT INTO department (department_name) VALUES (?);`, data.dept, function (err, department) {
                console.log(`You have added a new department (${data.dept})`);
                initQuestion()
            });
         })
    }

// Add Role

function addRole() {
    let choices = []
    db.query("SELECT * FROM department", (err, response) => {
        for (let i = 0; i < response.length; i++) {
            choices.push(response[i].department_name);
        }
        inquirer.prompt([
           {
               type: "input",
               name: "title",
               message: "What is the name of the new role?"
           },
           {
               type: "rawlist",
               name: "options",
               message: "What is the index of the department?",
               choices: choices
           },
           {
               type: "input",
               name: "department",
               message: `Please re-enter the index of the previous question?`
           },
           {
               type: "input",
               name: "salary",
               message: "What is the salary for this role?"
           }
        ])
        .then((data) => {
            db.query(
                "INSERT INTO role SET ?",
                {
                    title: data.title,
                    salary: data.salary,
                    department_id: data.department
                },
            )
            console.log(`You have created a new role (${data.title})!!`);
            initQuestion();
        })
    })

}

// Add Employee

function addEmployee () {
    let choices = []
    db.query("SELECT * FROM role", (err, response) => {
        for (let i = 0; i < response.length; i++) {
            choices.push(response[i].title);
        }
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the new employee?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the new employee?"
            },
            {
                type: "rawlist",
                name: "rolelist",
                message: "Select the index of the role for this employee",
                choices: choices
            },
            {
                type: "input",
                name: "role",
                message: "Please re-enter the previous index"
            }
        ])
        .then((data) => {

        })
    })
}