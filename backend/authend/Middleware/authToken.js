const jwt = require("jsonwebtoken");
require("dotenv").config();
const keyAksesToken = process.env.ACCESS_TOKEN_SECRET;

const authToken = (req, res, next) => {
  try {
    const cookies = req;
    console.log("Cookies Token = ", cookies);
    const tokenCookie = req.cookies.tokens; // Ambil cookie "tokens"

    if (!tokenCookie) {
      return res.status(401).json({
        statusCode: 401,
        message: "Access Denied! No token provided.",
      });
    }

    // Parse JSON karena kita menyimpan accessToken dan refreshToken dalam satu cookie
    const { accessToken } = JSON.parse(tokenCookie);

    jwt.verify(accessToken, keyAksesToken, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          statusCode: 403,
          message: "Invalid or Expired Token",
        });
      }
      req.user = decoded; // Menyimpan data pengguna yang telah di-decode ke dalam `req.user`
      next();
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = authToken;
