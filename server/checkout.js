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
    res.json({requestBody:  req.body});
    console.log(req.body)
    var order_details = req.body["order"];
    var pizza_details = req.body["pizzas"];
    var drink_details = req.body["drinks"];
    console.log(order_details);
    //update order table
    var order_insert = "INSERT INTO orders_web (emp_id, cust_name, order_num, time_stamp) VALUES (";
    var emp_id = order_details["emp_id"]
    var cust_name = order_details["cust_name"];
    var order_num = -1;
    order_insert += "'" + emp_id + "', '" + cust_name + "', '" + order_num  + "', Now()) RETURNING order_id";
    console.log(order_insert);
    //create order query
    pool.query(order_insert, (error, id) => 
    {
        //extract id
        var order_id = id['rows'][0]['order_id']
        console.log("order_id: " + order_id);
        //send pizzas with order id
        var pizza_query = "INSERT INTO pizzas_web (order_id, pizza_type, pizza_price) VALUES ($1, $2, $3) RETURNING pizza_id";
        for(let i = 0; i < pizza_details.length; i++)
        {
            var pizza_price = pizza_details[i]["pizza_price"];
            var pizza_type = pizza_details[i]["pizza_type"];
            var ingredients = pizza_details[i]["ingredients"];
            pool.query(pizza_query, [order_id, pizza_type, pizza_price], (p_error, p_id) =>
            {
                //send ingredients
                var pizza_id = p_id['rows'][0]['pizza_id'];
                console.log("pizza_id: " + pizza_id);
                //TODO -- check whether ingredients  contains id
                var ingredients_join_query = "INSERT INTO ingredients_join_web (pizza_id, ingredient_id) VALUES ($1, $2)";
                var ingredients_query = "UPDATE ingredients_web set ingredient_inventory = ingredient_inventory - 1 WHERE ingredient_id = $1";
                for(let j = 0; j < ingredients.length; j++)
                {
                    //ingredient join
                    pool.query(ingredients_join_query, [pizza_id, ingredients[j]["ingredient_id"]]);
                    //ingredients
                    pool.query(ingredients_query, [ingredients[j]["ingredient_id"]]);
                }
            });
        }

        var drink_query = "INSERT INTO drinks_web (order_id, drink_type, drink_price) VALUES ($1, $2, $3)";
        for(let k = 0; k < drink_details.length; k++)
        {
            //assuming drink is object with drink_type, drink_price;
            var drink_price = drink_details[k]["drink_price"];
            var drink_type = drink_details[k]["drink_type"];
            pool.query(drink_query, [order_id, drink_type, drink_price]);
        }
        //send drinks with order_id
    });

    

 });


 module.exports = router;