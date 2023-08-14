var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");

// TEST - config/json_members.json
const getJSONTestData = (req, res, next) => {
  const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
  fs.readFile(TEST_DATA_DIR + "json_clan.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    req.m = JSON.parse(data);
    next();
  });
}

const getJSONReal = (req, res, next, clantag) => {
  let properties = PropertiesReader("./config/api.properties");
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const BASE_URL = properties.get("BASE_URL");
  const URL_MEMBERS = BASE_URL + "clans/" + encodeURIComponent(clantag);
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
      req.m = "";
      next();
      res.redirect('/error');
    });
};

/**
 * Gets called before all other methods
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getJSON = (req, res, next) => {
  let properties = PropertiesReader("./config/api.properties");
  const DEBUG = properties.get("DEBUG");
  var clantag = req.query.clantag;
  console.log("DEBUG members.js: CLANTAG-> " + clantag + " DEBUG-> " + DEBUG);
  if (DEBUG == true) {
    getJSONTestData(req, res, next);
  } else {
    getJSONReal(req, res, next, clantag);
  }
}

/**
 * Search clans by NAME
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} clanname 
 */
//https://api.clashofstats.com/search/clans?q=old+rebels&minMembers=1&maxMembers=50&locationId=global&minClanLevel=1
const getClanByName = (req, res, next, clanname) => {
  let properties = PropertiesReader("./config/api.properties");
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const BASE_URL = properties.get("BASE_URL");
  const URL_CLAN_BY_NAME = BASE_URL + "clans?name=" + encodeURIComponent("old rebels") + "&minClanLevel=28";
  console.log("getJSON.URL: " + URL_CLAN_BY_NAME);
  let reqInstance = axios.create({
    headers: {
      Authorization: `Bearer ${HOME_COC_TOKEN}`,
    },
  });
  reqInstance
    .get(URL_CLAN_BY_NAME)
    .then((res) => {
      req.m = res.data;
      // console.log('req.m: ' + JSON.stringify(req.m));
      // next();
    })
    .catch((err) => {
      req.m = "";
      // next();
    });
};

// execute before render
router.use(getJSON);
// router.use(getJSONTestDataClanInfo);

/* GET members page. */
router.get("/", function (req, res, next) {
  var showJSON = req.query.showJSON;
  res.render("members", {
    title: "Members",
    membersText: "Old Rebels",
    membersData: req.m.memberList,
    clanName: req.m.name,
    membersDataLen: req.m.length,
    clanInfo: req.c,
    showJSON: showJSON,
    clanBadge: req.m.badgeUrls.large,
    clanWarWins: req.m.warWins,
    clanWarWinStreak: req.m.warWinStreak,
    warLeague: req.m.warLeague.name,
  });
});

module.exports = router;