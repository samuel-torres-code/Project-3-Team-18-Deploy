var express = require('express');
var router = express.Router();

//psql
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});


router.get('/', function(req, res){
    var order_details = req["order"];
    var pizza_details = req["pizzas"];
    var drink_details = req["drinks"];

    //update order table
    var order_insert = "INSERT INTO orders_web (emp_id, cust_name, order_num, time_stamp) VALUES ($1, $2, $3, $4) RETURNING order_id";
    var current_date = new Date();
    var time_string = current_date.getFullYear() + "-" + (current_date.getMonth() + 1) + "-" + 
                        current_date.getDate() + " " + current_date.getHours() + ":" + current_date.getMinutes() 
                        + ":" + current_date.getSeconds();
    var emp_id = order_details["emp_id"]
    var cust_name = order_details["cust_name"];
    var order_num = -1;
    var id;
    pool.query(order_insert, [emp_id, cust_name, order_num, time_string], id => {
        
    });

    

 });


 module.exports = router;