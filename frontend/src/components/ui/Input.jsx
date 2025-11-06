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
  className = ""
}) => {
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
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default Input;
