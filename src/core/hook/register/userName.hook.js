import { useEffect, useState } from "react";
import Validator from "../../../component/service/validator";
import Input from "../../input";

const UserNameHook = (props) => {
  const {
    label,
    styleLabel,
    name,
    value,
    type,
    className,
    styleInput,
    onChange,
    placeholder,
    disabled,
  } = props;

  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setFirstName(value);
  }, [value]);

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const onChangeHook = (event) => {
    try {
      const { value } = event.target;
      setError("");
      // const temp = value.slice(0, maxLength)
      const temp = value;
      setFirstName(temp);
      Validator.isNotEmpty(name, temp, "Username is not empty.");
      Validator.isUsername(name, temp, "UserName is not valid");
      onChange(name, temp);
    } catch (e) {
      setError(e.message);
      onChange(name, "");
    }
  };

  return (
    <Input
      name={name}
      value={firstName}
      type={type}
      placeholder={placeholder}
      onChange={onChangeHook}
      label={label}
      error={error}
      className={className}
      styleLabel={styleLabel}
      styleInput={styleInput}
      disabled={disabled}
    />
  );
};
export default UserNameHook;
