const { response } = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

var express = require('express');
var router = express.Router();
module.exports = router;

//pool for data
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});



router.get('/', function(req, res){
    res.send('default route /api/reports');
});

router.get('/sales', async function(req, res){
    // res.send('route /api/reports/sales');
    //iterate through all menu item types, add cost up for specific menu item, add to dict
    var start_date = req.body["start_time"];
    var end_date = req.body["end_time"];
    var res_obj = {"sales" : []};
    //iterate through pizza_types
    var pizza_types_query = "SELECT * FROM pizza_types_web";
    var pizza_sales_query = "SELECT SUM(pizza_price) AS total FROM pizzas_web INNER JOIN orders_web" +
                            " ON pizzas_web.order_id = orders_web.order_id WHERE pizzas_web.pizza_type =" +
                            " $1 and DATE(time_stamp) >= $2 and DATE(time_stamp) <= $3";
    pizza_response = []
    await pool
        .query(pizza_types_query)
        .then(async query_res =>  {
            for(let i =0; i < query_res.rowCount; i++)
            {
                pizza_response.push(query_res.rows[i]["pizza_type"]);
            }
            for(let i = 0; i < pizza_response.length; i++)
            {
                var pizza_name = pizza_response[i];
                await pool.query(pizza_sales_query, [pizza_name, start_date, end_date])
                    .then(sales_res => {
                        var add_obj = {"item_name" : pizza_name};
                        add_obj['sales'] = sales_res.rows[0]["total"];
                        if(add_obj["sales"] == null)
                        {
                            add_obj["sales"] = 0;
                        }
                        res_obj["sales"].push(add_obj);
                    });
                
            }
        });
    //iterate through drinks
    var drinks_types_query = "select * from drink_types_web";
    var drink_sales_query = "SELECT SUM(drink_price) AS total FROM drinks_web INNER JOIN orders_web" + 
                            " ON drinks_web.order_id = orders_web.order_id WHERE drinks_web.drink_type =" +
                            " $1 and DATE(time_stamp) >= $2 and DATE(time_stamp) <= $3";
    drinks_response = []
    await pool
        .query(drinks_types_query)
        .then(async query_res => {
            for(let i =0; i < query_res.rowCount; i++)
            {
                drinks_response.push(query_res.rows[i]["drink_type"]);
            }
            for(let i = 0; i < drinks_response.length; i++)
            {
                var drink_name = drinks_response[i];
                await pool.query(drink_sales_query, [drink_name, start_date, end_date])
                    .then(sales_res => {
                        var add_obj = {"item_name": drink_name};
                        add_obj["sales"] = sales_res.rows[0]["total"];
                        if(add_obj["sales"] == null)
                        {
                            add_obj["sales"] = 0;
                        }
                        res_obj["sales"].push(add_obj);
                    });
            }
    });

    //iterate through seasonal
    var seasonal_types_query = "select * from seasonal_item";
    var seasonal_sales_query = "SELECT SUM(pizza_price) AS total FROM pizzas_web INNER JOIN orders_web" + 
                               " ON pizzas_web.order_id = orders_web.order_id WHERE pizzas_web.pizza_type =" +
                               " $1 and DATE(time_stamp) >= $2 and DATE(time_stamp) <= $3";
    seasonal_response = []
    await pool
        .query(seasonal_types_query)
        .then(async query_res => {
            for(let i =0; i < query_res.rowCount; i++)
            {
                seasonal_response.push(query_res.rows[i]["item_name"]);
            }
            for(let i = 0; i < seasonal_response.length; i++)
            {
                var item_name = seasonal_response[i];
                await pool.query(seasonal_sales_query, [item_name, start_date, end_date])
                    .then(sales_res => {
                        var add_obj = {"item_name": item_name};
                        add_obj["sales"] = sales_res.rows[0]["total"];
                        if(add_obj["sales"] == null)
                        {
                            add_obj["sales"] = 0;
                        }
                        res_obj["sales"].push(add_obj);
                    });
            }
    });
    res.send(res_obj);



});

router.get('/excess', async function(req, res){
    //get start from request
    var start_time = req.body["start_time"];
    //create response obj
    var resp_obj = {"ingredients" : []};
    var excess_query = "SELECT i.ingredient_name, count(ij.ingredient_id) FROM ingredients_web AS i "
                                +"JOIN ingredients_join_web AS ij ON ij.ingredient_id = i.ingredient_id "
                                +"JOIN pizzas_web AS p ON ij.pizza_id = p.pizza_id "
                                +"JOIN orders_web AS o ON o.order_id = p.order_id "
                                +" WHERE o.time_stamp > $1 "
                                +" GROUP BY i.ingredient_name;";
    ingredients_used = {};
    await pool.query(excess_query, [start_time]).then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++)
            {
                var ingr = query_res.rows[i];
                ingredients_used[ingr["ingredient_name"]] = ingr["count"];
            }
    });
    
    var all_ingredients_query = "select ingredient_name, ingredient_inventory from ingredients_web";
    current_ingredients = [];
    current_ingredient_stock = {};
    await pool.query(all_ingredients_query).then(query_res => {
        for(let i = 0; i < query_res.rowCount; i++)
        {
            var ingr = query_res.rows[i];
            current_ingredient_stock[ingr["ingredient_name"]] = ingr["ingredient_inventory"];
            current_ingredients.push(ingr["ingredient_name"]);
        }
    });

    //at this point, have name of all ingredients, current stock, and amount used
    for(let i = 0; i < current_ingredients.length; i++)
    {
        var ing_name = current_ingredients[i];
        var used = ingredients_used[ing_name];
        if(used == null)
        {
            used = 0;
        }
        var curr_stock = current_ingredient_stock[ing_name];
        var percent = (used * 100) / curr_stock;
        if(percent <= 10)
        {
            var ing_obj = {"ingredient_name" : ing_name, "sales": used, "inventory": curr_stock, "percentage": percent};
            resp_obj["ingredients"].push(ing_obj);
        }
    }
    res.send(resp_obj);
});

//TODO: need fill level understanding for restock functions

router.get('/restock', function(req, res){
    res.send('route /api/reports/restock');
});

router.get('/restock_all', function(req, res){
    res.send('route /api/reports/resock_all');
});


router.post('/add_seasonal_item', async function(req, res){
    //process req
    var item_name = req.body['item_name'];
    var ingredients = req.body['ingredients'];
    var price = req.body['price'];
    //query for ingredients to map to ids
    var ingredients_query = "select ingredient_name, ingredient_id from ingredients_web";
    mapped_ingredients = {};
    await pool.query(ingredients_query).then(query_res => {
        for(let i = 0; i < query_res.rowCount; i++)
        {
            var ing_name = query_res.rows[i]["ingredient_name"];
            var ing_id = query_res.rows[i]["ingredient_id"];
            mapped_ingredients[ing_name] = ing_id;
        }
    });
    var ingredients_to_send = [];
    for(let i = 0; i < ingredients.length; i++)
    {
        ingredients_to_send.push(mapped_ingredients[ingredients[i]]);
    }

    //query new seasonal_item
    var seasonal_query = "insert into seasonal_item(item_name, item_price, item_ingredients)" +
                            "VALUES ($1, $2, $3)";
    pool.query(seasonal_query, [item_name, price, ingredients_to_send]);
    console.log(ingredients_to_send);
    res.send({});
});

router.post('/remove_seasonal_item', function(req, res){
    //p trivial, just remove by name
    var items_to_remove = req.body["items"];
    var remove_query = "DELETE FROM seasonal_item WHERE item_name = $1";
    for(let i = 0; i < items_to_remove.length; i++)
    {
        pool.query(remove_query, [items_to_remove[i]]);
    }
    res.send(req.body);

});


router.get('/honors', function(req, res){
    res.send('route /api/reports/honors');
});