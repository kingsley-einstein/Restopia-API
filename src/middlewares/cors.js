module.exports = (origin, headers) => {
  return (req, res, next) => {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", headers || "Content-Type, Authorization");
    next();
  };
}
