const Order = require("../models/order.model");
const Customer = require("../models/customer.model");
const { NotFound, GeneralError } = require("../errors/errorClass");
const { getErrors } = require("../errors/getErrors");

// GET ALL ORDERS
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
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);

    res.status(400).json(getErrors(error));
  }
};

// GET ORDER
const find = async function (req, res, next) {
  try {
    let foundOrder = await Order.findById(req.params.id)
      .populate("products", "price quantity")
      .populate("customerId", "name email");
    if (!foundOrder) {
      return next(new NotFound("Order is not found"));
    }

    foundOrder.totalCost = Order.calculateTotalCost(foundOrder.products);

    res.status(200).json(foundOrder._doc);
  } catch (error) {
    next(new GeneralError(error.message));
  }
};

// UPDATE
const update = async function (req, res, next) {
  try {
    if (req.body.customerId) {
      let customer = await Customer.findById(req.body.customerId);
      if (!customer) {
        return next(new NotFound("customer is not found for this customerId"));
      }
    }
    let updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return next(new NotFound("Order is not found"));
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json(getErrors(error));
  }
};

// REMOVE
const remove = async function (req, res, next) {
  try {
    let removedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!removedOrder) {
      return next(new NotFound("Order is not found"));
    }
    res.status(200).json({
      message: "Order is removed",
    });
  } catch (error) {
    next(new GeneralError(error.message));
  }
};

const orderCtrl = {
  create,
  update,
  remove,
  find,
  all,
};
module.exports = orderCtrl;
