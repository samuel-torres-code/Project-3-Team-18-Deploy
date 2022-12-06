const { response } = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

var express = require('express');
var router = express.Router();
module.exports = router;
var data = {};
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
    res.send('default route /api/server');
});

/**Call to get all the ingredients for the manager table
 * @param req -- blank
 * @param res -- JSON that maps ingredient type names to a list of ingredient
 *              objects that have that type. Each ingredient contains it's
 *              id, type, and name
 */
router.get('/ingredients', function(req, res) {
    //get all ingredients
    var q_string = "SELECT ingredient_id, ingredient_name, ingredient_type FROM ingredients";
    f_response = []
    pool
        .query(q_string)
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++) {
                f_response.push(query_res.rows[i]);
            }
            q_resp = f_response;
            var final_dict = {"Other": [],
                      "Meats": [],
                      "Cheese": [],
                      "RoastedVeggies" : [],
                      "Sauce": [],
                      "Drizzle": [],  
                      "Dough": [],
                      "RawVeggies": []
                    };
            for(let i = 0; i < q_resp.length; i++)
            {
                //create ingredient object for ingredient
                var ing_id = q_resp[i]["ingredient_id"];
                var ing_type = q_resp[i]["ingredient_type"];
                var ing_name = q_resp[i]["ingredient_name"];
                var ing_obj = {"ingredient_id" : ing_id,
                                "ingredient_type" : ing_type,
                                "ingredient_name" : ing_name
                                };
                //add to final dict
                final_dict[ing_type] = final_dict[ing_type].concat([ing_obj]);
            } 
            //send response once populated
            res.send(final_dict);
        });
    
});
/**Returns all menu items.
 * @param req -- blank
 * @param res -- JSON mapping pizza_types, drink_types, and seasonal_item_types, 
 *              to a list of items with that type. Each item includes it's type
 *              and price 
 */
router.get('/types', function(req, res) {
    var final_dict = {"pizza_types": [],
                        "drink_types": [],
                        "seasonal_item_types" : []
    };
    var drink_query = "SELECT * FROM drink_types_web";
    var pizza_query = "SELECT * FROM pizza_types_web";
    var seasonal_query = "SELECT * FROM seasonal_item";

    //get all drinks
    d_response = []
    pool
        .query(drink_query)
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++) {
                d_response.push(query_res.rows[i]);
            }
            for(let i = 0; i < d_response.length; i++)
            {
                //create and add drink types
                var d_price = d_response[i]["drink_price"];
                var d_name = d_response[i]["drink_type"];
                var d_obj = {"drink_type" : d_name,
                                "drink_price": d_price};
                final_dict["drink_types"] = final_dict["drink_types"].concat([d_obj]);

            }
            //get all pizza types
            p_response = []
            pool
            .query(pizza_query)
            .then(query_res => {
                for(let i = 0; i < query_res.rowCount; i++) {
                    p_response.push(query_res.rows[i]);
                }
                for(let i = 0; i < p_response.length; i++)
                {
                    //get and add pizza types
                    var p_price = p_response[i]["pizza_price"];
                    var p_name = p_response[i]["pizza_type"];
                    var p_obj = {"pizza_type" : p_name,
                                    "pizza_price": p_price};
                    final_dict["pizza_types"] = final_dict["pizza_types"].concat([p_obj]);
                }
                s_response = []
                pool
                .query(seasonal_query)
                .then(query_res => {
                    for(let j = 0; j < query_res.rowCount; j++)
                    {
                        s_response.push(query_res.rows[j]);
                    }
                    for(let j = 0; j < s_response.length; j++)
                    {
                        var s_price = s_response[j]["item_price"];
                        var s_name = s_response[j]["item_name"];
                        var s_obj = {"item_name" : s_name, 
                                        "item_price" : s_price};
                        final_dict["seasonal_item_types"] = final_dict["seasonal_item_types"].concat([s_obj]);
                    }
                    res.send(final_dict)
                });
                //send final types
            });

        });
    


});
