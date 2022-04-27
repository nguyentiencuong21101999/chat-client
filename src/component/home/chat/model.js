class ModelView {
  type;
  content;
  userName;
}
class ModelRequest {
  type;
  content;
  userName;

  setType(type) {
    this.type = type;
    return this;
  }
  setContent(content) {
    this.content = content;
    return this;
  }
  setUserName(userName) {
    this.userName = userName;
    return this;
  }
}

export { ModelRequest, ModelView };
