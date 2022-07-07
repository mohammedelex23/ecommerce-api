const router = require("express").Router();
const productCtrl = require("../controllers/product.controller");
const {
  verifyTokenAndAdmin,
} = require("../middlewares/verifyTokenMiddlewares");
const paginatedResult = require("../middlewares/paginatedResult");
const Product = require("../models/product.model");

// CREATE and GET ALL PRODUCTS
router
  .route("/")
  .post(verifyTokenAndAdmin, productCtrl.create)
  .get(verifyTokenAndAdmin, paginatedResult(Product), productCtrl.all);

// FIND, UPDATE and REMOVE PRODUCT
router
  .route("/:id")
  .get(verifyTokenAndAdmin, productCtrl.find)
  .put(verifyTokenAndAdmin, productCtrl.update)
  .delete(verifyTokenAndAdmin, productCtrl.remove);

module.exports = router;
