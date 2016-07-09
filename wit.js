'use strict';

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
};

const wit = new Wit({accessToken, actions});
//wit.interactive();

const sessions = {}
wit.sessions = sessions;

module.exports = wit;