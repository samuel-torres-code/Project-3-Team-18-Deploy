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
    //TODO
 });

 
 router.get('/add_inventory', function(req, res){
    //TODO
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