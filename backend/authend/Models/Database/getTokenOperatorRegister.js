const dbPool = require("../../Config/dtbs");

const getTokenOperatorRegister = async (token) => {
  try {
    const queryGetToken = `SELECT token FROM verifikasi WHERE token = ?`;
    const [rows] = await dbPool.execute(queryGetToken, [token]);
    return rows.affectedRows;
  } catch (error) {
    console.error(
      "Error saat menjalankan Query getTokenOperatorRegister",
      error
    );
    throw error;
  }
};

module.exports = getTokenOperatorRegister;
