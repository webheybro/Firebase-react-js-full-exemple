import React from "react";

function MyInputText({
  id = "",
  name,
  value = "",
  //optionnels
  type = "text",
  label = "",
  placeholder = "",
  size = "lg",
  classes = "",
  max = "255",
  ...rest
}) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="mt-3 mb-0">
          {label}
        </label>
      )}
      <div className={size && `input-group-${size}`}>
        <input
          {...rest}
          id={id ? id : "input_" + name + "_" + type}
          type={type}
          step={type && "any"}
          name={name}
          placeholder={placeholder}
          value={value}
          maxLength={max}
          className={classes ? `form-control ${classes}` : `form-control`}
        />
      </div>
    </div>
  );
}
export default MyInputText;
