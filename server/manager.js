var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('default route /api/manager');
 });


 router.get('/load_ingredients', function(req, res){
    //TODO
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