'use strict';

var request = require('request');

var exports = module.exports = {};

module.exports = {
  sendMessage: function(sender, text) {
    const data = {
      to: [sender],
      toChannel: 1383378250,
      eventType: '138311608800106203',
      content: {
        contentType: 1,
        toType: 1,
        text: text
      }
    };
    console.log('send: ', data);

    request({
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'X-Line-ChannelID': process.env.CHANNEL_ID,
        'X-Line-ChannelSecret': process.env.CHANNEL_SERECT,
        'X-Line-Trusted-User-With-ACL': process.env.MID
      },
      method: 'POST',
      url: 'https://trialbot-api.line.me/v1/events'

    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      } else {
        console.log(error);
      }
    });
  }
}