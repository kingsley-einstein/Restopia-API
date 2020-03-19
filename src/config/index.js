const path = require("path");
const APIRouter = require("../router");

module.exports = (app) => {
  return (logger, { json, statics }) => {
    app.use(json());
    app.use(logger("dev"));
    app.use("/api/v1", APIRouter);
  };
};
