import React from "react";

const Input = ({ item, formik, handleChange}) => {
  // console.log("formic", formik.errors);
  const { name, type, label, ...rest } = item;
  // console.log('rest', rest)
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-sans">{label}</span>
      </div>
      { type !== "textarea" ? (
      <input
        type={type}
        name={name}
        onChange={handleChange}
        value={formik.values[name]}
        // onBlur={formik.handleBlur}
        className={`input input-bordered w-full
        ${
          formik.errors[name]
            ? "border border-red-400 focus:border-red-400"
            : ""
        }`}
        {...rest}
      />
       ) : (
        <textarea
        type={type}
        value={formik.values[name]}
        // placeholder={placeholder}
        name={name}
        onChange={handleChange}
        // onBlur={formik.handleBlur}
        className={`textarea textarea-bordered
        ${
          formik.errors[name]
            ? "border border-red-400 focus:border-red-400"
            : ""
        }`}
        {...rest}
      />
      )}
      {formik.errors[name] && formik.touched[name] && (
        <span className="mt-1 text-m text-red-400">{formik.errors[name]}</span>
      )}
    </label>
  );
};

export default Input;
