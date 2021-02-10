const express = require("express");

const server = express();

server.use(express.json());
// implement your server here
// require your posts router and connect it here

module.exports = server;
