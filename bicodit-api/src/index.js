import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
// import socket from 'socket.io';
// import Message from './model/message';
// import Channel from './model/channel';

const LocalStrategy  = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);
// let io = socket(app.server);

//middleware
//parse application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

//passport config
app.use(passport.initialize());
let Account = require('./models/account');
passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/bicoditapi', routes);

// Base URL test endpoint to see if API is running
app.get('/', (req, res) => {
  res.json({ message: 'Bicodit API is ALIVE!' })
});

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

module.exports = {
  app
}
