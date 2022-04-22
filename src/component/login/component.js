import React, { Component } from "react";
import { useNavigate } from "react-router";
import Logger from "../service/logger";
import { ModelView, ModelRequest } from "./model";
import View from "./view";
import Timeout from "../../base/component/timeout";
import { signIn } from "./action";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(
        this.setState.bind(this),
        this.handleRequest.bind(this)
      ),
      data: new ModelView(),
      ui: {
        isShowBtn: true,
      },
      func: {
        null: this.handleLoginSuccess.bind(this),
      },
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleLoginSuccess = () => {
    try {
      Logger.info("LoginComponent execute handleLoginSuccess");
      const { ui, timeout, data } = this.state;
      // timeout.setTimeout(false, "all");
    } catch (e) {
      Logger.error(
        `LoginComponent handleUpdateChallengeFailed ${e.toString()}`
      );
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
    Logger.info("LoginComponent execute handleRequest");
    const { data, func } = this.state;
    const payload = new ModelRequest();
    // .setFirstName(data["firstName"])
    // .setLastName(data["lastName"])
    // .setEmail(data["email"])
    // .setUserName(data["userName"])
    // .setPassword(data["password"])
    // .setPhoneNumber(data["phoneNumber"])
    // .setTokenFirebase(data["tokenFireBase"]);
    const p = {
      username: "tiencuong0",
      password: "tiencuong@123s",
    };
    const res = await signIn(p);
    console.log("=========", res);
    // func[res.error ? res.error.code : res.error](res);
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
