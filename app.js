var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
var bodyParser = require('body-parser');
var graphiqlExpress = require('graphql-server-express').graphiqlExpress;
var graphqlExpress = require('graphql-server-express').graphqlExpress;
var Schema = require('./data/schema');
var resolvers = require('./data/resolvers');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers,
});
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {},
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
