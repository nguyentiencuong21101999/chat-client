import { Link } from "react-router-dom";
import Button from "../../core/button";
import ConfirmPasswordHook from "../../core/hook/register/confirmPassword.hook";
import EmailHook from "../../core/hook/register/email.hook";
import FirstName from "../../core/hook/register/firstName.hook";
import LastNameHook from "../../core/hook/register/lastName.hook";
import PasswordHook from "../../core/hook/register/password.hook";
import PhoneNumberHook from "../../core/hook/register/phoneNumber.hook";
import UserNameHook from "../../core/hook/register/userName.hook";
import "./style.css";
function Register(props) {
  const { ui, timeout, handleOnChange, handleSubmit } = props;
  return (
    <div
      className="wrapper"
      //   style="background-image: url('images/bg-registration-form-2.jpg');"
    >
      <div className="inner">
        <div className="form">
          <h3>Register</h3>
          <div className="form-group">
            <div className="form-wrapper">
              <FirstName
                name="firstName"
                value={""}
                type={"text"}
                placeholder={"Enter first name...."}
                onChange={handleOnChange}
                label="First name"
                //error="sai mat khau"
                disabled={timeout.status}
                className="form-control"
              />
            </div>
            <div className="form-wrapper">
              <LastNameHook
                name="lastName"
                value={""}
                type={"text"}
                placeholder={"Enter last name...."}
                onChange={handleOnChange}
                label="Last name"
                disabled={timeout.status}
                //error="sai mat khau"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-wrapper">
            <EmailHook
              name="email"
              value={""}
              type={"text"}
              placeholder={"Enter email...."}
              onChange={handleOnChange}
              label="Email"
              disabled={timeout.status}
              error={timeout.field == "email" ? timeout.message : null}
              className="form-control"
            />
          </div>
          <div className="form-wrapper">
            <PhoneNumberHook
              name="phoneNumber"
              value={""}
              type={"text"}
              placeholder={"Enter phone number...."}
              onChange={handleOnChange}
              label="Phone Number"
              disabled={timeout.status}
              error={timeout.field == "phoneNumber" ? timeout.message : null}
              className="form-control"
            />
          </div>
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
              //error="sai mat khau"
              className="form-control"
            />
          </div>
          <div className="form-wrapper">
            <ConfirmPasswordHook
              name="confirm_password"
              value={""}
              type={"password"}
              placeholder={"Enter Confirm password...."}
              onChange={handleOnChange}
              label="Confirm password"
              disabled={timeout.status}
              //error="sai mat khau"
              className="form-control"
            />
          </div>
          <div className="btn">
            <Button
              type="button"
              text="Register Now"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              disabled={ui.isShowBtn || timeout.status}
            />
          </div>
          <div className="link">
            Already have an account? <Link to={"/login"}> Login now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
