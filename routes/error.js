var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");


/* GET clans page. */
router.get("/", function (req, res, next) {
  res.render("error", {
    title: "Error",
    errorMessage: "Error message",
  });
});

module.exports = router;
