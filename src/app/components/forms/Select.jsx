import React from 'react';
import InputWrapper from './InputWrapper';

const Select = ({ item, formik, handleChange }) => {
  const { name, type, label, map, list, disabled, ...rest } = item;
  return (
    <InputWrapper label={label} formik={formik} name={name}>
      <select
        disabled={disabled}
        name={name}
        className={`select select-bordered w-full 
              ${
                formik.errors[name]
                  ? 'border border-red-400 focus:border-red-400'
                  : ''
              }`}
        onChange={handleChange}
        value={formik.values[name]}
      >
        <option value='default' disabled>
          Select {name}
        </option>
        {list.map((listItem) => (
          <SelectItem key={listItem} value={listItem} label={map[listItem]} />
        ))}
      </select>
    </InputWrapper>
  );
};

export default Select;

const SelectItem = ({ value, label = value }) => (
  <option value={value}>{label}</option>
);
