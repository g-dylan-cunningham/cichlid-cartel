import React from 'react';
import InputWrapper from './InputWrapper';

const TextArea = ({ item, formik, handleChange, children }) => {
  const { name, type, label, ...rest } = item;
  return (
    <InputWrapper label={label} formik={formik} name={name}>
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
            ? 'border border-red-400 focus:border-red-400'
            : ''
        }`}
        {...rest}
      />
    </InputWrapper>
  );
};

export default TextArea;
