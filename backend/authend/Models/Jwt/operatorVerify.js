const jwt = require("jsonwebtoken");
const secret = process.env.REGISTOPERATOT_TOKEN_SECRET;

const operatorVerify = async (username, email, password) => {
  try {
    const payload = { username, email, password };
    const token = jwt.sign(payload, secret, {
      algorithm: "HS512",
      expiresIn: "5m",
    });

    return token;
  } catch (error) {
    console.error("Error Models Jwt/operatorVerify", error);
    throw error;
  }
};

module.exports = operatorVerify;
