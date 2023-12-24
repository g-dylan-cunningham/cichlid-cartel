import React from 'react';
import Link from 'next/link';
import { deleteSku } from '@/modules/prisma/actions';

const SkuDeleteList = ({ specie }) => {
  const deleteSkuWithSpeciesId = deleteSku.bind(null, specie.specie_id);
  return (
    <div>
      {specie?.skus?.length > 0 && (
        <div className='mt-8 block flex-col items-center justify-between'>
          <form action={deleteSkuWithSpeciesId}>
            <div className='overflow-x-auto'>
              <table className='table'>
                {/* head */}
                <thead>
                  <tr>
                    <th>
                      <label>EDIT</label>
                    </th>
                    <th>Species</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Sex</th>
                    <th>Quantity</th>
                    <th>Delete?</th>
                  </tr>
                </thead>
                <tbody>
                  {specie.skus.map((sku) => (
                    <tr key={sku.sku_id}>
                      {/* Edit Button */}
                      <td>
                        <Link
                          href={`/admin/sku/${sku.sku_id}`}
                          className='btn btn-outline btn-primary'
                        >
                          Edit
                        </Link>
                      </td>

                      {/* Species */}
                      <td>
                        {specie.common_name} / {specie.scientific_name_name}
                      </td>

                      {/* Size */}
                      <td>{sku.size}</td>

                      {/* Price */}
                      <td>{sku.price}</td>

                      {/* Sex */}
                      <td>{sku.sex}</td>

                      {/* Quantity */}
                      <td>{sku.quantity}</td>

                      {/* actions */}
                      <td>
                        {/* <input type="checkbox" name={sku.sku_id} value={sku.sku_id} /> */}
                        <button
                          className='btn btn-error'
                          type='submit'
                          action={sku.sku_id}
                          name='sku_id'
                          value={sku.sku_id}
                        >
                          Delete Sku
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SkuDeleteList;
