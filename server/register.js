var express = require('express');
const dotenv = require('dotenv').config();
const { Pool } = require('pg');

var router = express.Router();
module.exports = router;

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    next();
});

router.post('/', (req, res, next) => {
    let send = false;
    var queryString = "insert into users_web (username, password, email) VALUES ('" + req.body.user + "', '" + req.body.pass + "', '" + req.body.email + "') returning username as username;";
    var finduser = "SELECT * FROM users_web WHERE email='" + req.body.email + "';";
    pool.query(finduser).then(query_res => {
        for(let i = 0; i < query_res.rowCount; i++) {
            if((query_res.rows[i].email === req.body.email)){
                send = true;
                res.send(false);
            }
        }

        if(!send){
            pool.query(queryString).then(query_res => {
                for(let i = 0; i < query_res.rowCount; i++) {
                    if((query_res.rows[i].username === req.body.user)){
                        send = true;
                        res.send(true);
                    }
                }
            });
        }
    });
});

router.get('/', function(req, res){
    res.send('default route /api/register');
});
