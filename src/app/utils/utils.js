const countDecimals = (value) => {
  if (!value || Math.floor(value) === value) return 0;
  return value.toString().split('.')[1].length || 0;
};

export { countDecimals };
