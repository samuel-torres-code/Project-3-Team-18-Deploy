var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const app = express();

app.use()

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

app.post('/api/user/login', (req, res) => {
    data = [];
    /*pool
        .query('insert into users_web (user_id, username, password, email) VALUES (DEFAULT, 1, 1, 1) returning user_id as userID;');
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                data.push(query_res.rows[i]);
            }
            const data = {data: data};
            console.log(data);
            res.render('user', data);        
        });*/
    console.log("Username: %s", req.body.email);
});

router.get('/', function(req, res){
    res.send('default route /api/login');
});

app.listen(2000, () => {console.log("Server started on port 2000")});


module.exports = router;