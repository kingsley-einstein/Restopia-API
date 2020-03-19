const { UserRequest } = require("../db");

class RequestController {
  static async addRequest(req, res) {
    try {
      const { body, user } = req;
      body.owner = user._id;
      body.response = JSON.stringify(body.response);
      body.exact = JSON.stringify(body.exact);
      body.headers = body.headers ? JSON.stringify(body.headers) : null;
      const data = await UserRequest.create(body);
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

  static async deleteRequest(req, res) {
    try {
      const { params, user } = req;
      const data = await UserRequest.findOneAndDelete({
        owner: user._id,
        _id: params.requestId
      });
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

  static async getAllRequestsByUser(req, res) {
    try {
      const { _id } = req.user;
      const data = await UserRequest.find({
        owner: _id
      });
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

module.exports = RequestController;
