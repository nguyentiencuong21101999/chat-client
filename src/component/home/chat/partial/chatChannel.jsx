import {
  Channel as SBConversation,
  withSendBird,
  sendBirdSelectors,
} from "sendbird-uikit";
import ChatEnum from "../../../service/enum/chat";

const ChatChannelComponent = (props) => {
  const { currentChannelUrl, handleBeforeSendUserMessage } = props;
  const ChannelWithOnBeforeActions = ({ sdk }) => (
    <SBConversation
      channelUrl={currentChannelUrl}
      replyType="QUOTE_REPLY"
      disableUserProfile={true}
      useReaction={true}
      onBeforeSendUserMessage={(text) => {
        const params = new sdk.UserMessageParams();
        console.log(params);
        params.message = text;
        setTimeout(() => {
          handleBeforeSendUserMessage(
            ChatEnum.TYPE_CHAT.message,
            params.message
          );
        }, 100);

        return params;
      }}
    />
  );
  const ChatChannel = withSendBird(ChannelWithOnBeforeActions, (store) => ({
    sdk: sendBirdSelectors.getSdk(store),
  }));

  return <ChatChannel />;
};
export default ChatChannelComponent;
