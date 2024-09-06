import React from "react";

const FormInput = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    {label}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-black border-solid"
    />
  </div>
);

export default FormInput;
