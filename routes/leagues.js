var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");

/**
 * Get info about a specific member
 */
function getJSONTestData(req, res, next) {
  fs.readFile("./config/json_leagues.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    req.l = JSON.parse(data);
    next();
  });
}

/**
 * getJSON - Makes the API call
 * @returns - JSON
 */
const getJSONReal = (req, res, next) => {
  var properties = PropertiesReader("./config/api.properties");
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const BASE_URL = properties.get("BASE_URL");
  const URL_MEMBER = BASE_URL + "/leagues/";
  console.log("URL: " + URL_MEMBER);
  let reqInstance = axios.create({
    headers: {
      Authorization: `Bearer ${HOME_COC_TOKEN}`,
    },
  });
  reqInstance
    .get(URL_MEMBER)
    .then((res) => {
      // console.table("resdata: " + JSON.stringify(res.data));
      myData = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.error("Error: ", err.message);
    });
};

const getJSON = (req, res, next) => {
  let properties = PropertiesReader("./config/api.properties");
  const DEBUG = properties.get("DEBUG"); 
  if(DEBUG == true) {
    console.log("1 DEBUG: " + DEBUG);
    getJSONTestData(req, res, next);
  } else {
    console.log("2 DEBUG: " + DEBUG);
    getJSONReal(req, res, next);
  }
}

router.use(getJSON);

/* GET clans page. */
router.get("/", function (req, res, next) {
  res.render("leagues", {
    title: "Leagues",
    leagueText: "Leagues info",
    leagueData: req.l.items,
  });
});

module.exports = router;
