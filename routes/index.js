var express = require("express");
var router = express.Router();
var PropertiesReader = require("properties-reader");

/* GET home page. */
router.get("/", function (req, res, next) {
  let properties = PropertiesReader("./config/api.properties");
  const BASE_URL = properties.get("BASE_URL");
  res.render("index", {
    title: "Clash of clan stats and info",
    baseURL: BASE_URL
  });
});

module.exports = router;