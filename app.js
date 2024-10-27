var PropertiesReader = require("properties-reader");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var membersRouter = require("./routes/members");
var memberRouter = require("./routes/member");
var topranksRouter = require("./routes/topranks");
var leaguesRouter = require("./routes/leagues");
var errorRouter = require("./routes/error");
var topPlayersRouter = require("./routes/topplayers");
var clansByName = require("./routes/searchclans");

const { BetaAnalyticsDataClient } = require('@google-analytics/data')

var app = express();

const port = 3001;

// Load Google Analytics Measurement ID and API Secret
let properties = PropertiesReader("./config/api.properties");
const MEASUREMENT_ID = properties.get("MEASUREMENT_ID");

// Initialize the Analytics Data API client
const analyticsDataClient = new BetaAnalyticsDataClient();

// Helper function to send a custom event to Google Analytics
const trackEvent = async (clientId, eventName, params = {}) => {
  try {
    await analyticsDataClient.runReport({
      property: `properties/${MEASUREMENT_ID}`,  // Replace with your property ID
      request: {
        events: [
          {
            name: eventName,
            params: {
              ...params,
              client_id: clientId,
            },
          },
        ],
      },
    });
    console.log(`Event "${eventName}" tracked successfully.`);
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/members", membersRouter);
app.use("/member", memberRouter);
app.use("/topranks", topranksRouter);
app.use("/leagues", leaguesRouter);
app.use("/error", errorRouter);
app.use("/topplayers", topPlayersRouter);
app.use("/searchclans", clansByName);

app.listen(port, function () {
  console.log("Express server listening on port: " + port);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Example endpoint to track a page view
app.get('/trackPage', async (req, res) => {
  const clientId = req.query.clientId || 'default_client_id';
  await trackEvent(clientId, 'page_view', { page_title: 'Home Page' });
  res.send("Page view tracked!");
});

// Example endpoint to track a custom event, like "user_signup"
app.post('/trackSignup', async (req, res) => {
  const clientId = req.body.clientId || 'default_client_id';
  await trackEvent(clientId, 'user_signup', { user_role: 'standard' });
  res.send("Signup event tracked!");
});

module.exports = app;
