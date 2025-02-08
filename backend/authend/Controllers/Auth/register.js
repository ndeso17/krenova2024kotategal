const response = require("../../Models/response");
const { userName, getEmail } = require("../../Models/Auth/getUser");
const generate = require("../../Models/Hash/generate");
const verifyRegistOperator = require("./function/verifyRegistOperator");

const register = async (req, res) => {
  try {
    const { username, password, role, email } = req.body;
    if (!username || !password) {
      return response(res, {
        statusCode: 403,
        message: "Username atau Password tidak boleh kosong!",
        data: null,
      });
    }
    //! Cek Duplikat Username
    const savedUsername = await userName(username);
    if (username === savedUsername) {
      return response(res, {
        statusCode: 403,
        message: "Username tidak tersedia!",
        data: null,
      });
    }
    //! Cek Duplikat Email
    const savedEmail = await getEmail(email);
    if (email === savedEmail) {
      return response(res, {
        statusCode: 403,
        message: "Email sudah terdaftar!",
        data: null,
      });
    }

    const hashpw = await generate(password);
    let roleuser =
      role === "operator" ? "oprt" : role === "admin" ? "adm" : "user";

    //Jika Role Operator
    if (role === "operator") {
      if (!email) {
        return response(res, {
          statusCode: 403,
          message: "Email Tidak Boleh Kosong!",
          data: null,
        });
      }
      const dataRegist = { username, hashpw, email, roleuser };
      const verify = await verifyRegistOperator(dataRegist);
      console.log("Verifikasi Register : ", verify);
      if (verify.statusCode === 201) {
        return response(res, {
          statusCode: 201,
          message: "Register berhasil! Silahkan Cek Email untuk Verifikasi.",
          data: { username, email },
        });
      }
    }
  } catch (error) {
    console.error("Error Controller Auth/register:", error);
    return response(res, {
      statusCode: 500,
      message: "Terjadi kesalahan pada server",
      data: null,
    });
  }
};

module.exports = register;
