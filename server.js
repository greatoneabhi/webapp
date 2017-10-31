var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var session = require('express-session');
//var mongoStore = require('connect-mongo')(session);

//connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testForAuth', {
    useMongoClient: true
});
var db = mongoose.connection;

//handle mongoDB error
db.on('error', console.error.bind(console, 'connection error:'));
/*db.once('open', function() {
    //we 're connected!
});*/

//use sessions for tracking logins
/*app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: db
    })
}));*/

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//include routes
var routes = require('./src/server/routes/router');
app.use('/', routes);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

//error handler
//define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

/*app.get('/', function(req, res) {
    res.send('Server is running');
});*/

app.listen(8080, function() {
    console.log('Express app listening on port 8080')
});