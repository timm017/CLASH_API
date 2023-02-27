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
    // data =  JSON.parse(data);
    // data = data.sort((a, b) => {
    //   if (a.clanPoints < b.clanPoints) {
    //     return -1;
    //   }
    // });
    req.t = JSON.parse(data);
    next();
  });
}

/**
 * getJSON - Makes the API call
 * https://api.clashofclans.com/v1/clans?minClanPoints=55000&minClanLevel=10&limit=5
 * @returns - JSON
 */
const getJSON = (userTag) => {
  var properties = PropertiesReader("./config/api.properties");
  const minClanPoints = 55000;
  const minClanLevel = 10;
  const limit = 5;
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const BASE_URL = properties.get("BASE_URL");
  const URL_MEMBER = BASE_URL + "/clans?minClanPoints=" + minClanPoints + "&minClanLevel=" + minClanLevel + "&limit=" + limit;
  let reqInstance = axios.create({
    headers: {
      Authorization: `Bearer ${HOME_COC_TOKEN}`,
    },
  });
  reqInstance
    .get(URL_MEMBER)
    .then((res) => {
      myData = JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.error("Error: ", err.message);
    });
};

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
