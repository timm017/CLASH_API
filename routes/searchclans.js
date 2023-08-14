var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");
const members = require("./members.js");

// TEST - config/json_clans_by_name.json
const getJSONTestData = (req, res, next) => {
    const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
    fs.readFile(TEST_DATA_DIR + "json_clans_by_name.json", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = JSON.parse(data);
        data.items.sort(function (a, b) {
            return b.clanLevel - a.clanLevel;
        });
        req.c = data;
        next();
    });
}

const getJSONReal = (req, res, next, clanname) => {
    let properties = PropertiesReader("./config/api.properties");
    const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
    const BASE_URL = properties.get("BASE_URL");
    const URL_CLANS_BY_NAME = BASE_URL + "clans?name=" + encodeURIComponent(clanname) + "&limit=25";
    console.log("getJSON.URL: " + URL_CLANS_BY_NAME);
    let reqInstance = axios.create({
        headers: {
            Authorization: `Bearer ${HOME_COC_TOKEN}`,
        },
    });
    reqInstance
        .get(URL_CLANS_BY_NAME)
        .then((res) => {
            // req.c = res.data;
            // next();

            res.data.items.sort(function (a, b) {
                return b.clanLevel - a.clanLevel;
            });
            req.c = res.data;
            next();
        })
        .catch((err) => {
            req.c = "";
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
    var clanname = req.query.clanname;
    let properties = PropertiesReader("./config/api.properties");
    const DEBUG = properties.get("DEBUG");
    console.log("CLANNAME searchclans.js: name-> " + clanname + " DEBUG-> " + DEBUG);
    if (DEBUG == true) {
        getJSONTestData(req, res, next);
    } else {
        getJSONReal(req, res, next, clanname);
    }
}

// execute before render
router.use(getJSON);
// router.use(getJSONTestDataClanInfo);

/* GET members page. */
router.get("/", function (req, res, next) {
    var showJSON = req.query.showJSON;
    res.render("searchclans", {
        title: "Clans by Name",
        searchClansText: "Old Rebels",
        searchClansData: req.c.items,
        searchClansDataLen: req.c.length,
        showJSON: showJSON,
    });
});

module.exports = router;