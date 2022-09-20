const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.EXPIRES_IN }
  );
};
