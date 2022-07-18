import { Component } from "react";
import { withNavigation } from "../../../base/component";
import Timeout from "../../../base/component/timeout";
import { ModelView } from "../../login/model";
import auth from "../../service/auth";
import Logger from "../../service/logger";

import View from "./view";
//render component
import Login from "../login/component";
class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(
        this.setState.bind(this),
        this.handleRequest.bind(this),
        this
      ),
      ui: {
        loading: true,
        profile: null,
        modulesList: [{
          name: "USER",
          childModulesList: [{
            name: "Login",
            filed: {
              userName: "",
              password: ""
            },
            method: "POST",
            component: (props) => < Login props={props} />

          }]
        },
        {
          name: "TRANSACTION",
          childModulesList: [{
            name: "Login",
            filed: {
              userName: "",
              password: ""
            },
            method: "POST",
            //component: (props) => < Login props={props} />
          }]
        }]
      },

    };
  }

  componentDidMount() {
    try {
      const { ui } = this.state;
      ui.profile = auth.getPackageProfile();
      ui.loading = false;
      this.setState({ ui });
    } catch (err) { }
  }
  async handleShowChildModules() {
    try {
      Logger.info("HomeComponent execute handleRequest");

    } catch (e) {
      Logger.error(`HomeComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false, "all", "system busy");
    }
  }
  async handleRequest() {
    try {
      Logger.info("HomeComponent execute handleRequest");
      // func[res.error ? res.error.code : res.error](res);
    } catch (e) {
      Logger.error(`HomeComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false, "all", "system busy");
    }
  }
  render() {
    const { ui } = this.state;
    return ui.loading ? null : (
      <View
        ui={ui}

      />
    );
  }
}
export default withNavigation(HomeComponent);
