const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("./config");
const { port, db } = require("./env");
const opts = {
  statics: express.static,
  json: express.json
};

const configure = (cb) => {
  cb(require("morgan"), opts);
};

configure(config(app));

app.listen(port[process.env.NODE_ENV], async () => {
  console.log("Server is running on port: ", port[process.env.NODE_ENV]);
  const m = await mongoose.connect(db[process.env.NODE_ENV], {
    useNewUrlParser: true,
    keepAlive: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  if (m) console.log("Mongoose connected");
});

module.exports = app;
