
import PasswordHook from "../../../core/hook/login/password.hook";
import UserNameHook from "../../../core/hook/login/userName.hook";
import "../../register/style.css";
function Login(props) {
  const { ui, timeout, handleOnChange, handleSubmit } = props;

  return (
    <>
      <UserNameHook
        name="userName"
        value={""}
        type={"text"}
        //placeholder={"Enter username...."}
        onChange={handleOnChange}
        label="Username"
        disabled={timeout.status}
        error={timeout.field == "userName" ? timeout.message : null}
        styleInput={{ width: "171px" }}
        styleLabel={{ fontWeight: "bold" }}
      //className="form-control"
      />
      <PasswordHook
        name="password"
        value={""}
        type={"password"}
        //placeholder={"Enter password...."}
        onChange={handleOnChange}
        label="Password"
        styleInput={{ width: "171px" }}
        disabled={timeout.status}
        error={timeout.field == "password" ? timeout.message : null}
        styleLabel={{ fontWeight: "bold" }}
      //className="form-control"
      />
    </>
  );
}
export default Login;
