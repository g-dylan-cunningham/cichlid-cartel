import React from 'react';

const FormButton = ({
  onClick,
  type,
  text,
  btnClass = '',
  spanClass = '',
  variant = 'primary',
  ...rest
}) => {
  const buttonClasses = `btn w-24
    ${variant === 'secondary' ? 'btn-outline' : 'btn-success'}
    ${btnClass}`;

  const spanClasses = `text-lg ${spanClass}`;
  return (
    <button type={type} className={buttonClasses} onClick={onClick} {...rest}>
      <span className={spanClasses}>{text}</span>
    </button>
  );
};

export default FormButton;
