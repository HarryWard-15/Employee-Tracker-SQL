INSERT INTO departments (name)
VALUES  ("Sales"),
        ("Management"),
        ("Processes"),
        ("IT");
 
INSERT INTO roles (title, salary, department_id)
VALUES  ("Salesman", 100000, 1),
        ("Carpenter", 80000, 3),
        ("Welder", 90000, 3),
        ("IT Guy", 70000, 4),
        ("Manager", 110000, 2);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Harry', 'Ward', 5, NULL),
        ('Danielle', 'Wheeler', 1, 4),
        ('John', 'Smith', 2, 3),
        ('Bob', 'Hawke', 3, 2),
        ('Sarah', 'Miller', 4, 1);

       
