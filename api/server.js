const express = require("express");

const server = express();
const postRouter = require("./posts/posts-router");

server.use(express.json());

server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2> Welcome to the posts API</h2>`);
});

module.exports = server;
