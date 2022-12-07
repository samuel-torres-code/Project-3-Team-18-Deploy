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

/**Performs a checkout
 * @function
 * @name api/checkout
 * @param req -- JSON -- "order" contains employee ID and customer name.
 *                       "pizzas", "drinks", and "seasonal_items" contain
 *                          items ordered, including price for all, and 
 *                          ingredients included for pizzas
 * @param res  -- JSON that contains order id and order time.
 */
router.post('/', function(req, res){
    //extract main elements
    var order_details = req.body["order"];
    var pizza_details = req.body["pizzas"];
    var drink_details = req.body["drinks"];
    var seasonal_details = req.body["seasonal_items"];
    //update order table
    var order_insert = "INSERT INTO orders_web (emp_id, cust_name, order_num, time_stamp)"  +
                        "VALUES ($1, $2, $3, Now()) RETURNING order_id, cast(time_stamp as time)";
    var emp_id = order_details["emp_id"]
    var cust_name = order_details["cust_name"];
    var order_num = -1;
    //create order query
    pool.query(order_insert, [emp_id, cust_name, order_num], async (error, id) => 
    {
        //extract id

        var order_id = id['rows'][0]['order_id'];
        var order_time_resp = id['rows'][0]['time_stamp'].split(":");
        var order_time = {hours: order_time_resp[0], mins: order_time_resp[1]};
        var response_obj = {'order_id': order_id, 
                            'order_time_hours': order_time['hours'],
                            'order_time_mins': order_time['mins']
                        };
        res.json(response_obj)


        //send pizzas with order id
        var pizza_query = "INSERT INTO pizzas_web (order_id, pizza_type, pizza_price)" +  
                            "VALUES ($1, $2, $3) RETURNING pizza_id";
        for(let i = 0; i < pizza_details.length; i++)
        {
            var pizza_price = pizza_details[i]["pizza_price"];
            var pizza_type = pizza_details[i]["pizza_type"];
            var ingredients = pizza_details[i]["ingredients"];
            pool.query(pizza_query, [order_id, pizza_type, pizza_price], (p_error, p_id) =>
            {
                //send ingredients with pizza id
                var pizza_id = p_id['rows'][0]['pizza_id'];
                //TODO -- check whether ingredients  contains id
                var ingredients_join_query = "INSERT INTO ingredients_join_web" +
                                            "(pizza_id, ingredient_id) VALUES ($1, $2)";
                var ingredients_query = "UPDATE ingredients_web set ingredient_inventory" + 
                                        " = ingredient_inventory - 1 WHERE ingredient_id = $1";
                for(let j = 0; j < ingredients.length; j++)
                {
                    // ingredients_join table update
                    pool.query(ingredients_join_query, [pizza_id, ingredients[j]["ingredient_id"]]);
                    //ingredients table update
                    pool.query(ingredients_query, [ingredients[j]["ingredient_id"]]);
                }
            });
        }

        //update drinks with order_id
        var drink_query = "INSERT INTO drinks_web (order_id, drink_type, drink_price)" +
                            " VALUES ($1, $2, $3)";
        for(let k = 0; k < drink_details.length; k++)
        {
            //assuming drink is object with drink_type, drink_price;
            var drink_price = drink_details[k]["drink_price"];
            var drink_type = drink_details[k]["drink_type"];
            pool.query(drink_query, [order_id, drink_type, drink_price]);
        }

        //update seasonal items with drink query
        //first, grab seasonal item ingredients:
        var seasonal_query = "select * from seasonal_item";
        var seasonal_mapping = {};
        await pool.query(seasonal_query).then(seasonal_res => {
            for(let i = 0; i < seasonal_res.rowCount; i++){
                var item_name = seasonal_res.rows[i]["item_name"];
                var ing_included = seasonal_res.rows[i]["item_ingredients"];
                seasonal_mapping[item_name] = ing_included;
            }
        });
        //mapping done, now generate pizza_ids for each seasonal_item
        var pizza_query = "INSERT INTO pizzas_web (order_id, pizza_type, pizza_price)" +  
                            "VALUES ($1, $2, $3) RETURNING pizza_id, pizza_type";
        for(let i = 0; i < seasonal_details.length; i++)
        {
            var curr_item = seasonal_details[i]["item_name"];
            var item_price = seasonal_details[i]["item_price"];
            pool.query(pizza_query, [order_id, curr_item, item_price], (p_error, p_id) => {
                var pizza_id = p_id['rows'][0]['pizza_id'];
                var pizza_name = p_id['rows'][0]['pizza_type'];

                //now have pizza id, associate ingredients in seasonal_item with pizza in ingredients_join_web
                var ingredients_join_query = "INSERT INTO ingredients_join_web" +
                                            "(pizza_id, ingredient_id) VALUES ($1, $2)";
                var ingredients_query = "UPDATE ingredients_web set ingredient_inventory" + 
                                        " = ingredient_inventory - 1 WHERE ingredient_id = $1";
                var ings_in_item = seasonal_mapping[pizza_name];
                for(let j = 0; j < ings_in_item.length; j++)
                {
                    pool.query(ingredients_join_query, [pizza_id,ings_in_item[j] ]);
                    pool.query(ingredients_query, [ings_in_item[j]]);
                }
            });
        }
    });

    

 });


 module.exports = router;