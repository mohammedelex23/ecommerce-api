const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: Object,
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// encrypt password before saving to database
customerSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = CryptoJS.AES.encrypt(
    this.password,
    process.env.PASSWORD_SECRET
  );
  next();
});

customerSchema.methods.decrytpPassword = function (password) {
  let decryptedPassword = CryptoJS.AES.decrypt(
    password,
    process.env.PASSWORD_SECRET
  );
  decryptedPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
};

module.exports = mongoose.model("Customer", customerSchema);
