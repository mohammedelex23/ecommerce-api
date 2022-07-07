const notFoundMiddleware = function (req, res, next) {
  res.status(404).json({
    error: true,
    message: `the route ${req.method} ${req.url} is not found`,
  });
};

module.exports = notFoundMiddleware;
