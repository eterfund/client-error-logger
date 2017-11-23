var express = require('express');
var bodyParser = require('body-parser'); 
var JL = require('jsnlog').JL;
var jsnlog_nodejs = require('jsnlog-nodejs').jsnlog_nodejs;
var config = require('./config.json');


var app = express();

if (!config.noStatic) {
  app.use('/demo.html', express.static('demo.html'));
  app.use('/client.js', express.static('client.dist.js'));
}

app.use(bodyParser.json())
app.post('/jsnlog.logger', function (req, res) { 
    logMessage(req.body, req.header('user-agent'));
    res.send(''); 
});

app.listen(config.port);


function logMessage (logJson, userAgent) {
  function safeDeserialise (s) {
    try {
        return JSON.parse(s);
    } catch (e) {
        return s;
    }
  };

  var receivedRequestId = logJson.r;
  var nbrLogEntries = logJson.lg.length;
  var i = 0;

  for (i = 0; i < nbrLogEntries; i++) {
    var receivedLogEntry = logJson.lg[i];
    var loggerName = receivedLogEntry.n;
    var logLevel = receivedLogEntry.l;

    var newLogEntry = {
      clientMessage: safeDeserialise(receivedLogEntry.m),
      requestId: receivedRequestId,
      userAgent: userAgent,
      clientTimestamp: new Date(receivedLogEntry.t)
    };

    JL(loggerName).log(logLevel, newLogEntry);
  }
}
