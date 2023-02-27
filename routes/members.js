var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");

// TEST - config/json_members.json
const getJSONTestData = (req, res, next) => {
  const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
  fs.readFile(TEST_DATA_DIR + "json_members.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    req.m = JSON.parse(data);
    next();
  });
}

/**
 * getJSON - Makes the API call
 * @returns - JSON
 */
const getJSONReal = (req, res, next) => {
  let properties = PropertiesReader("./config/api.properties");
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const CLAN_TAG = properties.get("CLAN_TAG");
  const BASE_URL = properties.get("BASE_URL");
  const URL_MEMBERS = BASE_URL + "clans/" + encodeURIComponent(CLAN_TAG) + "/members";
  console.log("getJSON.URL: " + URL_MEMBERS);
  let reqInstance = axios.create({
    headers: {
      Authorization: `Bearer ${HOME_COC_TOKEN}`,
    },
  });
  reqInstance
    .get(URL_MEMBERS)
    .then((res) => {
      req.m = res.data;
      next();
    })
    .catch((err) => {
      console.error("Error: ", err.message);
    });
};

const getJSON = (req, res, next) => {
  let properties = PropertiesReader("./config/api.properties");
  const DEBUG = properties.get("DEBUG");
  console.log("DEBUG members.js: " + DEBUG); 
  if(DEBUG == true) {
    getJSONTestData(req, res, next);
  } else {
    getJSONReal(req, res, next);
  }
}

// execute before render
router.use(getJSON);

/* GET members page. */
router.get("/", function (req, res, next) {
  res.render("members", {
    title: "Members",
    membersText: "Old Rebels",
    membersData: req.m.items,
  });
});

module.exports = router;
