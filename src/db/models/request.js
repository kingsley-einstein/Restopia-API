const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RequestSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  exact: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  method: String,
  headers: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Request", RequestSchema);
