import Helper from "../../component/service/helper";

const Input = (props) => {
  const {
    label,
    styleLabel,
    error,
    name,
    value,
    type,
    className,
    styleInput,
    onChange,
    placeholder,
    disabled,
  } = props;

  const styles = !Helper.isEmpty(error)
    ? { fontSize: "1rem", color: "#d32f2f" }
    : { fontSize: "1rem", color: "#6b778c" };
  const colors = !Helper.isEmpty(error) ? "#d32f2f" : "#ff8585";
  return (
    <>
      {label ? <p style={{ ...styles, ...styleLabel }}>{label}</p> : null}
      <input
        value={value}
        type={type}
        onChange={onChange}
        name={name}
        className={className}
        style={styleInput}
        placeholder={placeholder}
        disabled={disabled}
      />
      <p style={{ color: colors, marginTop: "2px" }}>{error}</p>
    </>
  );
};
export default Input;
