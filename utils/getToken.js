const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const getToken = async function (id, isAdmin) {
  try {
    let token = jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    token = CryptoJS.AES.encrypt(token, process.env.PASSWORD_SECRET);

    return token.toString();
  } catch (error) {
    throw new Error("error generating token");
  }
};

module.exports = getToken;
