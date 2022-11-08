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
    data = [];
    let send = false;
    var queryString = "SELECT * FROM users_web where username='" + req.body.user +"';";
    pool.query(queryString).then(query_res => {
        res = query_res;
        if(query_res.rowCount > 0){
            send = true;
        }
        else{
            send = false;
        }
    });
    if(!send){
        var queryStringTwo = "select * from users_web where email='" + req.body.email + "';";
        pool.query(queryStringTwo).then(query_res => {
                if(query_res.rowCount > 0)
                    send = true;
        });
    }
    console.log(queryString);
    res.send(send);

    //'insert into users_web (username, password, email) VALUES (1, 1, 1) returning user_id as userID;'
});

router.get('/', function(req, res){
    res.send('default route /api/login');
});
