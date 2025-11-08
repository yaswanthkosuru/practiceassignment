import "./Input.css";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  name,
  id,
  disabled = false,
  required = false,
  className = "",
  min,
  max,
  step
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;

    if (type === "number") {
      onChange(newValue === "" ? "" : newValue);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default Input;
