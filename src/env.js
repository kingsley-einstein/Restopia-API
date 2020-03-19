if (process.env.NODE_ENV !== "production") {
  require("dotenv")
  .config();
}

exports.jwtSecret = process.env.JWT_SECRET;

exports.port = {
  test: process.env.TEST_PORT,
  development: process.env.PORT,
  production: process.env.PORT
};

exports.db = {
  test: process.env.TEST_MONGO_URI,
  development: process.env.MONGO_URI,
  production: process.env.MONGO_URI
};
