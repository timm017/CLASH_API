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
[] Members/clan page
  [X] Add Clan name to members page
  [X] add war record
  [] "i" info icon to show detail stats
[] HOME UI
  [] top 5 - players, clans, versus
  [] Search clan
  [] Search player
  [] footer (share with header nav)
[] add "showJSON=t" to display JSON results on page
[] split up VERSUS and VILLAGE
[] clan info - need clan name at top and stats
[] home page tops, link clans and players
[X] favicon
[] robots.txt
[] certbot SSL
[] refactor "members" to "players" to be consistent with API call
[] footer & header links shared
[] Sortable table columns
[] Clan search - input field to lookup clan info
[] Build and deploy from GIT