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

router.get('/sales', function(req, res){
    res.send('route /api/reports/sales');
});

router.get('/excess', function(req, res){
    res.send('route /api/reports/excess');
});

router.get('/restock', function(req, res){
    res.send('route /api/reports/restock');
});

router.get('/restock_all', function(req, res){
    res.send('route /api/reports/resock_all');
});

router.post('/add_seasonal_item', function(req, res){
    res.send('route /api/reports/add_seasonal_item');
});

router.post('/remove_seasonal_item', function(req, res){
    res.send('route /api/reports/remove_seasonal_item');
});


router.get('/honors', function(req, res){
    res.send('route /api/reports/honors');
});