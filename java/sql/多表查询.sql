SELECT COUNT(employee_id) FROM employees; -- 107
SELECT COUNT(department_id) FROM departments; -- 27
SELECT COUNT(*)FROM employees,departments; -- 2889=107*27 笛卡尔积
SELECT COUNT(*)FROM employees,departments WHERE employees.`department_id`=departments.`department_id`; -- 106

-- 等值连接（通过=判断的链接，使用其他逻辑运算则成为非等值连接）
SELECT employee_id,department_name,city 
FROM employees,departments,locations 
WHERE employees.`department_id`=departments.`department_id` AND departments.`location_id`=locations.`location_id`;

-- SQL99语法
-- 内连接 inner join  ... on ...(join ... on ...),查询满足条件的数据
SELECT employee_id,department_name
FROM employees
INNER JOIN departments
ON employees.`department_id`= departments.`department_id`;

-- 左外连接：将满足条件的查出，同时将左表中不满足的也查询出来
SELECT  employee_id,department_name
FROM employees
LEFT OUTER JOIN departments
ON employees.`department_id`=departments.`department_id`;

-- 右外连接：将满足条件的查出，同时将右表中不满足的也查询出来

-- 满外连接：
-- Oracle中使用 full outter join on
-- mysql不支持，通过union实现：左外连接语句 union 右外连接语句

-- 自连接：将一张表当做两张表
SELECT CONCAT(e.`first_name`,' work for ',m.`first_name`) info 
FROM employees e,employees m WHERE e.`employee_id`=m.`manager_id`;

