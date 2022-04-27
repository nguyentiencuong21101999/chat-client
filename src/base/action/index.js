class BaseAction {
  static token = null;

  static getToken() {
    return this.token;
  }
  static setToken(token) {
    this.token = token;
  }
}
export default BaseAction;
