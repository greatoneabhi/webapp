const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./src/server/config/db');
const user = require('./src/server/models/user.server.model');
const product = require('./src/server/models/product.server.model');

app.set('superSecret', 'buycepsdotcomsecret');

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

//include routes
var routes = require('./src/server/routes/router');
app.use('/api', routes);

//error handler
//define as the last app.use callback
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status).send(err.message);
});

app.listen(8080, function() {
  console.log('Express app listening on port 8080')
});