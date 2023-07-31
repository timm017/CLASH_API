var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");

/**
 * Get info about a specific member
 */
function getJSONTestData(req, res, next) {
  const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
  fs.readFile(TEST_DATA_DIR + "json_leagues.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    req.l = JSON.parse(data);
    let sortedData = req.l.items.sort((a, b) => {
      if (a.id > b.id) {
        return -1;
      }
    });
    req.l = sortedData;
    next();
  });
}

/**
 * getJSON - Makes the API call
 * @returns - JSON
 */
const getJSONReal = (req, res, next) => {
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const BASE_URL = properties.get("BASE_URL");
  const URL_LEAGUES = BASE_URL + "leagues/";
  console.log("URL: " + URL_LEAGUES);
  let reqInstance = axios.create({
    headers: {
      Authorization: `Bearer ${HOME_COC_TOKEN}`,
    },
  });
  reqInstance
    .get(URL_LEAGUES)
    .then((res) => {
      myData = JSON.parse(JSON.stringify(res.data));
      req.l = res.data.items.sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        }
      });
      next();
    })
    .catch((err) => {
      console.error("Error: ", err.message);
    });
};

const getJSON = (req, res, next) => {
  let properties = PropertiesReader("./config/api.properties");
  const DEBUG = properties.get("DEBUG");
  console.log("DEBUG leagues: " + DEBUG);
  if(DEBUG == true) {
    getJSONTestData(req, res, next);
  } else {
    getJSONReal(req, res, next);
  }
}

router.use(getJSON);

/* GET clans page. */
router.get("/", function (req, res, next) {
  res.render("leagues", {
    title: "Leagues",
    leagueText: "Leagues info",
    leagueData: req.l,
  });
});

module.exports = router;
