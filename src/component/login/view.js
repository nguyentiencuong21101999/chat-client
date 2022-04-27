import { Link } from "react-router-dom";
import Button from "../../core/button";
import PasswordHook from "../../core/hook/login/password.hook";
import UserNameHook from "../../core/hook/login/userName.hook";
import "../register/style.css";
function Login(props) {
  const { ui, timeout, handleOnChange, handleSubmit } = props;

  return (
    <div
      className="wrapper"
      //   style="background-image: url('images/bg-registration-form-2.jpg');"
    >
      <div className="inner">
        <div className="form">
          <h3>Login</h3>
          <div className="form-wrapper">
            <UserNameHook
              name="userName"
              value={""}
              type={"text"}
              placeholder={"Enter username...."}
              onChange={handleOnChange}
              label="Username"
              disabled={timeout.status}
              error={timeout.field == "userName" ? timeout.message : null}
              className="form-control"
            />
          </div>
          <div className="form-wrapper">
            <PasswordHook
              name="password"
              value={""}
              type={"password"}
              placeholder={"Enter password...."}
              onChange={handleOnChange}
              label="Password"
              disabled={timeout.status}
              error={timeout.field == "password" ? timeout.message : null}
              className="form-control"
            />
          </div>
          <div className="btn">
            <Button
              type="button"
              text="Login"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              disabled={ui.isShowBtn || timeout.status}
            />
          </div>

          <div className="link">
            Don't have an account yet?
            <Link to={"/register"}> Register now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
