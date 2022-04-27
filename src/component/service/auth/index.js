import BaseAction from "../../../base/action";
import Cookies from "../cookies";
import AuthEnum from "../enum/auth";
import RouteEnum from "../enum/route";

import Logger from "../logger";
const key = {
  token: "335F6AA0500C432EE720BEB0A1F8D453",
  profile: "093EA6695078B2915DA17580B7D23C2B",
};
class AuthService {
  constructor() {
    if (!AuthService.instance) {
      AuthService.instance = this;
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.setPackageProfile = this.setPackageProfile.bind(this);
    this.getPackageProfile = this.getPackageProfile.bind(this);
    this.getPackageToken = this.getPackageToken.bind(this);
    this.setPackageToken = this.setPackageToken.bind(this);
    this.setRole = this.setRole.bind(this);
    this.getRole = this.getRole.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.checkRoleNotLogin = this.checkRoleNotLogin.bind(this);
    return AuthService.instance;
  }

  handleLoginSuccess(response) {
    try {
      Logger.info(`AuthService execute handleLoginSuccess`);
      const token = response.accessToken;
      const expiredAt = 1000 * 24 * 60 * 60;
      this.setPackageProfile(expiredAt, response);
      this.setPackageToken(expiredAt, token);
      this.setRole(response.role);
      BaseAction.setToken(token);
    } catch (e) {
      Logger.error(`AuthService execute handleLoginSuccess ${e.toString()}`);
      throw e;
    }
  }

  setPackageProfile(expiredAt, profile) {
    try {
      Logger.info(`AuthService execute setPackageProfile`);
      Logger.debug(
        `AuthService execute setPackageProfile receive expiredAt`,
        expiredAt
      );
      Logger.debug(
        `AuthService execute setPackageProfile receive profile`,
        profile
      );
      Cookies.set(key.profile, profile, expiredAt);
    } catch (e) {
      Logger.error(`AuthService execute setPackageProfile ${e.toString()}`);
      throw e;
    }
  }
  getPackageProfile() {
    try {
      Logger.info(`AuthService execute getPackageProfile`);
      const profile = Cookies.get(key.profile);
      Logger.debug(
        `AuthService execute getPackageProfile receive profile`,
        profile
      );
      return profile;
    } catch (e) {
      Logger.error(`AuthService execute getPackageProfile ${e.toString()}`);
      throw e;
    }
  }
  setPackageToken(expiredAt, token) {
    try {
      Logger.info(`AuthService execute setPackageProfile`);
      Logger.debug(
        `AuthService execute setPackageProfile receive expiredAt`,
        expiredAt
      );
      Logger.debug(
        `AuthService execute setPackageProfile receive profile`,
        token
      );
      Cookies.set(key.token, token, expiredAt);
    } catch (e) {
      Logger.error(`AuthService execute setPackageProfile ${e.toString()}`);
      throw e;
    }
  }
  getPackageToken() {
    try {
      Logger.info(`AuthService execute getPackageProfile`);
      const profile = Cookies.get(key.token);
      Logger.debug(
        `AuthService execute getPackageProfile receive profile`,
        profile
      );
      return profile;
    } catch (e) {
      Logger.error(`AuthService execute getPackageProfile ${e.toString()}`);
      throw e;
    }
  }
  getRole() {
    try {
      Logger.info("AuthService execute getRole");
      Logger.debug("AuthService execute getRole current", this.role);
      return this.role;
    } catch (e) {
      Logger.error(`AuthService execute getRole error ${e.toString()}`);
      throw e;
    }
  }

  setRole(role = AuthEnum.ROLE.NOT_LOGIN) {
    try {
      Logger.info("AuthService execute setRole");
      Logger.debug("AuthService execute setRole receive role", role);
      this.role = role;
    } catch (e) {
      Logger.error(`AuthService execute setRole error ${e.toString()}`);
      throw e;
    }
  }
  handleLogout() {
    try {
      Logger.info(`AuthService execute handleLogout`);
      Cookies.remove(key.profile);
      Cookies.remove(key.token);
      this.setRole(AuthEnum.ROLE.NOT_LOGIN);
      BaseAction.setToken(null);
    } catch (e) {
      Logger.error(`AuthService execute handleLogout ${e.toString()}`);
      throw e;
    }
  }
  checkRoleNotLogin() {
    try {
      Logger.info("AuthService execute redirectPage");
      return this.role === AuthEnum.ROLE.NOT_LOGIN ? true : false;
    } catch (e) {
      Logger.error(`AuthService execute setRole error ${e.toString()}`);
      throw e;
    }
  }
}
export default new AuthService();
