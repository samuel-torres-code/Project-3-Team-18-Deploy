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
    res.send('default route /api/manager');
 });


 router.get('/load_ingredients', function(req, res){
    var query_string = "SELECT ingredient_name, ingredient_type, ingredient_inventory from ingredients_web";
    f_response = []
    pool
        .query(query_string)
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++) {
                f_response.push(query_res.rows[i]);
            }
            console.log(f_response);
            final_obj = []
            for(let i = 0; i < f_response.length; i++)
            {
                var i_name = f_response[i]['ingredient_name'];
                var i_type = f_response[i]['ingredient_type'];
                var i_invent = f_response[i]['ingredient_inventory'];
                final_obj.push([i_name, i_type, i_invent]);
            }
            res.send(final_obj);
        });

 });

 
 router.get('/load_prices', function(req, res){
    //duplicate functionality as server side
    //TODO -- seasonal items
    var final_dict = {"pizza_types": [],
                        "drink_types": [],
                        "seasonal_items" : []
    };
    var drink_query = "SELECT * FROM drink_types_web";
    var pizza_query = "SELECT * FROM pizza_types_web";
    var seasonal_query = "SELECT * FROM seasonal_item";

    
    d_response = []
    pool
        .query(drink_query)
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++) {
                d_response.push(query_res.rows[i]);
            }
            for(let i = 0; i < d_response.length; i++)
            {
                var d_price = d_response[i]["drink_price"];
                var d_name = d_response[i]["drink_type"];
                var d_obj = {"drink_type" : d_name,
                                "drink_price": d_price};
                final_dict["drink_types"] = final_dict["drink_types"].concat([d_obj]);

            }
            p_response = []
            pool
            .query(pizza_query)
            .then(query_res => {
                for(let i = 0; i < query_res.rowCount; i++) {
                    p_response.push(query_res.rows[i]);
                }
                for(let i = 0; i < p_response.length; i++)
                {
                    var p_price = p_response[i]["pizza_price"];
                    var p_name = p_response[i]["pizza_type"];
                    var p_obj = {"pizza_type" : p_name,
                                    "pizza_price": p_price};
                    final_dict["pizza_types"] = final_dict["pizza_types"].concat([p_obj]);
                }
                res.send(final_dict)
            });

        });
    


 });

 
 router.get('/add_inventory', function(req, res){
    var ingredients_dec_query = "UPDATE ingredients_web set ingredient_inventory = ingredient_inventory + $1 WHERE ingredient_id = $2";
    res.json({requestBody: req.body});
    var ingredient_ids = req.body["ingredients"];
    var amount = req.body["amount"];
    for(let i = 0; i < ingredient_ids.length; i++)
    {
        pool.query(ingredients_dec_query, [amount, ingredient_ids[i]]);
    }
 });

 
 router.get('/add_ingredient', function(req, res){
    res.json({requestBody: req.body});
    var ingredient_name = req.body["ingredient_name"];
    var ingredient_type = req.body["ingredient_type"];

    var add_ing_query = "INSERT INTO ingredients_web (ingredient_name, ingredient_type, ingredient_inventory) VALUES ($1, $2, $3)";
    pool.query(add_ing_query, [ingredient_name, ingredient_type, 0]);
 });

 
 router.get('/remove_ingredient', function(req, res){
    res.json({requestBody: req.body});
    var ingredient_name = req.body["ingredient_name"];
    var remove_ing_query = "DELETE FROM ingredients_web WHERE ingredient_name = $1";
    pool.query(remove_ing_query, [ingredient_name]);
 });

 
 router.get('/load_menu_items', function(req, res){
    //TODO -- unclear diff between this and load_prices
    var final_dict = {"menu_items" : []
    };
    var drink_query = "SELECT * FROM drink_types_web";
    var pizza_query = "SELECT * FROM pizza_types_web";
    var seasonal_query = "SELECT * FROM seasonal_item";

    d_response = []
    pool
        .query(drink_query)
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++) {
                d_response.push(query_res.rows[i]);
            }
            for(let i = 0; i < d_response.length; i++)
            {
                var d_price = d_response[i]["drink_price"];
                var d_name = d_response[i]["drink_type"];
                final_dict["menu_items"].push([d_name, d_price]);

            }
            p_response = []
            pool
            .query(pizza_query)
            .then(query_res => {
                for(let i = 0; i < query_res.rowCount; i++) {
                    p_response.push(query_res.rows[i]);
                }
                for(let i = 0; i < p_response.length; i++)
                {
                    var p_price = p_response[i]["pizza_price"];
                    var p_name = p_response[i]["pizza_type"];
                    final_dict["menu_items"].push([p_name, p_price])
                }
                res.send(final_dict)
            });

        });
 });

 
 router.get('/update_menu_items', function(req, res){
    //TODO
    res.json({requestBody: req.body});
    var menu_items = req.body["menu_items"];
    var new_price = req.body["new_price"];

    //brute force set through each table
    // assumes menu item names are distinct between all tables
    var update_pizzas = "UPDATE pizza_types_web SET pizza_price = $1 where pizza_type = $2";
    var update_drinks = "UPDATE drink_types_web SET drink_price = $1 where drink_type = $2";
    //TODO -- update seasonal as well
    for(let i = 0; i < menu_items.length; i++)
    {
        pool.query(update_pizzas, [new_price, menu_items[i]]);
        pool.query(update_drinks, [new_price, menu_items[i]])
    }

 });

 module.exports = router;