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
    req.c = data;
    next();
  });
}

const getJSONTestDataTopPlayers = (req, res, next) => {
  const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
  fs.readFile(TEST_DATA_DIR + "json_topranks.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = JSON.parse(data);
    data.items.sort(function (a, b) {
      return b.clanPoints - a.clanPoints;
    });
    req.p = data;
    next();
  });
}

const getJSONTestDataTopVersus = (req, res, next) => {
  const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
  fs.readFile(TEST_DATA_DIR + "json_topranks.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = JSON.parse(data);
    data.items.sort(function (a, b) {
      return b.clanPoints - a.clanPoints;
    });
    req.v = data;
    next();
  });
}

// Call function before router is rendered
router.use(getJSONTestDataTopClans);
router.use(getJSONTestDataTopPlayers);
router.use(getJSONTestDataTopVersus);

/* GET home page. */
router.get("/", function (req, res, next) {
  const BASE_URL = properties.get("BASE_URL");
  const SHOW_EXAMPLES = properties.get("DEBUG");
  res.render("index", {
    title: "Search for a clan: ",
    baseURL: BASE_URL,
    topClansHomeData: req.c.items,
    topPlayersHomeData: req.p.items,
    topVersusHomeData: req.v.items,
    showExamples: SHOW_EXAMPLES,
  });
});

module.exports = router;
