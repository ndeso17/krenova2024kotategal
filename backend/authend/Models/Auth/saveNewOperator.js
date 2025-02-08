const dbPool = require("../../Config/dtbs");

const saveNewOperator = async (username, password, role, email) => {
  try {
    const querySaveNewOperator = `INSERT INTO wongs (lobang, kunci, role, email, verifikasi) VALUES (?, ?, ?, ?, ?)`;
    const [rows] = await dbPool.execute(querySaveNewOperator, [
      username,
      password,
      role,
      email,
      false,
    ]);
    return rows.affectedRows;
  } catch (error) {
    console.error("Error saat menjalankan Query saveNewOperator", error);
    throw error;
  }
};

module.exports = saveNewOperator;
