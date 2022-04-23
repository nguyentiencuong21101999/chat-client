import React, { Component } from "react";
import { useNavigate } from "react-router";
import Logger from "../service/logger";
import { ModelView, ModelRequest } from "./model";
import View from "./view";
import Timeout from "../../base/component/timeout";
import { signUp } from "./action";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(
        this.setState.bind(this),
        this.handleRequest.bind(this),
        this
      ),
      data: new ModelView(),
      ui: {
        isShowBtn: true,
      },
      func: {
        null: this.handleLoginSuccess.bind(this),
        "error.existedPhoneNumber":
          this.handleLoginExistedPhoneNumber.bind(this),
        "error.alreadyHaveWolfdenAccount":
          this.handleLoginExistedUserName.bind(this),
        "error.existedEmail": this.handleLoginExistedEmail.bind(this),
      },
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleLoginSuccess = () => {
    try {
      Logger.info("LoginComponent execute handleLoginSuccess");
      const { timeout } = this.state;
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`LoginComponent handleLoginSuccess ${e.toString()}`);
    }
  };
  handleLoginExistedPhoneNumber = () => {
    try {
      Logger.info("LoginComponent execute handleLoginExistedPhoneNumber");
      const { ui, timeout, data } = this.state;
      timeout.setTimeout(false, "phoneNumber", "Phone number is existed.");
    } catch (e) {
      Logger.error(
        `LoginComponent handleLoginExistedPhoneNumber ${e.toString()}`
      );
    }
  };
  handleLoginExistedUserName = () => {
    try {
      Logger.info("LoginComponent execute handleLoginExistedUserName");
      const { ui, timeout, data } = this.state;
      timeout.setTimeout(false, "userName", "UserName is existed.");
    } catch (e) {
      Logger.error(`LoginComponent handleLoginExistedUserName ${e.toString()}`);
    }
  };
  handleLoginExistedEmail = () => {
    try {
      Logger.info("LoginComponent execute handleLoginExistedEmail");
      const { ui, timeout, data } = this.state;
      timeout.setTimeout(false, "email", "Email is existed.");
    } catch (e) {
      Logger.error(`LoginComponent handleLoginExistedEmail ${e.toString()}`);
    }
  };
  handleOnChange(name, value) {
    try {
      Logger.info("LoginComponent execute handleOnChange");
      const { data, ui } = this.state;
      data[name] = value;
      let temp = { ...data };
      let status =
        Object.values(temp).findIndex((item) => item.toString() === "") == -1 &&
        data["confirm_password"] == data["password"];
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (error) {
      const { ui } = this.state;
      ui.isShowBtn = false;
    }
  }

  async handleSubmit() {
    try {
      Logger.info("LoginComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout(true);
    } catch (e) {
      Logger.error(`LoginComponent handleSubmit ${e.toString()}`);
      // this.state.timeout.setTimeout(false);
    }
  }
  async handleRequest() {
    try {
      Logger.info("LoginComponent execute handleRequest");
      const { data, func, timeout } = this.state;
      const payload = new ModelRequest()
        .setFirstName(data["firstName"])
        .setLastName(data["lastName"])
        .setEmail(data["email"])
        .setUserName(data["userName"])
        .setPassword(data["password"])
        .setPhoneNumber(data["phoneNumber"])
        .setTokenFirebase(data["tokenFireBase"]);

      const res = await signUp(payload);
      timeout.handleResponse(res.error);
      // func[res.error ? res.error.code : res.error](res);
    } catch (e) {
      Logger.error(`LoginComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false, "all", "system busy");
    }
  }
  render() {
    const { ui, timeout } = this.state;
    return (
      <View
        ui={ui}
        timeout={timeout}
        handleOnChange={this.handleOnChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};
export default withNavigation(LoginComponent);
