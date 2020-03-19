const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const helpers = require("../../helpers");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    user.password = helpers.hashPassword(user.password);
  }
  next();
});

module.exports = model("User", UserSchema);
