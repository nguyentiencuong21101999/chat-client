const Button = (props) => {
  const { style, className, type, text, name, onClick, disabled } = props;
  const styles = disabled
    ? {
        color: "rgba(0, 0, 0, 0.26)",
        backgroundColor: "rgba(0, 0, 0, 0.12",
        boxShadow: "none",
      }
    : {};
  return (
    <button
      style={{ ...styles, ...style }}
      name={name}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={className}
    >
      {text}
    </button>
  );
};
export default Button;
