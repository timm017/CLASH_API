const fs = require("fs");
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("./config/api.properties");

const printTest = () => {
    return "printTest";
}

const getJSONTestData = () => {
    const TEST_DATA_DIR = properties.get("TEST_DATA_DIR");
    fs.readFile(TEST_DATA_DIR + "json_topranks.json", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // data = JSON.parse(data);
        // data.items.sort(function (a, b) {
        //     return b.clanPoints - a.clanPoints;
        // });
        return data;
    });
}

module.exports = {
    printTest,
    getJSONTestData
};