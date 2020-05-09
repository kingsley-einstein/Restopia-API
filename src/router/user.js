const { Router } = require("express");
const { UserController } = require("../controllers");
const { Auth } = require("../middlewares");

const router = Router();

router.post(
  "/",
  Auth.checkKeys,
  Auth.checkIfUserExists,
  UserController.createAccount
);

router.post(
  "/login",
  UserController.signIn
);

router.get(
  "/logged",
  Auth.checkToken,
  UserController.getLoggedUser
);

router.post(
  "/logout",
  Auth.checkToken,
  UserController.logOut
);

router.patch(
  "/update_password",
  Auth.checkToken,
  UserController.updatePassword
);

module.exports = router;
