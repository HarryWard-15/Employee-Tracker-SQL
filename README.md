# Employee Tracker - MYSQL
[![MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

## Table of Contents
* [Description](#description)
* [User-Story](#user-story)
* [Acceptance-Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Questions](#questions)
* [Credits](#credits)

## Description

This is my Employee Tracker that uses MySQL to store and use the Data. Whilst very simple, this project was for me to fully grasp the use of Databases for future projects.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Installation

In order to use this tracker, you will need to have node.js and mysql installed, other than than all you need is to download the source code from this repository!

## Live Demo - Click for video

link: https://www.youtube.com/watch?v=sI0pgxJmETo

## Usage

To use the tracker, do the following:

1) Navigate to the project directory where you have downloaded the source code

2) Now run the following commands in order
----------

``` 
npm install 
```
----------
```
mysql -u root -p
```
----------

3) Assuming you have installed the node modules correctly and the code is not outdated, enter your MySQL password and run the following
```
SOURCE db/schema.sql
```
```
SOURCE db/seeds.sql
```
```
quit
```
YOU MUST RUN THEM IN THIS ORDER
----------
4) Now run the following command
```
node index.js
```
5) Follow any prompts given and navigate the menus using the arrow keys


## License

  ```
  This project is covered under the MIT License license. To learn more about what this means, click the license button at the top
  ```

## Questions

Have questions about this project?\
GitHub: https://github.com/Harry-Ward15 \
Email: hward.1508@gmail.com

## Credits

Starter code was written by UWA Bootcamp 2022/23
