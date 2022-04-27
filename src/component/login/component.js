import React, { Component } from "react";

import Logger from "../service/logger";
import { ModelView, ModelRequest } from "./model";
import View from "./view";
import Timeout from "../../base/component/timeout";
import { signIn } from "./action";
import Auth from "../service/auth/";
import AuthEnum from "../service/enum/auth";
import Firebase from "../service/firebase";
import { withNavigation } from "../../base/component";
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
        loading: true,
        isShowBtn: true,
      },
      func: {
        null: this.handleLoginSuccess.bind(this),
        "error.userNotFound": this.handleLoginInvalidUserName.bind(this),
        "error.invalidPassword": this.handleLoginInvalidPassword.bind(this),
      },
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleLoginSuccess = (res) => {
    try {
      Logger.info("LoginComponent execute handleLoginSuccess");
      const { timeout } = this.state;
      const { navigate, handleNavigateWithState } = this.props;
      res.role = AuthEnum.ROLE.USER;
      Auth.handleLoginSuccess(res);
      handleNavigateWithState(navigate, "/");
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`LoginComponent handleLoginSuccess ${e.toString()}`);
    }
  };
  handleLoginInvalidUserName = () => {
    try {
      Logger.info("LoginComponent execute handleLoginExistedPhoneNumber");
      const { ui, timeout, data } = this.state;
      timeout.setTimeout(false, "userName", "UserName invalid");
    } catch (e) {
      Logger.error(
        `LoginComponent handleLoginExistedPhoneNumber ${e.toString()}`
      );
    }
  };
  handleLoginInvalidPassword = () => {
    try {
      Logger.info("LoginComponent execute handleLoginInvalidPassword");
      const { timeout } = this.state;
      timeout.setTimeout(false, "password", "Password invalid.");
    } catch (e) {
      Logger.error(`LoginComponent handleLoginInvalidPassword ${e.toString()}`);
    }
  };
  async componentDidMount() {
    try {
      Logger.info("LoginComponent execute componentDidMount");
      const { data } = this.state;
      const tokenFirebase = await Firebase.getToken();
      console.log(tokenFirebase);
      data["tokenFireBase"] = tokenFirebase ?? null;
    } catch (e) {
      Logger.error(`LoginComponent handleRequest ${e.toString()}`);
    }
  }
  handleOnChange(name, value) {
    try {
      Logger.info("LoginComponent execute handleOnChange");
      const { data, ui } = this.state;
      data[name] = value;
      let temp = { ...data };
      delete temp["tokenFireBase"];
      let status =
        Object.values(temp).findIndex((item) => item.toString() === "") == -1;
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
        .setUserName(data["userName"])
        .setPassword(data["password"])
        .setTokenFirebase(data["tokenFireBase"]);
      const res = await signIn(payload);
      timeout.handleResponse(res);
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

export default withNavigation(LoginComponent);
