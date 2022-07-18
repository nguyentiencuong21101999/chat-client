import firebase from "firebase";
import Logger from "../logger";
import "@firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyCWQldong-KKi2wnX1bY4JiLZYtzzNifKI",
  authDomain: "chat-notification-b50ad.firebaseapp.com",
  projectId: "chat-notification-b50ad",
  storageBucket: "chat-notification-b50ad.appspot.com",
  messagingSenderId: "1076035909055",
  appId: "1:1076035909055:web:8e39a8ba2a48170004dd0a",
  measurementId: "G-EEBVLDFYQT",
};
class Firebase {
  constructor() {
    if (!Firebase.instance) {
      this.tokenFirebase = null;
      this.firebase = firebase.initializeApp(firebaseConfig);
      this.getToken = this.getToken.bind(this);
      //  this.isSupported = true
      Firebase.instance = this;
    }
    return Firebase.instance;
  }

  async getToken() {
    try {
      Logger.info("Firebase execute function getToken");
      const msg = this.firebase.messaging();
      return firebase.messaging.isSupported() ? await msg.getToken() : null;
    } catch (err) {
      Logger.info(err);
    }
  }
}
export default new Firebase();
