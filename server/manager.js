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
                        "seasonal_item_types" : []
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
    //TODO
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
    //TODO
 });

 
 router.get('/remove_ingredient', function(req, res){
    //TODO
 });

 
 router.get('/load_menu_items', function(req, res){
    //TODO
 });

 
 router.get('/update_menu_items', function(req, res){
    //TODO
 });

 module.exports = router;