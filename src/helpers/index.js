const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../env");

exports.hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(15);
  return bcrypt.hashSync(password, salt);
};

exports.comparePassword = (hash, raw) => {
  return bcrypt.compareSync(raw, hash);
};

exports.signToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "7d"
  });
};

exports.decodeToken = (token) => {
  return jwt.decode(token);
};

exports.hasKeys = (body, keys) => {
  return Object.keys(body).every((bodyKey) => {
    return keys.some((key) => {
      return key === bodyKey;
    });
  });
};
