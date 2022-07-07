const erorMiddleware = function (error, req, res, next) {
  res.status(error.code).json({
    error: true,
    message: error.message || "something went wrong",
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};

module.exports = erorMiddleware;
