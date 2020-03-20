const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("./config");
const { port, db } = require("./env");

const configure = (cb) => {
  cb(require("morgan"), express);
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
