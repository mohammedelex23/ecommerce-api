const router = require("express").Router();
const orderCtrl = require("../controllers/order.controller");
const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyTokenMiddlewares");
const paginatedResult = require("../middlewares/paginatedResult");
const Order = require("../models/order.model");

// CREATE and GET ALL PRODUCTS
router
  .route("/")
  .post(verifyTokenAndAuthorize, orderCtrl.create)
  .get(verifyTokenAndAdmin, paginatedResult(Order, "Order"), orderCtrl.all);

// FIND, UPDATE and DELETE PRODUCT
router
  .route("/:id")
  .get(verifyTokenAndAuthorize, orderCtrl.find)
  .put(verifyTokenAndAdmin, orderCtrl.update)
  .delete(verifyTokenAndAdmin, orderCtrl.remove);

module.exports = router;
