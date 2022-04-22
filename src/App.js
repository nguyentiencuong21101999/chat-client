import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import { APP_ID, USER_ID, NICKNAME } from "./config";
import CustomizedApp from "./CustomizedApp";
import "sendbird-uikit/dist/index.css";

import firebase from "./service/firebaseInit";
import "@firebase/messaging";
//react-js

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  Navigate,
} from "react-router-dom";
import LoginComponent from "./component/login/component";
import Logger from "./component/service/logger";

function App() {
  const [token, setToken] = useState(null);
  React.useEffect(() => {
    const msg = firebase.messaging();
    msg
      .getToken()
      .then((data) => setToken(data))
      .catch((err) => console.log(err));
    // msg
    //   .requestPermission()
    //   .then(() => {
    //     return msg.getToken();
    //   })
    //   .then((data) => {
    //     console.warn("token", data);
    //     setToken(data);
    //   });
  });
  return (
    <>
      <div className="app-wrapper">
        {/* Token: {token} */}
        {/* <SBProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <CustomizedApp />
      </SBProvider> */}
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path={"/login"}
              element={<LoginComponent></LoginComponent>}
            />
            {/* <Navigate to={"/login"} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
