const { Router } = require("express");
const UserRouter = require("./user");
const RequestRouter = require("./request");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    data: {
      message: "This is the Restopia API.",
      version: 1.0,
      author: "Kingsley Victor"
    }
  });
});

router.use("/user", UserRouter);
router.use("/request", RequestRouter);

module.exports = router;
