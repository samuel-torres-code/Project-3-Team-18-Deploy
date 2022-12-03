var express = require("express");
var router = express.Router();

//psql
const { Pool } = require("pg");
const dotenv = require("dotenv").config();
const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: { rejectUnauthorized: false },
});

router.get("/", function (req, res) {
  res.send("default route /api/manager");
});

router.get("/load_ingredients", function (req, res) {
  var query_string =
    "SELECT ingredient_name, ingredient_type," +
    " ingredient_inventory from ingredients_web";
  //query ingredients
  f_response = [];
  pool.query(query_string).then((query_res) => {
    for (let i = 0; i < query_res.rowCount; i++) {
      f_response.push(query_res.rows[i]);
    }
    final_obj = [];
    for (let i = 0; i < f_response.length; i++) {
      //add relevant info to final array
      var i_name = f_response[i]["ingredient_name"];
      var i_type = f_response[i]["ingredient_type"];
      var i_invent = f_response[i]["ingredient_inventory"];
      final_obj.push([i_name, i_type, i_invent]);
    }
    //once populated, send
    res.send(final_obj);
  });
});

router.get("/load_prices", function (req, res) {
  //duplicate functionality as server side
  var final_dict = { pizza_types: [], drink_types: [], seasonal_items: [] };
  var drink_query = "SELECT * FROM drink_types_web";
  var pizza_query = "SELECT * FROM pizza_types_web";
  var seasonal_query = "SELECT * FROM seasonal_item";

  d_response = [];
  pool.query(drink_query).then((query_res) => {
    for (let i = 0; i < query_res.rowCount; i++) {
      d_response.push(query_res.rows[i]);
    }
    for (let i = 0; i < d_response.length; i++) {
      var d_price = d_response[i]["drink_price"];
      var d_name = d_response[i]["drink_type"];
      var d_obj = { drink_type: d_name, drink_price: d_price };
      final_dict["drink_types"] = final_dict["drink_types"].concat([d_obj]);
    }
    p_response = [];
    pool.query(pizza_query).then((query_res) => {
      for (let i = 0; i < query_res.rowCount; i++) {
        p_response.push(query_res.rows[i]);
      }
      for (let i = 0; i < p_response.length; i++) {
        var p_price = p_response[i]["pizza_price"];
        var p_name = p_response[i]["pizza_type"];
        var p_obj = { pizza_type: p_name, pizza_price: p_price };
        final_dict["pizza_types"] = final_dict["pizza_types"].concat([p_obj]);
      }
      s_response = [];
      pool.query(seasonal_query).then((query_res) => {
        for (let j = 0; j < query_res.rowCount; j++) {
          s_response.push(query_res.rows[j]);
        }
        for (let j = 0; j < s_response.length; j++) {
          var s_price = s_response[j]["item_price"];
          var s_name = s_response[j]["item_name"];
          var s_obj = { item_name: s_name, item_price: s_price };
          final_dict["seasonal_items"] = final_dict["seasonal_items"].concat([
            s_obj,
          ]);
        }
        res.send(final_dict);
      });
    });
  });
});

router.post("/restock", function (req, res) {
  //add inventory amount to existing value
  var ingredients_dec_query =
    "UPDATE ingredients_web set ingredient_inventory" +
    " = ingredient_inventory + $1 WHERE ingredient_name = $2";
  // res.json({requestBody: req.body});
  var ingredient_ids = req.body["ingredients"];
  var amount = req.body["amount"];
  for (let i = 0; i < ingredient_ids.length; i++) {
    pool.query(ingredients_dec_query, [amount, ingredient_ids[i]]);
  }
});

router.post("/add_ingredient", function (req, res) {
  //add new ingredient to database
  // res.json({requestBody: req.body});
  var ingredient_name = req.body["ingredient_name"];
  var ingredient_type = req.body["ingredient_type"];

  var add_ing_query =
    "INSERT INTO ingredients_web (ingredient_name, ingredient_type," +
    " ingredient_inventory) VALUES ($1, $2, $3)";
  pool.query(add_ing_query, [ingredient_name, ingredient_type, 0]);
});

router.post("/remove_ingredient", function (req, res) {
  //remove ingredients from db
  // res.json({requestBody: req.body});
  var ingredient_names = req.body["ingredients"];
  var remove_ing_query =
    "DELETE FROM ingredients_web WHERE ingredient_name = $1";
  for (let i = 0; i < ingredient_names.length; i++) {
    pool.query(remove_ing_query, [ingredient_names[i]]);
  }
});

router.get("/load_menu_items", function (req, res) {
  //very similar to get_prices, but all items are under "menu_items" key with only name, price.
  var final_dict = { menu_items: [] };
  var drink_query = "SELECT * FROM drink_types_web";
  var pizza_query = "SELECT * FROM pizza_types_web";
  var seasonal_query = "SELECT * FROM seasonal_item";

  d_response = [];
  pool.query(drink_query).then((query_res) => {
    for (let i = 0; i < query_res.rowCount; i++) {
      d_response.push(query_res.rows[i]);
    }
    for (let i = 0; i < d_response.length; i++) {
      var d_price = d_response[i]["drink_price"];
      var d_name = d_response[i]["drink_type"];
      final_dict["menu_items"].push([d_name, d_price]);
    }
    p_response = [];
    pool.query(pizza_query).then((query_res) => {
      for (let i = 0; i < query_res.rowCount; i++) {
        p_response.push(query_res.rows[i]);
      }
      for (let i = 0; i < p_response.length; i++) {
        var p_price = p_response[i]["pizza_price"];
        var p_name = p_response[i]["pizza_type"];
        final_dict["menu_items"].push([p_name, p_price]);
      }
      s_response = [];
      pool.query(seasonal_query).then((query_res) => {
        for (let j = 0; j < query_res.rowCount; j++) {
          s_response.push(query_res.rows[j]);
        }
        for (let j = 0; j < s_response.length; j++) {
          var s_price = s_response[j]["item_price"];
          var s_name = s_response[j]["item_name"];
          final_dict["menu_items"].push([s_name, s_price]);
        }
        res.send(final_dict);
      });
    });
  });
});

router.post("/update_menu_items", function (req, res) {
  //TODO
  // res.json({requestBody: req.body});
  var menu_items = req.body["menu_items"];
  var new_price = req.body["new_price"];

  //brute force set through each table
  // assumes menu item names are distinct between all tables
  var update_pizzas =
    "UPDATE pizza_types_web SET pizza_price = $1 where pizza_type = $2";
  var update_drinks =
    "UPDATE drink_types_web SET drink_price = $1 where drink_type = $2";
  var update_seasonal =
    "UPDATE seasonal_item SET item_price = $1 where item_name = $2";
  //TODO -- update seasonal as well
  for (let i = 0; i < menu_items.length; i++) {
    pool.query(update_pizzas, [new_price, menu_items[i]]);
    pool.query(update_drinks, [new_price, menu_items[i]]);
    pool.query(update_seasonal, [new_price, menu_items[i]]);
  }
});

router.post("/addEmployee", function (req, res) {
  var query =
    "insert into employees_web (emp_name, is_manager, passcode) VALUES ('" +
    req.body.emp +
    "','" +
    req.body.status +
    "'," +
    req.body.pass +
    ") returning emp_name as employee;";
  var finduser =
    "SELECT * FROM employees_web WHERE emp_name='" + req.body.emp + "';";
  var findPass =
    "SELECT * FROM employees_web WHERE passcode='" + req.body.pass + "';";
  var foundUser = false;
  pool.query(finduser).then((query_res) => {
    for (let i = 0; i < query_res.rowCount; i++) {
      if (query_res.rows[i].emp_name === req.body.emp) {
        founduser = true;
        return res.send(false);
      }
    }

    if (!foundUser) {
      pool.query(findPass).then((query_res) => {
        for (let i = 0; i < query_res.rowCount; i++) {
          if (query_res.rows[i].passcode === req.body.pass) {
            foundUser = true;
            return res.send(false);
          }
        }

        if (!foundUser) {
          pool.query(query).then((query_res) => {
            for (let i = 0; i < query_res.rowCount; i++) {
              if (query_res.rows[i].employee === req.body.emp) {
                foundUser = true;
                return res.send(true);
              }
            }
          });
        }
      });
    }
  });
});

router.post("/add_seasonal_item", async function (req, res) {
  //process req
  var item_name = req.body["item_name"];
  var ingredients = req.body["ingredients"];
  var price = req.body["price"];
  //query for ingredients to map to ids
  var ingredients_query =
    "select ingredient_name, ingredient_id from ingredients_web";
  mapped_ingredients = {};
  await pool.query(ingredients_query).then((query_res) => {
    for (let i = 0; i < query_res.rowCount; i++) {
      var ing_name = query_res.rows[i]["ingredient_name"];
      var ing_id = query_res.rows[i]["ingredient_id"];
      mapped_ingredients[ing_name] = ing_id;
    }
  });
  var ingredients_to_send = [];
  for (let i = 0; i < ingredients.length; i++) {
    ingredients_to_send.push(mapped_ingredients[ingredients[i]]);
  }

  //query new seasonal_item
  var seasonal_query =
    "insert into seasonal_item(item_name, item_price, item_ingredients)" +
    "VALUES ($1, $2, $3)";
  pool.query(seasonal_query, [item_name, price, ingredients_to_send]);
  console.log(ingredients_to_send);
  res.send({});
});

module.exports = router;
