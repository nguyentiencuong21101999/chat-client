import React, { Component } from "react";
import View from "./view";
import { SignOut } from "./action";
import Timeout from "../../base/component/timeout";
import Logger from "../../component/service/logger";
import auth from "../../component/service/auth";
import { withNavigation } from "../../base/component";


class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(
        this.setState.bind(this),
        this.handleRequest.bind(this),
        this
      ),
      ui: {
        isShowBtn: true,
      },
      func: {
        "error.signOutSuccess": this.handleSignOutSuccess.bind(this),
      },
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOutSuccess = () => {
    try {
      Logger.info("RegisterComponent execute handleSignOutSuccess");
      const { timeout } = this.state;
      const { navigate, handleNavigateWithState } = this.props;
      auth.handleLogout();
      handleNavigateWithState(navigate, "/login");
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`RegisterComponent handleSignOutSuccess ${e.toString()}`);
    }
  };

  async componentDidMount() {
    try {
      Logger.info("LoginComponent execute componentDidMount");
    } catch (e) {
      Logger.error(`LoginComponent handleRequest ${e.toString()}`);
    }
  }

  async handleSignOut() {
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
      const {  timeout } = this.state;
     
      const res = await SignOut();
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
      <View ui={ui} timeout={timeout} handleSignOut={this.handleSignOut} />
    );
  }
}

export default withNavigation(HeaderComponent);
