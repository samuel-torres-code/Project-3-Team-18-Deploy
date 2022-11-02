//requirements
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const app = express();
const port = 2000;

//create pool for psql access
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

//process to shutdown pool
process.on('SIGINT', function() {
    pool.end;
    console.log('Application successfully shutdown');
    process.exit(0);
});

// define subclasses of api routines
var server = require('./server.js');
var manager = require("./manager.js");
var checkout = require("./checkout.js");
var login = require("./login.js");

//reroute /api/* to given file
app.use('/api/server', server);
app.use('/api/manager', manager);
app.use('/api/checkout', checkout);
app.use('/api/login', login);




app.get('/api', (req, res) => {
    res.send('default route /api');
});
app.get('/user_test', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM teammembers')
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++) {
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            console.log(teammembers);
            res.render('user', data);
        });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

