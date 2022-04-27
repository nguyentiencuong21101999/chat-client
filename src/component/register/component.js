import React, { Component } from "react";
import Logger from "../service/logger";
import { ModelView, ModelRequest } from "./model";
import View from "./view";
import Timeout from "../../base/component/timeout";
import { signUp } from "./action";
import { withNavigation } from "../../base/component";
import Firebase from "../service/firebase";
class RegisterComponent extends Component {
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
        null: this.handleRegisterSuccess.bind(this),
        "error.existedPhoneNumber":
          this.handleRegisterExistedPhoneNumber.bind(this),
        "error.alreadyHaveWolfdenAccount":
          this.handleRegisterExistedUserName.bind(this),
        "error.existedEmail": this.handleRegisterExistedEmail.bind(this),
      },
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleRegisterSuccess = () => {
    try {
      Logger.info("RegisterComponent execute handleLoginSuccess");
      const { timeout } = this.state;
      const { navigate, handleNavigateWithState } = this.props;
      handleNavigateWithState(navigate, "/login");
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`RegisterComponent handleLoginSuccess ${e.toString()}`);
    }
  };
  handleRegisterExistedPhoneNumber = () => {
    try {
      Logger.info("RegisterComponent execute handleRegisterExistedPhoneNumber");
      const { timeout } = this.state;
      timeout.setTimeout(false, "phoneNumber", "Phone number is existed.");
    } catch (e) {
      Logger.error(
        `RegisterComponent handleRegisterExistedPhoneNumber ${e.toString()}`
      );
    }
  };
  handleRegisterExistedUserName = () => {
    try {
      Logger.info("RegisterComponent execute handleRegisterExistedUserName");
      const { timeout } = this.state;
      timeout.setTimeout(false, "userName", "UserName is existed.");
    } catch (e) {
      Logger.error(
        `RegisterComponent handleRegisterExistedUserName ${e.toString()}`
      );
    }
  };
  handleRegisterExistedEmail = () => {
    try {
      Logger.info("RegisterComponent execute handleRegisterExistedEmail");
      const { timeout } = this.state;
      timeout.setTimeout(false, "email", "Email is existed.");
    } catch (e) {
      Logger.error(
        `RegisterComponent handleRegisterExistedEmail ${e.toString()}`
      );
    }
  };
  async componentDidMount() {
    try {
      Logger.info("LoginComponent execute componentDidMount");
      const { data } = this.state;
      const tokenFirebase = await Firebase.getToken();
      data["tokenFireBase"] = tokenFirebase;
    } catch (e) {
      Logger.error(`LoginComponent handleRequest ${e.toString()}`);
    }
  }
  handleOnChange(name, value) {
    try {
      Logger.info("RegisterComponent execute handleOnChange");
      const { data, ui } = this.state;
      data[name] = value;
      let temp = { ...data };
      delete temp["tokenFireBase"];
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
      Logger.info("RegisterComponent execute handleSubmit");
      const { timeout } = this.state;
      timeout.setTimeout(true);
    } catch (e) {
      Logger.error(`RegisterComponent handleSubmit ${e.toString()}`);
      // this.state.timeout.setTimeout(false);
    }
  }
  async handleRequest() {
    try {
      Logger.info("RegisterComponent execute handleRequest");
      const { data, timeout } = this.state;
      const payload = new ModelRequest()
        .setFirstName(data["firstName"])
        .setLastName(data["lastName"])
        .setEmail(data["email"])
        .setUserName(data["userName"])
        .setPassword(data["password"])
        .setPhoneNumber(data["phoneNumber"])
        .setTokenFirebase(data["tokenFireBase"]);
      const res = await signUp(payload);
      timeout.handleResponse(res);
      // func[res.error ? res.error.code : res.error](res);
    } catch (e) {
      Logger.error(`RegisterComponent handleRequest ${e.toString()}`);
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

export default withNavigation(RegisterComponent);
