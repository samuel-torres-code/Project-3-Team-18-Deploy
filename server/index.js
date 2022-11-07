const express = require('express');
var router = express.Router();
const app = express();
const port = 2000;
const cors = require('cors');
var corsOptions ={
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200
}

// define subclasses of api routines
var server = require('./server.js');
var manager = require("./manager.js");
var checkout = require("./checkout.js");
var login = require("./login.js");
var register = require("./register.js");

//reroute /api/* to given file
app.use('/api/server', server);
app.use('/api/manager', manager);
app.use('/api/checkout', checkout);
app.use('/api/login', login);
app.use('/api/register', register);
app.use(cors(corsOptions));



app.get('/api', (req, res) => {
    res.send('default route /api');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = router;