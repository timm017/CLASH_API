var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");

// TEST - config/json_members.json
const getJSONTestData = (req, res, next) => {
  fs.readFile("./config/json_members.json", "utf8", function (err, data) {
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
const getJSON = (req, res, next) => {
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
      //req.m =  JSON.parse(JSON.stringify(res.data));
      req.m = res.data;
      next();
    })
    .catch((err) => {
      console.error("Error: ", err.message);
    });
};

// execute before render
router.use(getJSON);

/* GET members page. */
router.get("/", function (req, res, next) {
  res.render("members", {
    title: "Members",
    membersText: "Old Rebels",
    memberData: req.m.items,
  });
});

module.exports = router;
