var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");
var myData;

/* GET clans page. */
router.get("/", function (req, res, next) {
  var userTag = req.query.usertag;
  getJSONTestData(userTag);
  res.render("member", {
    title: "Member",
    memberText: "Member text",
    memberData: myData,
    userTag: userTag,
  });
});

/**
 * Get info about a specific member
 */
function getJSONTestData(userTag) {
  console.log("userTag: " + userTag);
  var properties = PropertiesReader("config/api.properties");
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  fs.readFile("./config/json_member.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // for (let [key, value] of Object.entries(JSON.parse(data))) {
    //   console.log(value.name);
    // }
    myData = JSON.parse(data);
  });
}

/**
 * getJSON - Makes the API call
 * @returns - JSON
 */
const getJSON = () => {
  var properties = PropertiesReader("./config/api.properties");
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const CLAN_TAG = "#" + properties.get("CLAN_TAG");
  const BASE_URL = properties.get("BASE_URL");
  const URL_MEMBERS =
    BASE_URL + "/clans/" + encodeURIComponent(CLAN_TAG) + "/member";
  console.log("URL: " + URL_MEMBERS);
  let reqInstance = axios.create({
    headers: {
      Authorization: `Bearer ${HOME_COC_TOKEN}`,
    },
  });
  reqInstance
    .get(URL_MEMBERS)
    .then((res) => {
      const users = res.data;
      console.table("resdata: " + JSON.stringify(res.data));
      // for(user of users) {
      //   console.log(`Got user with id: ${user.id}, name: ${user.name}`);
      // }
    })
    .catch((err) => {
      console.error("Error: ", err.message);
    });
};

module.exports = router;
