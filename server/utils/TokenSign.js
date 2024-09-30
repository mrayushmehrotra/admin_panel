const jwt = require("jsonwebtoken");
function signToken(signData) {
  const token = jwt.sign({ data: signData }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
}
module.exports = signToken;
