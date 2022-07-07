const CryptoJS = require("crypto-js");
const decryptToken = function (token) {
  let decryptedToken = CryptoJS.AES.decrypt(token, process.env.PASSWORD_SECRET);
  decryptedToken = decryptedToken.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};

module.exports = decryptToken;
