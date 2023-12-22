import React from "react";

// defaults to text input, but can support other types
const FormInput = ({
  label,
  id,
  defaultValue,
  disabled=false,
  type="text",
  children
}) => {

  const getComponentChildren = () => {
    if (!children) {
      return (<input
        type={type}
        name={id}
        id={id}
        className="input input-bordered w-full"
        defaultValue={defaultValue}
        disabled={!!disabled}
      ></input>)
    } 
    return children; // supports select, textarea etc
  }


  return (
  <label className="form-control w-full">
    <div className="label">
      <span className="label-text font-sans">{label}</span>
    </div>
    {getComponentChildren()}
  </label>
)};

export default FormInput;
