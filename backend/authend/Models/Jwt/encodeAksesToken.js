const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

const encodeAksesToken = (inputan, verifikasi) => {
  try {
    const payload = { inputan, verifikasi };
    const token = jwt.sign(payload, secret, {
      algorithm: "HS512",
      expiresIn: "5m",
    });
    if (token) return token;
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat Akses Token:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat membuat Akses Token.",
      data: error,
    };
  }
};

module.exports = encodeAksesToken;
