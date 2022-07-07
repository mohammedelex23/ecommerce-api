const jwt = require("jsonwebtoken");
const { UnAuthorized, GeneralError } = require("../errors/errorClass");
const decryptToken = require("../utils/decryptToken");
const verifyToken = async function (req, res, next) {
  try {
    let authHeader = req.headers["authorization"];
    if (authHeader && Object.keys(authHeader).length > 0) {
      let decryptedToken = decryptToken(authHeader.split(" ")[1]);
      console.log("decrr", decryptToken);

      let customer = await jwt.verify(decryptedToken, process.env.JWT_SECRET);
      req.customer = customer;
      next();
    } else {
      return res.status(401).json({
        message: "you are not authenticated",
      });
    }
  } catch (error) {
    next(new GeneralError(error.message));
  }
};

const verifyTokenAndAuthorize = function (req, res, next) {
  verifyToken(req, res, () => {
    if (
      req.customer.id === req.params.id ||
      req.customer.id === req.body.customerId ||
      req.customer.isAdmin
    ) {
      return next();
    }
    next(new UnAuthorized("you are not authorized to perform this action"));
  });
};

const verifyTokenAndAdmin = function (req, res, next) {
  verifyToken(req, res, () => {
    if (req.customer.isAdmin) {
      return next();
    }
    next(new UnAuthorized("you are not authorized to perform this action"));
  });
};

module.exports = { verifyTokenAndAdmin, verifyTokenAndAuthorize };
