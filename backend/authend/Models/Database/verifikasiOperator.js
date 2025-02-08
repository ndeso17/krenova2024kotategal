// const queryUpdate = ``;
const dbPool = require("../../Config/dtbs");

const verifikasiOperator = async (username, email) => {
  try {
    const querySaveToken = `UPDATE wongs SET verifikasi = ? WHERE lobang = ? AND email = ?`;
    const [rows] = await dbPool.execute(querySaveToken, [
      true,
      username,
      email,
    ]);
    return rows.affectedRows;
  } catch (error) {
    console.error("Error saat menjalankan Query verifikasiOperator", error);
    throw error;
  }
};

module.exports = verifikasiOperator;
