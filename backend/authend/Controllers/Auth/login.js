const response = require("../../Models/response");
const verifyLogin = require("./function/verifyLogin");

const login = async (req, res) => {
  try {
    const { inputan, password } = req.body;
    if (!inputan && !password) {
      const datas = {
        statusCode: 403,
        message: "Username/Email atau Password Tidak Boleh kosong!",
        data: null,
      };
      response(res, datas);
    }
    //? Cek apakah username terdaftar di database dan status verifikasi true? result savedPassword
    //? Compare password dengan savedPassword
    //? Membuat JWT set JWT pada cookies
    const masuk = await verifyLogin(res, inputan, password);
    const statusLogin = masuk.success;
    if (statusLogin) {
      const datas = {
        statusCode: 201,
        message: "Login Sukses",
        data: masuk,
      };
      response(res, datas);
    } else {
      const datas = {
        statusCode: 204,
        message: "Login Gagal",
        data: masuk,
      };
      response(res, datas);
    }
  } catch (error) {}
};

module.exports = login;
