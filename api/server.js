const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');

const usersRouter = require("./users/usersRouter");
const authRouter = require('./auth/authRouter.js');
const server = express();


const sessionConfig = {
  name: 'monster',
  secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 seconds in milliseconds
    secure: process.env.COOKIE_SECURE || false, // true means only use over https
    httpOnly: true, // JS code on the client cannot access the session cookie
  },
  resave: false,
  saveUninitalized: true // GDPR compliance, read the docs
}

server.use(helmet());
server.use(session(sessionConfig))
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use('/api/auth', authRouter);

server.get("/", (req, res) => {
  res.json( 'api is up and running :)' );
});

module.exports = server;