import React, { useState, useEffect, useCallback, Component } from "react";
import "sendbird-uikit/dist/index.css";

//react-js

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import RegisterComponent from "./component/register/component";
import LoginComponent from "./component/login/component";
import Logger from "./component/service/logger";
import Helper from "./component/service/helper";
import Auth from "./component/service/auth";
import AuthEnum from "./component/service/enum/auth";
import BaseAction from "./base/action";
import { AuthRouteNotLogin, AuthRouteUser } from "./base/component/AuthRoute";
import ChatComponent from "./component/home/chat/component";
import HeaderComponent from "../src/layout/header/component";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    try {
      Logger.info(`AppComponent execute componentDidMount`);
      const token = Auth.getPackageToken();
      Logger.debug(
        `AppComponent execute componentDidMount receive Auth in cookies`,
        Auth
      );
      if (!Helper.isEmpty(token)) {
        Auth.setRole(AuthEnum.ROLE.USER);
        BaseAction.setToken(token);
      } else {
        Auth.handleLogout();
        Auth.setRole();
      }
      this.setState({ loading: false });
    } catch (e) {
      Logger.error(`AppComponent execute componentDidMount ${e.toString()}`);
    }
  }
  render() {
    const { loading, ui } = this.state;
    return (
      <>
        {loading ? null : (
          <div>
            {/* Token: {token} */}
            {/* <SBProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <CustomizedApp />
      </SBProvider> */}
            <BrowserRouter>
              <Routes>
                <Route
                  exact
                  path={"/register"}
                  element={
                    <AuthRouteNotLogin>
                      <RegisterComponent />
                    </AuthRouteNotLogin>
                  }
                />
                <Route
                  exact
                  path={"/login"}
                  element={
                    <AuthRouteNotLogin>
                      <LoginComponent />
                    </AuthRouteNotLogin>
                  }
                />
                <Route exact path={"/"} element={<Outlet />}>
                  <Route
                    exact
                    path={"/"}
                    element={
                      <AuthRouteUser>
                        <HeaderComponent />
                        <ChatComponent />
                      </AuthRouteUser>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </BrowserRouter>
          </div>
        )}
      </>
    );
  }
}
// export const withNavigation = (Component) => {
//   return (props) => <Component {...props} navigate={useNavigate()} />;
// };
// export default withNavigation(App);
// function App() {
//   const [token, setToken] = useState(null);
//   React.useEffect(() => {
//     const msg = firebase.messaging();
//     msg
//       .getToken()
//       .then((data) => setToken(data))
//       .catch((err) => console.log(err));
//     // msg
//     //   .requestPermission()
//     //   .then(() => {
//     //     return msg.getToken();
//     //   })
//     //   .then((data) => {
//     //     console.warn("token", data);
//     //     setToken(data);
//     //   });
//   });
//   return (
//     <>
//       <div className="app-wrapper">
//         {/* Token: {token} */}
//         {/* <SBProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
//         <CustomizedApp />
//       </SBProvider> */}
//         <BrowserRouter>
//           <Routes>
//             <Route
//               exact
//               path={"/register"}
//               element={<RegisterComponent></RegisterComponent>}
//             />
//             <Route
//               exact
//               path={"/login"}
//               element={<LoginComponent></LoginComponent>}
//             />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </>
//   );
// }

export default App;
