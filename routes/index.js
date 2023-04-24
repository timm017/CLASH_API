var express = require("express");
var router = express.Router();
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");
const fs = require("fs");

const getJSONTestDataTopClans = (req, res, next) => {
  const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
  fs.readFile(TEST_DATA_DIR + "json_topranks.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = JSON.parse(data);
    data.items.sort(function (a, b) {
      return b.clanPoints - a.clanPoints;
    });
    req.t = data;
    next();
  });
}

// Call function before router is rendered
router.use(getJSONTestDataTopClans);

/* GET home page. */
router.get("/", function (req, res, next) {
  const BASE_URL = properties.get("BASE_URL");
  res.render("index", {
    title: "Clash of Clans Stats and Info: ",
    baseURL: BASE_URL,
    topClansHomeData: req.t.items,
    topPlayersHomeData: req.t.items,
    topVersusHomeData: req.t.items,
  });
});

module.exports = router;