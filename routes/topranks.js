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
const getJSONTestDataTrophies = (req, res, next) => {
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
 * Test data by level
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getJSONTestDataLvl = (req, res, next) => {
  const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
  fs.readFile(TEST_DATA_DIR + "json_toplvlclans.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = JSON.parse(data);
    data.items.sort(function (a, b) {
      return b.clanLevel - a.clanLevel;
    });
    req.t = data;
    next();
  });
}

/**
 * Top clans by trophies
 * getJSON - Makes the API call
 * https://api.clashofclans.com/v1/clans?minClanPoints=55000&minClanLevel=10&limit=5
 * @returns - JSON
 */
const getJSONRealTrophies = (req, res, next) => {
  var properties = PropertiesReader("./config/api.properties");
  const minClanPoints = 45000;
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

/**
 * Top clans by level
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getJSONRealLvl = (req, res, next) => {
  var properties = PropertiesReader("./config/api.properties");
  const minClanLevel = 37;
  const limit = 20;
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const BASE_URL = properties.get("BASE_URL");
  const URL_CLANS = BASE_URL + "clans?minClanLevel=" + minClanLevel + "&limit=" + limit;
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
      // sort by clan lvl
      res.data.items.sort(function (a, b) {
        return b.clanLevel - a.clanLevel;
      });
      req.t = res.data;
      next();
    })
    .catch((err) => {
      console.error("Error: ", err.message);
    });
};

/**
 * Called for every request
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getJSON = (req, res, next) => {
  var mode = req.query.mode;
  let properties = PropertiesReader("./config/api.properties");
  const DEBUG = properties.get("DEBUG");
  console.log("DEBUG leagues: " + DEBUG + " mode: " + mode);
  if(mode == "lvl") {
    if (DEBUG == true) {
      getJSONTestDataLvl(req, res, next);
    } else {
      getJSONRealLvl(req, res, next);
    }
  } else {
    if (DEBUG == true) {
      getJSONTestDataTrophies(req, res, next);
    } else {
      getJSONRealTrophies(req, res, next);
    }
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

module.exports = router;