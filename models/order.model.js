const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Types.ObjectId, ref: "Customer" },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    totalCost: Number, // calculated in the server
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

orderSchema.statics.calculateTotalCost = function (products) {
  let totalCost = products.reduce((previous, current) => {
    return previous + current.price * current.quantity;
  }, 0);

  return totalCost;
};

module.exports = mongoose.model("Order", orderSchema);
