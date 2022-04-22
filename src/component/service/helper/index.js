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
}
