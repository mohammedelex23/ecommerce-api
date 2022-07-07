const getErrors = function (err) {
  let errors = {
    type: "validationError",
    errors: [],
  };
  if (err.code) {
    switch (err.code) {
      case 11000:
        let name;
        if (err.keyValue.email) {
          name = "email";
        }
        if (err.keyValue.title) {
          name = "title";
        }
        if (err.keyValue.userId) {
          name = "userId";
        }
        errors.errors.push({
          name,
          message: `${name} already exists`,
        });
        break;
      default:
        errors.type = "NotImplemented";
        errors.errors.push = [
          {
            name: "NotImplemented",
            message: err.message || "Something went wrong",
          },
        ];
    }
  } else if (err.name === "CastError") {
    errors.errors.push({
      path: err.path,
      message: err.message,
    });
  } else {
    for (let errName in err.errors) {
      errors.errors.push({
        name: errName,
        message: `${errName} is required`,
      });
    }
  }
  return errors;
};

module.exports = { getErrors };
