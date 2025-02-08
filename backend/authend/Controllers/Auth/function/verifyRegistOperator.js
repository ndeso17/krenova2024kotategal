const saveNewOperator = require("../../../Models/Auth/saveNewOperator");
const authRegistOperator = require("../../../Models/Mail/authRegistOperator");
const operatorVerify = require("../../../Models/Jwt/operatorVerify");

const verifyRegistOperator = async (dataRegist) => {
  try {
    const username = dataRegist.username;
    const password = dataRegist.hashpw;
    const email = dataRegist.email;
    const role = dataRegist.roleuser;

    const saveRegist = await saveNewOperator(username, password, role, email);
    const encodeVerify = await operatorVerify(username, email, password);
    if (saveRegist && encodeVerify) {
      const link = `https://auth.krenova.stb/auth/verifyoperator?token=${encodeVerify}`;
      await authRegistOperator(email, link);
      return { statusCode: 201 };
    } else {
      return { statusCode: 400 };
    }
  } catch (error) {
    console.error("Error function verifyRegistOperator : ", error);
  }
};

module.exports = verifyRegistOperator;
