const express = require("express");

const db = require("../data/dbConfig.js");
const AccRouter = require('../accounts/acc-router');

const server = express();

server.use(express.json());

server.use("/api/accounts", AccRouter);

server.get("/", (req, res) => {
  res.status(200).json({ account: "up" });
});

module.exports = server;
