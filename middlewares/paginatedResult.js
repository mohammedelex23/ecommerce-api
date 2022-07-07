const { GeneralError } = require("../errors/errorClass");
const paginatedResult = function (model, modelName) {
  return async (req, res, next) => {
    try {
      let modelLength = await model.countDocuments().exec();
      const limit = req.query.limit ? parseInt(req.query.limit) : modelLength;
      const page = req.query.page ? parseInt(req.query.page) : 1;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const result = {};

      if (endIndex < modelLength) {
        result.next = {
          page: page + 1,
          limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit,
        };
      }
      if (modelName === "Order") {
        let orders = await model
          .find({})
          .limit(limit)
          .skip(startIndex)
          .populate("products", "price quantity")
          .populate("customerId", "name email")
          .exec();

        orders = orders.map((order) => {
          order.totalCost = model.calculateTotalCost(order.products);
          return order;
        });
        result.data = orders;
      } else {
        result.data = await model.find({}).limit(limit).skip(startIndex);
      }

      res.paginatedResult = result;
      next();
    } catch (error) {
      next(new GeneralError(error.message));
    }
  };
};

module.exports = paginatedResult;
