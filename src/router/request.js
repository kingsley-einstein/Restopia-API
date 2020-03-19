const { Router } = require("express");
const { RequestController } = require("../controllers");
const { Auth } = require("../middlewares");

const router = Router();

router.post(
  "/",
  Auth.checkToken,
  RequestController.addRequest
);

router.delete(
  "/:requestId",
  Auth.checkToken,
  RequestController.deleteRequest
);

router.get(
  "/",
  Auth.checkToken,
  RequestController.getAllRequestsByUser
);

module.exports = router;
