# CLASH_API
Clash of clans API to display information about the game.

Create "config" folder add "api.properties" (contains keys/tokens).

# TODO: Update package.json so can just do "npm install"
npm install axios
npm install properties-reader
# used for package.json npm start
npm install concurrently

To run:
node app.js

TODO:
[] clan info - need clan name at top and stats
[] HOME UI
  [] top 5 - players, clans, versus
  [] Search clan
  [] Search player
[] home page tops, link clans and players
[] favicon
[] robots.txt
[] certbot SSL
[] refactor "members" to "players" to be consistent with API call
[] footer & header links shared
[] Sortable table columns
[] Clan search - input field to lookup clan info
[] Build and deploy from GIT