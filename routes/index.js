var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/callback', (req, res) => {
  const result = req.body.result;
  for (let i = 0; i < result.length; i++) {
    const data = result[i]['content'];
    console.log('receive: ', data);

    //sendMessage(data.from, data.text);
    var wit = require('../wit.js');
    var sessions = wit.sessions;

    const findOrCreateSession = (lineId) => {
      let sessionId;

      Object.keys(sessions).forEach(k => {
        if (sessions[k].lineId === lineId) {
          sessionId = k;
        }
      });

      if (!sessionId) {
        //sessionId = new Date().toISOString();
        sessionId = new Date().getTime().toString();
        sessions[sessionId] = {lineId: lineId, context: {}};
      }
      return sessionId;
    };

    var sessionId = findOrCreateSession(data.from);
    wit.runActions(sessionId, data.text, sessions[sessionId].context).then((context) => {
      sessions[sessionId].context = context;
    }).catch((err) => {
      console.error(err || err.stack);
    });
  }

  res.sendStatus(200);
});

router.get('/test', (req, res) => {
  var wit = require('../wit.js');
  var sessions = wit.sessions;

  const findOrCreateSession = (lineId) => {
    let sessionId;

    Object.keys(sessions).forEach(k => {
      if (sessions[k].lineId === lineId) {
        sessionId = k;
      }
    });

    if (!sessionId) {
      //sessionId = new Date().toISOString();
      sessionId = new Date().getTime().toString();
      sessions[sessionId] = {lineId: lineId, context: {}};
    }
    return sessionId;
  };

  var sessionId = findOrCreateSession('abc');
  wit.runActions(sessionId, req.query.text, sessions[sessionId].context).then((context) => {
    sessions[sessionId].context = context;
  }).catch((err) => {
    console.error(err || err.stack);
  });
  
  res.sendStatus(200);
});

module.exports = router;
