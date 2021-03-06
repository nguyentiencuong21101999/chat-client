/**
 * Created By Nguyen Cong Thanh on 07/24/2020 15:41.
 *
 * Copyright intelIn 2020.
 */

import Helper from "../../component/service/helper";
import Logger from "../../component/service/logger";

class Timeout {
  constructor(setState, callback = () => {}, funcAfterTimeout = () => {}) {
    this.status = false;
    this.statusLoading = false;
    this.field = "";
    this.message = "";
    this.timeout = null;
    this.setState = setState;
    this.callback = callback;
    this.funcAfterTimeout = funcAfterTimeout;

    this.setTimeout = this.setTimeout.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  setTimeout(status = true, field = "", message = "") {
    try {
      Logger.info(`Timeout execute setTimeout`);
      Logger.debug(`Timeout execute setTimeout receive status `, status);
      Logger.debug(`Timeout execute setTimeout receive field `, field);
      Logger.debug(`Timeout execute setTimeout receive message `, message);
      this.setState(
        (prevState) => ({
          timeout: {
            ...prevState.timeout,
            status: status,
            statusLoading: status,
            field: field,
            message: message,
            setTimeout: prevState.timeout.setTimeout.bind(this),
          },
        }),
        status ? this.callback : () => {}
      );
      clearTimeout(this.timeout);
      if (status) {
        this.timeout = setTimeout(() => {
          this.setTimeout(false, "all", "COMMON_SYSTEM_BUSY");
        }, 30000);
      }
    } catch (e) {
      Logger.error(`Timeout execute setTimeout ${e.toString()}`);
    }
  }
  handleResponse(res) {
    try {
      Logger.debug(`Timeout execute handleResponse with error `, res.error);
      const code = res.error != null ? res.error.code : null;
      if (this.funcAfterTimeout.state.func[code]) {
        this.funcAfterTimeout.state.func[code](res.data);
      }
    } catch (e) {
      Logger.error(`handleResponse execute ${e.toString()}`);
    }
  }
}

export default Timeout;
