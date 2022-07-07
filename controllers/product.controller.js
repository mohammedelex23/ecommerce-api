const Product = require("../models/product.model");
const { NotFound, GeneralError } = require("../errors/errorClass");
const { getErrors } = require("../errors/getErrors");

// GET ALL PRODUCTS
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
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json(getErrors(error));
  }
};

// GET ONE PRODUCT
const find = async function (req, res, next) {
  try {
    let foundProduct = await Product.findById(req.params.id);
    if (!foundProduct) {
      return next(new NotFound("product is not found"));
    }

    res.status(200).json(foundProduct._doc);
  } catch (error) {
    next(new GeneralError(error.message));
  }
};

// UPDATE
const update = async function (req, res, next) {
  try {
    let updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return next(new NotFound("product is not found"));
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json(getErrors(error));
  }
};

// REMOVE
const remove = async function (req, res, next) {
  try {
    let removedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!removedProduct) {
      return next(new NotFound("product is not found"));
    }
    res.status(200).json({
      message: "product is removed",
    });
  } catch (error) {
    next(new GeneralError(error.message));
  }
};

const productCtrl = { create, update, remove, find, all };
module.exports = productCtrl;
