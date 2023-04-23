var express = require("express");
var router = express.Router();
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");
const topRanksUtil = require("../utils/topRanksUtil");

/* GET home page. */
router.get("/", function (req, res, next) {
  const BASE_URL = properties.get("BASE_URL");
  console.log("2TOP: " + topRanksUtil.getTitle());
  res.render("index", {
    title: "Clash of Clans Stats and Info: ",
    baseURL: BASE_URL
  });
});

module.exports = router;