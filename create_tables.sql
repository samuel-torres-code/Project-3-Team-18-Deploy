DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    emp_id INT,
    emp_name TEXT,
    is_manager BOOLEAN,
    passcode TEXT
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    order_id INT,
    emp_id INT,
    cust_name TEXT,
    order_num INT,
    time_stamp TIMESTAMP
);

DROP TABLE IF EXISTS drinks;
CREATE TABLE drinks (
    drink_id INT,
    order_id INT,
    drink_type TEXT,
    drink_price FLOAT
);

DROP TABLE IF EXISTS pizzas;
CREATE TABLE pizzas (
    pizza_id INT,
    order_id INT,
    pizza_type TEXT,
    pizza_price FLOAT
);

DROP TABLE IF EXISTS ingredients_join;
CREATE TABLE ingredients_join (
    ingredient_id INT,
    pizza_id INT
);

DROP TABLE IF EXISTS ingredients;
CREATE TABLE ingredients (
    ingredient_id INT,
    ingredient_name TEXT,
    ingredient_inventory FLOAT,
    ingredient_type TEXT,
    fill_level INT
);

DROP TABLE IF EXISTS ingredients_archive;
CREATE TABLE ingredients_archive (
    ingredient_id INT,
    ingredient_inventory FLOAT,
    time_stamp TIMESTAMP
);

DROP TABLE IF EXISTS pizza_types;
CREATE TABLE pizza_types (
    pizza_type TEXT,
    pizza_price FLOAT
);

DROP TABLE IF EXISTS drink_types;
CREATE TABLE drink_types (
    drink_type TEXT,
    drink_price FLOAT
);

INSERT INTO employees VALUES
(1,'Laurent Boyd',False,'1234'),
(2,'Hrithik Jha',False,'4567'),
(3,'Faith Bishop',False,'5658'),
(4,'Arthur Watts',False,'3214'),
(5,'Taylor Holt',False,'7894'),
(6,'Macala Anderson',True,'9876'),
(7,'Arlo Prado',True,'6543');

DROP TABLE IF EXISTS users_web;
CREATE TABLE users_web (
    user_id serial PRIMARY KEY,
    username VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS orders_web;
CREATE TABLE orders_web (
    order_id serial PRIMARY KEY,
    emp_id INT,
    cust_name TEXT,
    order_num INT,
    time_stamp TIMESTAMP
);
-- copy all data from orders table with auto-generating id
INSERT INTO orders_web (emp_id, cust_name, order_num, time_stamp) SELECT emp_id, cust_name, order_num, time_stamp FROM orders;

-- same for pizzas, drinks, ingredients
DROP TABLE IF EXISTS pizzas_web;
CREATE TABLE pizzas_web (
    pizza_id serial PRIMARY KEY,
    order_id INT,
    pizza_type TEXT,
    pizza_price FLOAT
);
-- copy all data from pizzas table with auto-generating id
INSERT INTO pizzas_web (order_id, pizza_type, pizza_price) SELECT order_id, pizza_type, pizza_price FROM pizzas;

DROP TABLE IF EXISTS drinks_web;
CREATE TABLE drinks_web (
    drink_id serial PRIMARY KEY,
    order_id INT,
    drink_type TEXT,
    drink_price FLOAT
);
-- copy all data from drinks table with auto-generating id
INSERT INTO drinks_web (order_id, drink_type, drink_price) SELECT order_id, drink_type, drink_price FROM drinks;

DROP TABLE IF EXISTS ingredients_web;
CREATE TABLE ingredients_web (
    ingredient_id serial PRIMARY KEY,
    ingredient_name TEXT,
    ingredient_inventory FLOAT,
    ingredient_type TEXT
);
-- copy all data from ingredients table with auto-generating id
INSERT INTO ingredients_web (ingredient_name, ingredient_inventory, ingredient_type) SELECT ingredient_name, ingredient_inventory, ingredient_type FROM ingredients;

-- also can for employees
DROP TABLE IF EXISTS employees_web;
CREATE TABLE employees_web (
    emp_id serial PRIMARY KEY,
    emp_name TEXT,
    is_manager BOOLEAN,
    passcode TEXT
);
-- copy all data from employees table with auto-generating id
INSERT INTO employees_web (emp_name, is_manager, passcode) SELECT emp_name, is_manager, passcode FROM employees;

DROP TABLE IF EXISTS ingredients_join_web;
CREATE TABLE ingredients_join_web (
    ingredient_id INT,
    pizza_id INT
);

INSERT INTO ingredients_join_web (ingredient_id, pizza_id) SELECT ingredient_id, pizza_id FROM ingredients_join;

DROP TABLE IF EXISTS ingredients_archive_web;
CREATE TABLE ingredients_archive_web (
    ingredient_id INT,
    ingredient_inventory FLOAT,
    time_stamp TIMESTAMP
);

INSERT INTO ingredients_archive_web (ingredient_id, ingredient_inventory, time_stamp) SELECT ingredient_id, ingredient_inventory, time_stamp FROM ingredients_archive;

DROP TABLE IF EXISTS pizza_types_web;
CREATE TABLE pizza_types_web (
    pizza_type TEXT,
    pizza_price FLOAT
);

INSERT INTO pizza_types_web (pizza_type, pizza_price) SELECT pizza_type, pizza_price FROM pizza_types;

DROP TABLE IF EXISTS drink_types_web;
CREATE TABLE drink_types_web (
    drink_type TEXT,
    drink_price FLOAT
);

INSERT INTO drink_types_web (drink_type, drink_price) SELECT drink_type, drink_price FROM drink_types;

DROP TABLE IF EXISTS users_web_oauth;
CREATE TABLE users_web_oauth (
    user_id serial PRIMARY KEY,
    username VARCHAR (255) UNIQUE NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL
);

-- manual insert into orders_web
insert into orders_web (emp_id, cust_name, order_num, time_stamp) VALUES (2, 'testcopy', 57, '2022-10-19') returning order_id;