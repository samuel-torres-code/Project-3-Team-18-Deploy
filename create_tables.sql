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
    ingredient_type TEXT
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

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username VARCHAR (20) UNIQUE NOT NULL,
    password VARCHAR (20) UNIQUE NOT NULL,
    email VARCHAR (20) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS orders_copy;
CREATE TABLE orders_copy (
    order_id serial PRIMARY KEY,
    emp_id INT,
    cust_name TEXT,
    order_num INT,
    time_stamp TIMESTAMP
);

-- copy all data from orders table with auto-generating id
INSERT INTO orders_copy (emp_id, cust_name, order_num, time_stamp) SELECT emp_id, cust_name, order_num, time_stamp FROM orders;

-- manual insert into orders_copy
insert into orders_copy (emp_id, cust_name, order_num, time_stamp) VALUES (2, 'testcopy', 57, '2022-10-19') returning order_id;

-- same for pizzas, drinks
-- also can for employees
