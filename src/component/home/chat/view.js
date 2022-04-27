import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import { ChannelList as SBChannelList } from "sendbird-uikit";
import TypingIndicator from "./partial/CustomTypingIndicator";

import "./style.css";
import { useState } from "react";
import ChatChannelComponent from "./partial/chatChannel";
const APP_ID = "E6B8A398-8D36-424A-B4E7-97E03D93DC45";
function ChatView(props) {
  const { profile, handleBeforeSendUserMessage, handelOnChannelSelect } = props;
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [showMessage, setShowMesage] = useState(false);
  return (
    <>
      <SBProvider
        appId={APP_ID}
        userId={profile.userName}
        nickname={profile.fullName}
        // profileUrl={profile.profileUrl}
      >
        <div className="customized-app">
          <div className="sendbird-app__wrap">
            <div className="sendbird-app__channellist-wrap">
              {!showMessage && (
                <SBChannelList
                  onChannelSelect={(channel) => {
                    const [user] = channel.members.filter(
                      (e) => e.userId !== profile.userName
                    );
                    handelOnChannelSelect(user.userId);
                    if (channel && channel.url) {
                      setCurrentChannelUrl(channel.url);
                      setShowMesage(true);
                    }
                  }}
                  onProfileEditSuccess={(res) => {}}
                  sortChannelLis={(res) => {}}
                  allowProfileEdit={true}
                  disableAutoSelect={true}
                />
              )}
            </div>
            {showMessage && (
              <>
                <div
                  className="icon_back"
                  onClick={() => {
                    setShowMesage(false);
                  }}
                >
                  <i className="fa fa-hand-o-left" aria-hidden="flase"></i>
                </div>
                <ChatChannelComponent
                  currentChannelUrl={currentChannelUrl}
                  handleBeforeSendUserMessage={handleBeforeSendUserMessage}
                />
                <TypingIndicator currentChannelUrl={currentChannelUrl} />
              </>
            )}
            {/* <div className="sendbird-app__conversation-wrap"></div> */}
          </div>
        </div>
      </SBProvider>
    </>
  );
}
export default ChatView;
