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

  static isEmail(field, value, message) {
    try {
      // const regex = new RegExp(/^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      const regex = new RegExp(
        /^[a-zA-Z][a-zA-Z0-9\_\.\-]{1,22}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/
      );
      if (!regex.test(value)) {
        throw new AppError(field, message);
      }
    } catch (e) {
      throw e;
    }
  }
  static isUsername(field, value, message) {
    try {
      const regex = new RegExp(
        "^(?=[a-zA-Z0-9\\._-]{6,48})([a-zA-Z0-9]([._-]?[a-zA-Z0-9])*)$"
      );
      if (!regex.test(value)) {
        throw new AppError(field, message);
      }
    } catch (e) {
      throw e;
    }
  }
  static isPassword(field, value, message) {
    try {
      const regex = new RegExp("^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$");
      if (!regex.test(value)) {
        throw new AppError(field, message);
      }
    } catch (e) {
      throw e;
    }
  }
  static isPhoneNumber(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9]{10,10}$/);
      if (!regex.test(value)) {
        throw new AppError(field, message);
      }
    } catch (e) {
      throw e;
    }
  }
}
export default Validator;
