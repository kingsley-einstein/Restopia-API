const { User, Token } = require("../db");
const helpers = require("../helpers");

class UserController {
  static async createAccount(req, res) {
    try {
      const { body } = req;
      const { _id, email, password } = await User.create(body);
      const data = { _id, email, token: helpers.signToken({ _id, password }) };
      res.status(201).json({
        code: 201,
        data
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: error
      });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          code: 404,
          data: "User not found"
        });
      }
      if (!helpers.comparePassword(user.password, password)) {
        return res.status(400).json({
          code: 400,
          data: "Incorrect password"
        });
      }
      const data = { _id: user._id, email, token: helpers.signToken({ _id: user._id, password: user.password })};
      res.status(200).json({
        code: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: error
      });
    }
  }

  static async getLoggedUser(req, res) {
    try {
      const { email, _id } = req.user;
      const data = { email, _id, token: req.token };
      res.status(200).json({
        code: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: error
      });
    }
  }

  static async logOut(req, res) {
    try {
      const { user, token } = req;
      const loggedOut = await Token.create({
        value: token
      });
      if (!loggedOut) {
        throw new Error("Unable to log user out");
      }
      res.status(200).json({
        code: 200,
        data: `Successfully signed out user ${user.email}`
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: error
      });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { body, user } = req;
      const _id = user._id;
      const data = await User.updateOne({ _id }, { password: body.password });
      res.status(200).json({
        code: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        data: error
      });
    }
  }
}

module.exports = UserController;
