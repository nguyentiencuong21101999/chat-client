const TYPE_CHAT = {
  message: 1,
  reaction: 2,
  file: 3,
};
class ChatEnum {
  static get TYPE_CHAT() {
    return TYPE_CHAT;
  }
}

export default ChatEnum;
