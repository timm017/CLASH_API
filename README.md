BUGS:
[] Top Clans link broken *** need to lower trophies in beginning TODO limit 20

TODO:
[] Google analytcis (node package?)
[] Members/clan page
  [?] "i" info icon to show detail stats
  [X] Add Clan name to members page
  [X] add war record
  [?] "i" info icon to show detail stats 
[] HOME UI
  [] top 5 - players, clans, versus
  [] Search player
  [] footer (share with header nav)
[] CLANS
  [] Clan search - input field to lookup clan info
  [] longest win streak
  [] most wins
[] PLAYERS
  [] Highest XP
  [X] Most trophies
  [] Most war stars
[] Error handling
[X] Error handling
[X] add "showJSON=t" to display JSON results on page
>>>>>>> 9299b4e4b7da73e82ee4dedcee445f19f5197d8f
[] split up VERSUS and VILLAGE
[X] clan info - need clan name at top and stats
[] home page tops, link clans and players
[] robots.txt
[] certbot SSL
[] refactor "members" to "players" to be consistent with API call
[] footer & header links shared
[] Sortable table columns
[] Build and deploy from GIT

[] locations list let use pick
  [] USA = 32000001


# CLASH_API
Clash of clans API to display information about the game.

Create "config" folder add "api.properties" (contains keys/tokens).

# TODO: Update package.json so can just do "npm install"
npm install axios
npm install properties-reader
# used for package.json npm start
npm install concurrently

# Notes
/leagues/29000022/seasons/2023-06
leagueId = 29000022
seasonId = 2023-06

To run:
node app.js
