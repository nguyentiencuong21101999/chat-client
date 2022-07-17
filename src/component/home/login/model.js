class ModelView {
  password = "";
  userName = "";
  tokenFireBase = "";
}

class ModelRequest {
  userName;
  password;
  tokenFirebase;

  setUserName(val) {
    this.userName = val;
    return this;
  }

  setPassword(val) {
    this.password = val;
    return this;
  }

  setTokenFirebase(val) {
    this.tokenFireBase = val;
    return this;
  }
}

export { ModelView, ModelRequest };
