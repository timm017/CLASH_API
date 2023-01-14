var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");

/**
 * Get info about a specific member
 */
function getJSONTestData(req, res, next) {
  fs.readFile("./config/json_member.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let usertag = req.query.usertag;
    if (usertag == undefined) {
      console.log("userTag undefined");
    } else {
      console.log("userTag: " + usertag);
    }
    req.m = JSON.parse(data);
    next();
  });
}

/**
 * getJSON - Makes the API call
 * @returns - JSON
 */
const getJSON = (userTag) => {
  var properties = PropertiesReader("./config/api.properties");
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  const BASE_URL = properties.get("BASE_URL");
  const URL_MEMBER = BASE_URL + "/players/" + encodeURIComponent("#" + userTag);
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

router.use(getJSONTestData);

/* GET clans page. */
router.get("/", function (req, res, next) {
  var userTag = req.query.usertag;
  // getJSONTestData(userTag);
  // getJSON(userTag);
  res.render("member", {
    title: "Member",
    memberText: "Timothy info",
    memberData: req.m,
    userTag: req.m,
  });
});

module.exports = router;
