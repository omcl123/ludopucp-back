var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var debug = require('debug')('ludopucp-back:server');
var http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

import 'dotenv/config';
import models, { connectDb } from './models';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
	if (eraseDatabaseOnSync) {
    await Promise.all([
      models.Loan.deleteMany({}),
      models.Boardgame.deleteMany({}),
    ]);
    createUsersWithMessages();
  }

  server.listen(port, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

const createUsersWithMessages = async () => {
	const game1 = new models.Boardgame({
		name: 'Catan',
	});
	

	const loan1 = new models.Loan({
    person: 'Person Surname',
    boardgame: game1.id,
    state: true,
  });
  

	const game2 = new models.Boardgame({
		name: 'Carcassone',
	});
	

	const loan2 = new models.Loan({
    person: 'Person Surname',
    boardgame: game2.id,
    state: false,
  });
  await loan1.save();
  await loan2.save();

  await game1.save();
  await game2.save();
};

module.exports = app;
