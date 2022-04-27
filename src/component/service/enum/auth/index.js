import RouteEnum from "../route/index";

const ROLE = {
  NOT_LOGIN: 0,
  USER: 1,
};
const ROLE_REDIRECT = {
  [ROLE.NOT_LOGIN]: RouteEnum.LOGIN,
  [ROLE.USER]: RouteEnum.USER,
};
class AuthEnum {
  static get ROLE() {
    return ROLE;
  }
  static get ROLE_REDIRECT() {
    return ROLE_REDIRECT;
  }
}

export default AuthEnum;
