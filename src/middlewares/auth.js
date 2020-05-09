const { User, Token } = require("../db");
const helpers = require("../helpers");

class Auth {
  static checkKeys(req, res, next) {
    try {
      const hasKeys = helpers.hasKeys(req.body, [
        "email", "password"
      ]);
      if (!hasKeys) {
        return res.status(400).json({
          code: 400,
          data: "Body is missing required keys"
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: error
      });
    }
  }

  static async checkIfUserExists(req, res, next) {
    try {
      const { email } = req.body;
      const userExists = await User.findOne({ email });
      if(userExists) {
        return res.status(400).json({
          code: 400,
          data: `User with email ${email} already registered`
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: error
      });
    }
  }

  static async checkToken(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({
          code: 401,
          data: "Authorization header is null"
        });
      }
      if (!authorization.startsWith("Bearer")) {
        return res.status(401).json({
          code: 401,
          data: "Authorization header must begin with a 'Bearer' string"
        });
      }
      const token = authorization.substring(7, authorization.length);
      if (!token || token.trim().length === 0) {
        return res.status(401).json({
          code: 401,
          data: "Token not present in authorization header"
        });
      }
      const payload = helpers.decodeToken(token);
      if (!payload) {
        return res.status(401).json({
          code: 401,
          data: "Malformed or expired JWT"
        });
      }
      const isLoggedOut = await Token.findOne({
        value: token
      });
      if (isLoggedOut) {
        return res.status(401).json({
          code: 401,
          data: "Only logged in users can access this resource"
        });
      }
      const user = await User.findById(payload._id);
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: error
      });
    }
  }
}

module.exports = Auth;
