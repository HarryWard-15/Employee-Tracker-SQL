// initializing the dependencies
const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      // TODO: Add MySQL Password
      password: 'u%MrTo0&4sV4',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

async function startApp () {

    inquirer.prompt(
        [
            {
                type: "list",
                message: "What would you like to do?",
                name: "likeToDo",
                choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Quit"]
            }
        ]) .then(function (res) {
                switch (res.likeToDo) {
                    case "View All Employees":
                        viewAll('SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Job Title", departments.name AS "Department", roles.salary AS "Salary", CONCAT(e.first_name," ",e.last_name) AS "Manager" FROM employees LEFT JOIN employees AS e ON employees.manager_id = e.id JOIN (roles JOIN departments ON roles.department_id = departments.id) ON employees.role_id = roles.id').then(results => {
                            console.table(results);
                            startApp();
                        });                        
                        break;
                    case "Add Employee":
                        newEmp();
                        break;
                    case "Update Employee Role":
                        updateEmp();
                        break;
                    case "View All Roles":
                        viewAll('SELECT roles.id AS "Role ID", roles.title AS "Job Title", d.name AS "Department", roles.salary AS "Salary" FROM roles JOIN departments AS d ON roles.department_id  = d.id').then(results => {
                            console.table(results);
                            startApp();
                        });
                        break;  
                    case "Add Role":
                        newRole();
                        break;
                    case "View All Departments":
                        viewAll('SELECT id AS "Department ID", name AS "Department Name" FROM departments').then(results => {
                            console.table(results);
                            startApp();
                        });
                        break; 
                    case "Add Department":
                        newDep();
                        break; 
                    case "Quit":
                        process.exit();                                   
                }
            })
}

viewAll = (command) => {
    return new Promise((resolve, reject) => {
        db.query(command, (err, result) => {
            if (err) console.log(err);
            return resolve(result);
        });
    });
};

async function newEmp () {
    const roles = await viewAll('SELECT id AS value, title FROM roles');
    const managers = await viewAll('SELECT id AS value, first_name, last_name FROM employees WHERE manager_id is NULL');
    const roleChoices = roles.map(function (el) {
        return el.title;
    });
    const managerChoices = managers.map(function (el) {
        return el.first_name + ' ' + el.last_name;
    });
    managerChoices.push('Employee does not have a manager');

    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is employee's first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is employee's last name?",
                name: "lastName"
            },
            {
                type: "list",
                message: "What is this employee's role?",
                name: "empRole",
                choices: roleChoices
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "empManager",
                choices: managerChoices
            }
        ]) .then(function (res) {
                const choiceVal = roles.filter(function (subject) {
                    if(res.empRole == subject.title) return subject.value;
                });
                console.log(`Added ${res.firstName + " " + res.lastName} to the database`);
                if(res.empManager == 'Employee does not have a manager') {
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}", "${res.lastName}", ${choiceVal[0].value}, NULL)`);
                } else {
                    const managerVal = managers.filter(function (subject) {
                        if(res.empManager == subject.first_name+" "+subject.last_name) 
                        return subject;
                    });
                    console.log(managerVal);
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}", "${res.lastName}", ${choiceVal[0].value}, ${managerVal[0].value})`);
                }
                startApp();
            })
}

async function newRole () {

    const departments = await viewAll('SELECT id AS value, name FROM departments');
    const choices = departments.map(function (el) {
        return el.name;
    });

    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the name of the role?",
                name: "newRole"
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "newRoleSalary"
            },
            {
                type: "list",
                message: "Which department does the role belong to?",
                name: "newRoleDepartment",
                choices: choices
            }
        ]) .then(function (res) {
                const choiceVal = departments.filter(function (subject) {
                    if(res.newRoleDepartment == subject.name) return subject;
                });
                console.log(`Added ${res.newRole} to the database`);
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${res.newRole}", ${res.newRoleSalary}, ${choiceVal[0].value})`);
                startApp();
            })

}

function newDep () {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the name of the department?",
                name: "newDepartment",
            }
        ]) .then(function (res) {
                console.log(`Added ${res.newDepartment} to the database`);
                db.query(`INSERT INTO departments (name) VALUES ("${res.newDepartment}")`);
                startApp();
            })
}

async function updateEmp () {
    const employees = await viewAll('SELECT id AS value, first_name, last_name FROM employees');
    const empChoices = employees.map(function (el) {
        const fullName = el.first_name + ' ' + el.last_name;
        return fullName;
    });
    const roles = await viewAll('SELECT id AS value, title FROM roles');
    const roleChoices = roles.map(function (el) {
        return el.title;
    });

    inquirer.prompt(
        [
            {
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "chosenEmp",
                choices: empChoices
            },
            {
                type: "list",
                message: "Which role do you want to assign the selected employee?",
                name: "chosenRole",
                choices: roleChoices
            }
        ]) .then(function (res) {
                const empId = employees.filter(function (subject) {
                    if(res.chosenEmp == subject.first_name + ' ' + subject.last_name) return subject;
                });
                const roleId = roles.filter(function (subjectA) {
                    if(res.chosenRole == subjectA.title) return subjectA;
                });
                console.log(`Changed ${res.chosenEmp}'s role to ${res.chosenRole}`);
                db.query(`UPDATE employees SET role_id = ${roleId[0].value} WHERE id = ${empId[0].value}`);
                startApp();
            })
}

startApp();

