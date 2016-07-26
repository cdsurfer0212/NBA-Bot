'use strict';

let nba = require('nba');
let Wit = require('node-wit').Wit;

const accessToken = (() => {
  return process.env.WIT_TOKEN;
})();

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;

    return new Promise(function(resolve, reject) {
      console.log('user: ', request.text);
      console.log('bot: ', JSON.stringify(response));
      
      var line = require('./line.js');
      line.sendMessage(sessions[sessionId].lineId, response.text);
      
      return resolve();
    });
  },
  getPlayerInfo({context, entities}) {
    return new Promise(function(resolve, reject) {
      var player = getFirstEntityValue(entities, 'player');
      if (player) {
        var mock = {playerId: 201144, season: '2013-14'};
        nba.api.playerInfo(mock, function(err, response) {
          var playerInfo = response.commonPlayerInfo[0];
          context.team = playerInfo.teamCity + " " + playerInfo.teamName;
        });

      } else {
        context.team = "I can't find the player";
      }
      return resolve(context);
    });
  }
};

const getFirstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] && Array.isArray(entities[entity]) && entities[entity].length > 0 && entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const wit = new Wit({accessToken, actions});
//wit.interactive();

const sessions = {}
wit.sessions = sessions;

module.exports = wit;