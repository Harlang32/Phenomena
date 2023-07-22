// Use the dotenv package, to create environment variables
const express = require('express');
const server = express();

// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const PORT = 3000;
// Import express, and create a server
const { config } = require('dotenv');

config();

const {
  USER: user,
  HOST: host,
  DATABASE: database, 
  PASSWORD: password,
  PORT: port,
  SERVER_PORT,
} = process.env;

// Require morgan and body-parser middleware
const morgan = require('morgan');
const bodyParser = require("body-parser");
// Have the server use morgan with setting 'dev'

server.use(morgan("dev"));

// Import cors 
// Have the server use cors()

const cors = require('cors');
server.use(cors());
// Have the server use bodyParser.json()

server.use(bodyParser.json());
// Have the server use your api router with prefix '/api'
const apiRouter = require("./api");
server.use("/api", apiRouter);

// Import the client from your db/index.js
      const { client } = require('./db');
// Create custom 404 handler that sets the status code to 404.
server.use((req, res, next) => {
 res.status(404);
})
// Create custom error handling that sets the status code to 500
// and returns the error as an object
server.use((req, res, next) => {
  res.status(500);
  res.send({
    name: error.name,
    message: error.message,
  });
});

// Start the server listening on port PORT
// On success, connect to the database

client.connect();

server.listen(SERVER_PORT, () => {
  console.log('Server is running on post: ${SERVER_PORT}');
  

});

//** Code from juicebox */
// require("dotenv").config();
// const PORT = 3000;
// const express = require("express");
// const server = express();

// const { client } = require("./db");
// client.connect();

// server.listen(PORT, () => {
//   console.log("The server is up on port", PORT);
// });

// const apiRouter = require("./api");
// server.use("/api", apiRouter);

// const morgan = require("morgan");
// const bodyParser = require('body-parser');
// server.use(morgan("dev"));

// server.use(express.json());

// server.use((req, res, next) => {
//   console.log("<____Body Logger START____>");
//   console.log(req.body);
//   console.log("<_____Body Logger END_____>");

//   next();
// });

// module.exports = client;