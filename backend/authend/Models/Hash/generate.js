const bcrypt = require("bcrypt");
const generate = async (password) => {
  try {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (hashedPassword) {
      return hashedPassword;
    }
  } catch (error) {
    console.error("Error Models Hash/generate", error);
    throw error;
  }
};

module.exports = generate;
