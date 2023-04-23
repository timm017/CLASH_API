var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");

/**
 * TEST data for top ranked clans by points (trophies)
 * config/json_topranks.json
 */
const getJSONTestData = (req, res, next) => {
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

/**
 * getJSON - Makes the API call
 * https://api.clashofclans.com/v1/clans?minClanPoints=55000&minClanLevel=10&limit=5
 * @returns - JSON
 */
const getJSONReal = (req, res, next) => {
  var properties = PropertiesReader("./config/api.properties");
  const minClanPoints = 57000;
  const minClanLevel = 10;
  const limit = 45;
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const BASE_URL = properties.get("BASE_URL");
  const URL_CLANS = BASE_URL + "clans?minClanPoints=" + minClanPoints + "&minClanLevel=" + minClanLevel + "&limit=" + limit;
  console.log("URL_CLANS: " + URL_CLANS);
  let reqInstance = axios.create({
    headers: {
      Authorization: `Bearer ${HOME_COC_TOKEN}`,
    },
  });
  reqInstance
    .get(URL_CLANS)
    .then((res) => {
      console.log('myData: ' + res.data);
      // sort by clan points
      res.data.items.sort(function (a, b) {
        return b.clanPoints - a.clanPoints;
      });
      req.t = res.data;
      next();
    })
    .catch((err) => {
      console.error("Error: ", err.message);
    });
};

const getJSON = (req, res, next) => {
  topranks.printTest;
  let properties = PropertiesReader("./config/api.properties");
  const DEBUG = properties.get("DEBUG");
  console.log("DEBUG leagues: " + DEBUG);
  if (DEBUG == true) {
    getJSONTestData(req, res, next);
  } else {
    getJSONReal(req, res, next);
  }
}

// Call function before router is rendered
router.use(getJSON);

/* GET clans page. */
router.get("/", function (req, res, next) {
  res.render("topranks", {
    title: "Top Ranks",
    topranksText: "Top Ranked Clans",
    topranksData: req.t.items,
  });
});

module.exports = router;;