const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TokenSchema = new Schema({
  value: {
    type: String
  }
});

module.exports = model("Token", TokenSchema);
