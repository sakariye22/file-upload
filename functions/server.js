const express = require("express");
require("./db.js");
const app = express();
const documentRoutes = require("./routes/uploadRoutes.js");

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");

app.use(express.json());

app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.json("ok");
});
app.use('/api', documentRoutes);

module.exports = app;
