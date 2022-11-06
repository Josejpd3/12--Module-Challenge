USE employee_tracker_db

INSERT INTO department (department_name)
VALUES
('Engineering'),
('Finance'),
('Design'),
('Service');

INSERT INTO role (title, salary, department_id)
VALUES
('Senior Engineer', 55000, 1),
('Career Services', 40000, 2),
('Mobile Designer', 80000, 3),
('Sales Associate', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
('Frank', 'Davila', 1),
('Ryker', 'Lucas', 2),
('Reese', 'Talbot', 3),
('Ross', 'Rosario', 4);