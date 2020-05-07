// const path = require("path");
const { cors } = require("../middlewares");
const APIRouter = require("../router");

module.exports = (app) => {
  return (logger, { json, urlencoded }) => {
    app.use(json());
    app.use(urlencoded({
      extended: false
    }));
    app.use(cors("*"));
    app.use(logger("dev"));
    app.get("/", (req, res) => {
      res.status(200).json({
        body: {
          message: "This is probe endpoint for KintoHub's healthcheck.",
          url: req.url
        }
      });
    });
    app.use("/api/v1", APIRouter);
  };
};
