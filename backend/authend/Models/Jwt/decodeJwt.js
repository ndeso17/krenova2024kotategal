const jwt = require("jsonwebtoken");
const secret = process.env.REGISTOPERATOT_TOKEN_SECRET;

const registerOperator = async (token) => {
  try {
    const decoded = jwt.verify(token, secret, { algorithms: ["HS512"] });
    return { success: true, decoded };
  } catch (error) {
    console.error(
      "Error Models Jwt/decodeJwt registerOperator:",
      error.message
    );

    if (error.name === "TokenExpiredError") {
      return {
        success: false,
        message: "Link sudah expired. Silakan minta link verifikasi baru.",
      };
    } else if (error.name === "JsonWebTokenError") {
      return { success: false, message: "Link tidak valid!" };
    } else {
      return {
        success: false,
        message: "Terjadi kesalahan dalam memverifikasi pendaftaran.",
      };
    }
  }
};

module.exports = { registerOperator };
