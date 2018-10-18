const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  routes = require('./server/routes/routes'),
  app = express(),
  port = 1432;

app.use(express.static(path.join(__dirname, 'dist/mean-ex')));
app.use(bodyParser.json());
app.use(routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/mean-ex/index.html'));
});

app.listen(port, function() {
  console.log('Listening on port: ', port);
});
