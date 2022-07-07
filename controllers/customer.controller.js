const Customer = require("../models/customer.model");
const { NotFound, GeneralError } = require("../errors/errorClass");
const { getErrors } = require("../errors/getErrors");

// GET ALL CUSTOMERS
const all = async function (req, res, next) {
  try {
    res.status(200).json(res.paginatedResult);
  } catch (error) {
    next(new GeneralError(error.message));
  }
};

// CREATE
const create = async function (req, res, next) {
  try {
    const { isAdmin, ...others } = req.body;
    const newCustomer = new Customer(others);

    let savedCustomer = await newCustomer.save();
    savedCustomer.password = undefined;
    res.status(201).json(savedCustomer._doc);
  } catch (error) {
    res.status(400).json(getErrors(error));
  }
};

// GET ONE CUSTOMER
const find = async function (req, res, next) {
  try {
    let foundCustomer = await Customer.findById(req.params.id);
    if (!foundCustomer) {
      return next(new NotFound("customer is not found"));
    }
    foundCustomer.password = undefined;

    res.status(200).json(foundCustomer._doc);
  } catch (error) {
    next(new GeneralError(error.message));
  }
};

// UPDATE
const update = async function (req, res, next) {
  try {
    const { name, email, password, address, shippingAddress } = req.body;

    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return next(new NotFound("customer is not found"));
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.password = password || customer.password;
    customer.address = address || customer.address;
    customer.shippingAddress = shippingAddress || customer.shippingAddress;

    const updatedCustomer = await customer.save();
    updatedCustomer.password = undefined;

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json(getErrors(error));
  }
};

// REMOVE
const remove = async function (req, res, next) {
  try {
    let removedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!removedCustomer) {
      return next(new NotFound("customer is not found"));
    }
    res.status(200).json({
      message: "customer is removed",
    });
  } catch (error) {
    next(new GeneralError(error.message));
  }
};

const customerCtrl = { create, update, remove, find, all };
module.exports = customerCtrl;
