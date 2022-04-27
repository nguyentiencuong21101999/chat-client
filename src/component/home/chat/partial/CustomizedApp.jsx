import React, { useState } from "react";
import {
  Channel as SBConversation,
  ChannelList as SBChannelList,
  ChannelSettings as SBChannelSettings,
} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import TypingIndicator from "./CustomTypingIndicator";

function CustomizedApp(props) {
  // props

  // useState
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showSearchMessage, setShowMessageSearch] = useState(false);

  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
            onProfileEditSuccess={(res) => {}}
            sortChannelLis={(res) => {}}
            allowProfileEdit={true}
            disableAutoSelect={true}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            replyType="QUOTE_REPLY"
            disableUserProfile={true}
            showSearchIcon={false}
            useReaction={true}
            onSearchClick={(e) => {
              setShowMessageSearch(true);
            }}
            channelUrl={currentChannelUrl}
           
          />
          <TypingIndicator currentChannelUrl={currentChannelUrl} />
        </div>
      </div>
    </div>
  );
}

export default CustomizedApp;
