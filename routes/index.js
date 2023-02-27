var express = require("express");
var router = express.Router();
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");

/* GET home page. */
router.get("/", function (req, res, next) {
  const BASE_URL = properties.get("BASE_URL");
  res.render("index", {
    title: "Clash of clan stats and info",
    baseURL: BASE_URL
  });
});

module.exports = router;