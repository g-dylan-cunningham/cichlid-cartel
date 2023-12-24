import React from 'react';
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';

const Field = ({ item, ...rest }) => {
  const { component } = item;
  switch (component) {
    case 'Input':
      return <Input item={item} {...rest} />;
    case 'TextArea':
      return <TextArea item={item} {...rest} />;
    case 'Select':
      return <Select item={item} {...rest} />;
    case 'default':
      return <div>no form component</div>;
  }
};

export default Field;
