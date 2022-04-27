import Cookies from "universal-cookie";
import Helper from "../helper";
import Logger from "../logger";

class CookiesService {
  static set(key, data, expiredAt) {
    try {
      Logger.info("CookiesService execute set");
      Logger.debug("CookiesService execute set receive key", key);
      Logger.debug("CookiesService execute set receive data", data);
      Logger.debug("CookiesService execute set receive expiredAt", expiredAt);
      const cookies = new Cookies();
      // data = JSON.stringify(data)
      // data = Helper.encodeBase64(data)
      // data = Helper.encodeBase64(data)
      if (!Helper.isEmpty(expiredAt)) {
        cookies.set(Helper.hashMD5(key), data, {
          maxAge: expiredAt,
          path: "/",
        });
      } else {
        cookies.set(Helper.hashMD5(key), data, { path: "/" });
      }
    } catch (e) {
      Logger.error("CookiesService execute set");
      throw e;
    }
  }

  static get(key) {
    try {
      Logger.info("CookiesService execute get");
      Logger.debug("CookiesService execute get receive key", key);
      const cookies = new Cookies();
      let data = cookies.get(Helper.hashMD5(key));
      if (data) {
        // data = Helper.decodeBase64(data)
        // data = Helper.decodeBase64(data)
        // data = JSON.parse(data)
        return data;
      }
      return null;
    } catch (e) {
      Logger.error(`CookiesService execute get ${e.toString()}`);
      throw e;
    }
  }

  static remove(key) {
    try {
      Logger.info("CookiesService execute remove");
      Logger.debug("CookiesService execute remove receive key", key);
      const cookies = new Cookies();
      cookies.remove(Helper.hashMD5(key), { path: "/" });
    } catch (e) {
      Logger.error(`CookiesService execute remove ${e.toString()}`);
      throw e;
    }
  }
}

export default CookiesService;
