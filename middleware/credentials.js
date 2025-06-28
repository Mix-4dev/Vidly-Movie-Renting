function credentials(req, res, next) {
  console.log("Authentication and Authorization Middleware");
  next();
}
module.exports = credentials;