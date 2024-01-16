const countDecimals = (value) => {
  if (!value || Math.floor(value) === value) return 0;
  return value.toString().split('.')[1].length || 0;
};

const getMinSkuPrice = (skus) => {
  const priceArr = skus.map(sku => parseFloat(sku.price, 10))
  return "$" + Math.min(...priceArr);
}
export {
  countDecimals,
  getMinSkuPrice,
};
