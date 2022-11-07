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
    console.log(data);
    res.send('default route /api/server');
 });

router.get('/ingredients', function(req, res) {
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
                var ing_id = q_resp[i]["ingredient_id"];
                var ing_type = q_resp[i]["ingredient_type"];
                var ing_name = q_resp[i]["ingredient_name"];
                var ing_obj = {"ingredient_id" : ing_id,
                                "ingredient_type" : ing_type,
                                "ingredient_name" : ing_name
                                };
                final_dict[ing_type] = final_dict[ing_type].concat([ing_obj]);
            } 
            res.send(final_dict);
        });
    
});

router.get('/types', function(req, res) {
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

function query(query_string) {
    f_response = []
    pool
        .query(query_string)
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++) {
                f_response.push(query_res.rows[i]);
            }
            data = f_response;
        });
}