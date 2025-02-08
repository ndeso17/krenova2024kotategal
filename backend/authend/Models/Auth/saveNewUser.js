const dbPool = require("../../Config/dtbs");

const saveNewUser = async (username, password, roleuser) => {
  try {
    const querySaveNewUser = `INSERT INTO wongs (lobang, kunci, role) VALUES (?, ?)`;
    const [rows] = await dbPool.execute(querySaveNewUser, [
      username,
      password,
      roleuser,
    ]);
    return rows.affectedRows;
  } catch (error) {
    console.error("Error saat menjalankan Query saveNewUser", error);
    throw error;
  }
};

module.exports = saveNewUser;
