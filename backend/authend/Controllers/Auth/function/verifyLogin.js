const { getAuth } = require("../../../Models/Auth/getUser");
const compare = require("../../../Models/Hash/compare");
const encodeAksesToken = require("../../../Models/Jwt/encodeAksesToken");
const encodeRefreshToken = require("../../../Models/Jwt/encodeRefreshToken");

const verifyLogin = async (res, inputan, password) => {
  try {
    const cekAuth = await getAuth(inputan);

    if (!cekAuth) {
      return {
        success: false,
        message: "Data User tidak ditemukan, silahkan melakukan registrasi.",
        data: null,
      };
    }

    const username = cekAuth.username;
    const savedPassword = cekAuth.password;
    const verifikasi = !!cekAuth.verifikasi;

    if (!username || !savedPassword) {
      return {
        success: false,
        message: "Gagal Login! Data tidak valid.",
        data: null,
      };
    }

    const cekPassword = await compare(password, savedPassword);

    if (!cekPassword) {
      return {
        success: false,
        message:
          "Password salah! Siapa Anda? Akun akan terkunci apabila melakukan percobaan 3 kali gagal!",
        data: null,
      };
    }

    if (!verifikasi) {
      return {
        success: false,
        message: "User belum melakukan verifikasi email.",
        data: null,
      };
    }

    const aksesToken = await encodeAksesToken(inputan, verifikasi);
    const refreshToken = await encodeRefreshToken(inputan, verifikasi);
    if (aksesToken && refreshToken) {
      res.cookie("accessToken", aksesToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return {
        success: true,
        message: "Data Login berhasil.",
        data: { aksesToken, refreshToken },
      };
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat proses Login:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat proses Login.",
      data: error,
    };
  }
};

module.exports = verifyLogin;
