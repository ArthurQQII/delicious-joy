const { authJwt } = require("./authJwt");
const { verifySignUp } = require("./verifySignUp");
exports.model = {
  authJwt,
  verifySignUp,
};
