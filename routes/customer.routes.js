const router = require("express").Router();
const {
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyTokenMiddlewares");
const customerCtrl = require("../controllers/customer.controller");
const paginatedResult = require("../middlewares/paginatedResult");
const Customer = require("../models/customer.model");

// CREATE AND GET ALL CUSTOMERS
router
  .route("/")
  .post(customerCtrl.create)
  .get(verifyTokenAndAdmin, paginatedResult(Customer), customerCtrl.all);

// GET A CUSTOMER
router.get("/:id", verifyTokenAndAdmin, customerCtrl.find);

// UPDATE A CUSTOMER
router.put("/:id", verifyTokenAndAuthorize, customerCtrl.update);

// DELETE A CUSTOMER
router.delete("/:id", verifyTokenAndAuthorize, customerCtrl.remove);

module.exports = router;
