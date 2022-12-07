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

/*router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    next();
});*/

/** This function determines if the user entered a valid username, whether an employee or non-employee
 *  Automatically checks either employee credentials or customer credentials depending on the login checkbox
 */
router.post('/', (req, res, next) => {
    data = [];
    let send = false;
    if(req.body.emp === "true"){
        var queryString = "SELECT * FROM employees_web where emp_name='" + req.body.user +"';"
        pool.query(queryString).then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++) {
                if((query_res.rows[i].passcode === req.body.password) && (query_res.rows[i].is_manager === true)){
                    send = true;
                    data.push(true);
                    data.push(true);
                    data.push(query_res.rows[i].emp_id);
                    return res.send(data);
                }
                else if(query_res.rows[i].passcode === req.body.password){
                    send = true;
                    data.push(true);
                    data.push(false);
                    data.push(query_res.rows[i].emp_id);
                    return res.send(data);
                }
            }
            data.push(false);
            data.push(false);
            data.push(-1);
            return res.send(data);
        });
    }
    else{
        //IF USERNAME DOES NOT EXIST WE GET AN ERROR. LOGGING IN WITH EMAIL NEVER TAKEN CARE OF BC OF THIS
            var queryString = "SELECT * FROM users_web where username='" + req.body.user +"';";
            pool.query(queryString).then(query_res => {
                for(let i = 0; i < query_res.rowCount; i++) {
                    if((query_res.rows[i].password === req.body.password) && (!send)){
                        send = true;
                        return res.send(send);
                    }
                }
                if(!send){
                    return res.send(send);
                }
            });
        }
});

/** Check and see if the user provided an email address and allow them to login if valid info is given
 *  This function will be checked AFTER it is confirmed that the user did not enter a username
 */
router.post('/email', (req, res, next) => {
    var queryStringTwo = "SELECT * FROM users_web where email='" + req.body.email + "';";
    var send = false;
    pool.query(queryStringTwo).then(query_res => {
        for(let i = 0; i < query_res.rowCount; i++) {
            if(query_res.rows[i].password === req.body.password){
                send = true;
                return res.send(true);
            }
        }
        if(!send)
            return res.send(false);
    });
})

/** Check if user exists within the database and allow them access if they do
 *  This function is for Google Sign-In only
 */
router.post('/google/login', (req, res, next) => {
    var queryStringTwo = "SELECT * FROM users_web_oauth where email='" + req.body.email + "';";
    var send = false;
    pool.query(queryStringTwo).then(query_res => {
        for(let i = 0; i < query_res.rowCount; i++) {
            if(query_res.rows[i].email === req.body.email){
                send = true;
                return res.send(true);
            }
        }
        if(!send){
            return res.send(false);
        }
            
    });
})

/** If user has failed to login automatically with google, create an account and allow access
 */
router.post('/google/login/secondary', (req, res, next) => {
    var queryStringTwo = "insert into users_web_oauth (username, email) values ('" + req.body.user + "', '" + req.body.email + "');";
    pool.query(queryStringTwo).then(query_res => {
        return res.send(true);
    });
})

router.get('/', function(req, res){
    res.send('default route /api/login');
});