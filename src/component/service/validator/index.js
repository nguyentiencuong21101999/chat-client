class AppError extends Error {
  constructor(field, message) {
    super(field, message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Error);
    }
    this.field = field;
    this.message = message;
  }
}

class Validator {
  static isNotEmpty(field, value, message) {
    try {
      if (typeof value === "undefined") {
        throw new AppError(field, message);
      }
      if (value === null) {
        throw new AppError(field, message);
      }
      if (value === "") {
        throw new AppError(field, message);
      }
    } catch (e) {
      throw e;
    }
  }
}
export default Validator;
