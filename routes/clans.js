var express = require("express");
const axios = require("axios");
var router = express.Router();
const fs = require("fs");
var PropertiesReader = require("properties-reader");

/* GET clans page. */
router.get("/", function (req, res, next) {
  getJSONTestData();
  res.render("clans", {
    title: "Clans",
    clans: "clans text",
    data: getJSONTestData(),
  });
});

//{"items":[
//{"tag":"#RC8VU9G8","name":"mic","role":"coLeader","expLevel":261,
//"league":{"id":29000022,"name":"Legend League",
//"iconUrls":{"small":"https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png","tiny":"https://api-assets.clashofclans.com/leagues/36/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png","medium":"https://api-assets.clashofclans.com/leagues/288/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png"}},
//"trophies":5512,"versusTrophies":4841,"clanRank":1,"previousClanRank":1,"donations":12666,"donationsReceived":11316}
const getJSONTestData = () => {
  var properties = PropertiesReader("config/api.properties");
  const HOME_COC_TOKEN = properties.get("HOME_COC_TOKEN");
  fs.readFile("./config/jsontest.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("token: " + HOME_COC_TOKEN);
  });
};

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
    BASE_URL + "/clans/" + encodeURIComponent(CLAN_TAG) + "/members";
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
