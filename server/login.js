var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('default route /api/login');
 });


 module.exports = router;