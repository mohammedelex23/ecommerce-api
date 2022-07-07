const Customer = require("../models/customer.model");
const getToken = require("../utils/getToken");
const { UnAuthenticated, BadRequest } = require("../errors/errorClass");
const { getErrors } = require("../errors/getErrors");

const login = async function (req, res, next) {
  let { email, password } = req.body;

  const errors = [];
  if (!email) {
    errors.push({
      name: "email",
      message: "email is required",
    });
  }
  if (!password) {
    errors.push({
      name: "password",
      message: "password is required",
    });
  }
  if (errors.length > 0) {
    return res.status(400).json({
      error: true,
      errorType: "ValidationEroor",
      errors,
    });
  }

  try {
    let foundCustomer = await Customer.findOne({ email });

    // look for Customer
    if (!foundCustomer) {
      return next(new UnAuthenticated("invalid email or password"));
    }
    const decryptedPassword = foundCustomer.decrytpPassword(
      foundCustomer.password
    );

    // compare saved password with received password
    if (password !== decryptedPassword) {
      return next(new UnAuthenticated("invalid email or password"));
    }
    foundCustomer.password = undefined;
    foundCustomer.address = undefined;
    foundCustomer.shippingAddress = undefined;

    let token = await getToken(foundCustomer._id, foundCustomer.isAdmin);

    return res.status(200).json({ ...foundCustomer._doc, token });
  } catch (error) {
    res.status(400).json(getErrors(error));
  }
};

const authCtrl = { login };
module.exports = authCtrl;
