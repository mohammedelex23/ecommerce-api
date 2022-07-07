class GeneralError extends Error {
  constructor(message, code = 500) {
    super(message);
    this.code = code;
  }
}

class NotFound extends GeneralError {
  constructor(message) {
    super(message, 404);
  }
}

class BadRequest extends GeneralError {
  constructor(message) {
    super(message, 400);
  }
}

class UnAuthenticated extends GeneralError {
  constructor(message) {
    super(message, 401);
  }
}

class UnAuthorized extends GeneralError {
  constructor(message) {
    super(message, 403);
  }
}

module.exports = {
  GeneralError,
  NotFound,
  UnAuthenticated,
  BadRequest,
  UnAuthorized,
};
