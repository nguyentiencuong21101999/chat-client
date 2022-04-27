class ModelView {
  firstName = "";
  lastName = "";
  email = "";
  password = "";
  phoneNumber = "";
  confirm_password = "";
  userName = "";
  tokenFireBase = "";
}

class ModelRequest {
  firstName;
  lastName;
  email;
  userName;
  password;
  phoneNumber;
  tokenFirebase;

  setFirstName(val) {
    this.firstName = val;
    return this;
  }

  setLastName(val) {
    this.lastName = val;
    return this;
  }

  setEmail(val) {
    this.email = val;
    return this;
  }

  setUserName(val) {
    this.userName = val;
    return this;
  }

  setPassword(val) {
    this.password = val;
    return this;
  }

  setPhoneNumber(val) {
    this.phoneNumber = val;
    return this;
  }

  setTokenFirebase(val) {
    this.tokenFireBase = val;
    return this;
  }
}

export { ModelView, ModelRequest };
