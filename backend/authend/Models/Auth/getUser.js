const dbPool = require("../../Config/dtbs");
const verifikasiOperator = require("../Database/verifikasiOperator");

const userNamePassword = async (username) => {
  try {
    const queryGetUser = `SELECT lobang,kunci FROM wongs WHERE lobang = ?`;
    const [rows] = await dbPool.execute(queryGetUser, [username]);
    console.log("Rows : ", rows);
  } catch (error) {
    console.error("Error saat menjalankan Query getUser", error);
    throw error;
  }
};

const userName = async (username) => {
  try {
    const queryGetUser = `SELECT lobang FROM wongs WHERE lobang = ?`;
    const [rows] = await dbPool.execute(queryGetUser, [username]);
    const name = rows.length > 0 ? rows[0].lobang : null;
    return name;
  } catch (error) {
    console.error("Error saat menjalankan Query getUser", error);
    throw error;
  }
};

const getEmail = async (email) => {
  try {
    const queryGetUser = `SELECT email FROM wongs WHERE email = ?`;
    const [rows] = await dbPool.execute(queryGetUser, [email]);
    const name = rows.length > 0 ? rows[0].email : null;
    return name;
  } catch (error) {
    console.error("Error saat menjalankan Query getUser", error);
    throw error;
  }
};

const getUserEmail = async (username, email) => {
  try {
    const queryGetUserEmail = `SELECT lobang, email FROM wongs WHERE lobang = ? AND email = ?`;
    const [rows] = await dbPool.execute(queryGetUserEmail, [username, email]);
    const mail = rows.length > 0 ? rows[0].email : null;
    const user = rows.length > 0 ? rows[0].lobang : null;

    if (user && mail) {
      const verify = await verifikasiOperator(user, mail);
      if (verify) {
        return { username: user, email: mail };
      } else {
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error saat menjalankan Query getUser", error);
    throw error;
  }
};

const getAuth = async (inputan) => {
  try {
    let queryGetAuth;
    let param;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputan);

    if (isEmail) {
      queryGetAuth = `SELECT lobang, kunci, verifikasi FROM wongs WHERE email = ?`;
      param = inputan;
    } else {
      queryGetAuth = `SELECT lobang, kunci, verifikasi FROM wongs WHERE lobang = ?`;
      param = inputan;
    }

    const [rows] = await dbPool.execute(queryGetAuth, [param]);
    const username = rows.length > 0 ? rows[0].lobang : null;
    const password = rows.length > 0 ? rows[0].kunci : null;
    const verifikasi = rows.length > 0 ? rows[0].verifikasi : null;

    return { username, password, verifikasi };
  } catch (error) {
    console.error("Error saat menjalankan Query getAuth:", error);
    throw error;
  }
};

module.exports = {
  userNamePassword,
  userName,
  getEmail,
  getUserEmail,
  getAuth,
};
