const jwt = require("jsonwebtoken");
const secret = process.env.REFRESH_TOKEN_SECRET;

const encodeRefreshToken = (inputan, verifikasi) => {
  try {
    const payload = { inputan, verifikasi };
    const token = jwt.sign(payload, secret, {
      algorithm: "HS512",
      expiresIn: "1d",
    });
    if (token) return token;
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat Refresh Token:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat membuat Refresh Token.",
      data: error,
    };
  }
};

module.exports = encodeRefreshToken;
