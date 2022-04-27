import { Component } from "react";
import { withNavigation } from "../../../base/component";
import Timeout from "../../../base/component/timeout";
import auth from "../../service/auth";
import Logger from "../../service/logger";
import { pushNotification } from "./action";
import { ModelRequest, ModelView } from "./model";
import View from "./view";
class ChatComponent extends Component {
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
      },
    };
    this.handleBeforeSendUserMessage =
      this.handleBeforeSendUserMessage.bind(this);
    this.handelOnChannelSelect = this.handelOnChannelSelect.bind(this);
  }

  componentDidMount() {
    try {
      const { ui } = this.state;
      ui.profile = auth.getPackageProfile();
      ui.loading = false;
      this.setState({ ui });
    } catch (ẻ) {}
  }
  handelOnChannelSelect(userName) {
    try {
      Logger.info("ChatComponent execute function handleBeforeSendUserMessage");
      Logger.debug("userName", userName);
      const { data } = this.state;
      data["userName"] = userName;
    } catch (e) {
      Logger.error(
        `ChatComponent execute function handleBeforeSendUserMessage  ${e.toString()}`
      );
    }
  }
  async handleBeforeSendUserMessage(type, content) {
    try {
      Logger.info(
        "ChatComponent execute function handleBeforeSendUserMessage "
      );
      Logger.debug("Type", type);
      Logger.debug("Content", content);
      const { data } = this.state;

      const payload = new ModelRequest();
      payload.setContent(content).setType(type).setUserName(data["userName"]);
      await pushNotification(payload);
    } catch (e) {}
  }
  async handleRequest() {
    try {
      Logger.info("RegisterComponent execute handleRequest");
      // func[res.error ? res.error.code : res.error](res);
    } catch (e) {
      Logger.error(`RegisterComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false, "all", "system busy");
    }
  }
  render() {
    const { ui } = this.state;
    return ui.loading ? null : (
      <View
        profile={ui.profile}
        handleBeforeSendUserMessage={this.handleBeforeSendUserMessage}
        handelOnChannelSelect={this.handelOnChannelSelect}
      />
    );
  }
}
export default withNavigation(ChatComponent);
