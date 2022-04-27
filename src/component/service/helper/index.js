import CryptoJs from "crypto-js";

export default class Helper {
  static isEmpty(value) {
    try {
      if (typeof value === "undefined" || value === null || value === "") {
        return true;
      }
      return false;
    } catch (e) {
      return true;
    }
  }
  static hashMD5(string = '') {
    return CryptoJs.MD5(string).toString()
  }
}
