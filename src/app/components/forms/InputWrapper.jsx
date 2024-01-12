import React from 'react';

const InputWrapper = ({ label, formik, name, children }) => {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text font-sans'>{label}</span>
      </div>
      {children}
      {formik.errors[name] && formik.touched[name] && (
        <span className='text-m mt-1 text-red-400'>{formik.errors[name]}</span>
      )}
    </label>
  );
};

export default InputWrapper;
