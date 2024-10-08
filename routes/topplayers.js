var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");

// TEST - config/json_members.json
const getJSONTestData = (req, res, next) => {
    const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
    fs.readFile(TEST_DATA_DIR + "json_top_players.json", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        req.m = JSON.parse(data);
        next();
    });
}

const getJSONReal = (req, res, next) => {
    let properties = PropertiesReader("./config/api.properties");
    const LIMIT = 100;
    const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
    const BASE_URL = properties.get("BASE_URL");
    const LEGEND_LEAGUE_ID = properties.get("LEGEND_LEAGUE_ID");
    const today = new Date();
    let month = today.getMonth();
    if (month < 10) {
        month = "0" + month;
    }
    const season = today.getFullYear() + "-" + month;
    const URL_TOP_PLAYERS = BASE_URL + "leagues/" + LEGEND_LEAGUE_ID + "/seasons/" + season + "?limit=" + LIMIT;
    console.log("topplayers-> getJSON.URL: " + URL_TOP_PLAYERS);
    let reqInstance = axios.create({
        headers: {
            Authorization: `Bearer ${HOME_COC_TOKEN}`,
        },
    });
    reqInstance
        .get(URL_TOP_PLAYERS)
        .then((res) => {
            req.m = res.data;
            // console.log(req.m);
            next();
        })
        .catch((err) => {
            req.m = "";
            console.error(err);  // Log the error for debugging
            // next();
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
    console.log("DEBUG topplayers.js: " + DEBUG);
    if (DEBUG == true) {
        getJSONTestData(req, res, next);
    } else {
        getJSONReal(req, res, next);
    }
}

// execute before render
router.use(getJSON);
// router.use(getJSONTestDataClanInfo);

/* GET top players page. */
router.get("/", function (req, res, next) {
    var showJSON = req.query.showJSON;
    res.render("topplayers", {
        title: "Top Players",
        topPlayersText: "Old Rebels",
        topPlayersData: req.m.items,
        topPlayersDataLen: req.m.length,
        showJSON: showJSON,
    });
});

module.exports = router;