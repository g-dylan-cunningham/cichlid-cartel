import React from 'react';
import InputWrapper from './InputWrapper';

const Input = ({ item, formik, handleChange, children }) => {
  const { name, type, label, ...rest } = item;
  return (
    <InputWrapper label={label} formik={formik} name={name}>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        value={formik.values[name]}
        // onBlur={formik.handleBlur}
        className={`input input-bordered w-full
        ${
          formik.errors[name]
            ? 'border border-red-400 focus:border-red-400'
            : ''
        }`}
        {...rest}
      />
    </InputWrapper>
  );
};

export default Input;
