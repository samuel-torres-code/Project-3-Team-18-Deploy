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