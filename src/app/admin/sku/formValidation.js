import { countDecimals } from '@/app/utils';

const validationSchema = (values, props) => {
  const errors = {};
  if (!values.size || values.size === 'default') {
    errors.size = 'Please select a size for this sku';
  }
  if (!values.sex || values.sex === 'default') {
    errors.sex = 'Please select a sex for this sku';
  }
  const price = parseFloat(values.price, 10);
  if (!price) {
    errors.price = 'Please add a price for this sku';
  }

  const decimalLength = countDecimals(price);
  if (decimalLength > 2) {
    errors.price = 'Please price this item reasonably';
  }

  if (price < 0 || price > 2000) {
    errors.price = 'Please price this item reasonably';
  }
  if (!values.quantity) {
    errors.quantity = 'Please add a quantity greater than zero';
  }

  if (parseInt(values.quantity) != values.quantity) {
    errors.quantity = 'Please enter number of fish available for this sku';
  }

  return errors;
};

export default validationSchema;
