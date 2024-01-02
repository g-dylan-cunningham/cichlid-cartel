import React from 'react';

const SkuList = ({ skus }) => {
  if (skus && skus.length === 0) {
    return <div>UNAVAILABLE - contact seller for details</div>;
  }
  return (
    <section>
      <h3>Availability:</h3>
      <div className='mt-8 block flex-col items-center justify-between'>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th>Size</th>
                <th>Price</th>
                <th>Sex</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {skus.map((sku) => (
                <tr key={sku.sku_id}>
                  <td>{sku.size}</td>
                  <td>{sku.price}</td>
                  <td>{sku.sex}</td>
                  <td>{sku.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SkuList;
