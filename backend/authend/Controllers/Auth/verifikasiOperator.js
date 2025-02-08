const { getUserEmail } = require("../../Models/Auth/getUser");
const getTokenOperatorRegister = require("../../Models/Database/getTokenOperatorRegister");
const { registerOperator } = require("../../Models/Jwt/decodeJwt");
const response = require("../../Models/response");

const verifikasiOperator = async (req, res) => {
  try {
    const { token } = req.query; // Ambil token dari query string
    console.log("req query : ", req.query);
    if (!token)
      return response(res, {
        statusCode: 400,
        message: "Token tidak disertakan!",
        data: null,
      });
    const decodeToken = await registerOperator(token);
    console.log("Decode Token : ", decodeToken);
    const statusDecode = decodeToken.success;

    if (statusDecode) {
      const username = decodeToken.decoded.username;
      const email = decodeToken.decoded.email;
      const verif = await getUserEmail(username, email);
      if (verif) {
        return response(res, {
          statusCode: 204,
          message:
            "Akun berhasil diverifikasi, kamu bisa login dengan akun yang telah didaftarkan.",
          data: verif,
        });
      } else {
        return response(res, {
          statusCode: 400,
          message: "Kamu belum melakukan pendaftaran!.",
          data: null,
        });
      }
    } else {
      return response(res, {
        statusCode: 400,
        message: decodeToken.message,
        data: null,
      });
    }
  } catch (error) {
    console.error("Error Controller Auth/verifikasiOperator :", error);
    return response(res, {
      statusCode: 500,
      message: "Terjadi kesalahan pada server",
      data: null,
    });
  }
};

module.exports = verifikasiOperator;
