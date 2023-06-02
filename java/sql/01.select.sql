SELECT last_name , job_id ,salary sal FROM employees;

SELECT last_name , job_id ,salary*12 annual_sal FROM employees;

DESC departments; -- 查询表结构

SELECT DISTINCT job_id FROM employees;

SELECT CONCAT(employee_id,',',email) output FROM employees;

SELECT first_name,salary FROM employees WHERE salary>12000;

SELECT first_name,department_id FROM employees WHERE employee_id=176;

SELECT first_name,salary FROM employees WHERE salary>12000 OR salary<5000;

SELECT first_name,salary FROM employees WHERE NOT salary BETWEEN 5000 AND 12000;

SELECT first_name,department_id FROM employees WHERE department_id IN (20,50);

SELECT first_name,job_id FROM employees WHERE manager_id IS NULL;
SELECT first_name FROM employees WHERE first_name LIKE '__a%';
SELECT first_name FROM employees WHERE first_name LIKE '%a%e%' OR first_name LIKE '%e%a%';
SELECT first_name FROM employees WHERE first_name LIKE '%e%' AND first_name LIKE '%a%';