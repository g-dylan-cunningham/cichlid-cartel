import React from 'react';
import Link from 'next/link';
import { deleteSku } from '@/modules/prisma/actions';

const SkuList = ({ specie, isDeleteEnabled, children }) => {
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
                    <th className='table-cell'>
                      <div className='pl-3'></div>
                    </th>
                    <th className='hidden md:table-cell'>Species</th>

                    <th className='hidden md:table-cell'>Price</th>
                    <th className='hidden md:table-cell'>Sex</th>

                    <th className='table-cell md:hidden'>
                      <div>Price /</div>
                      <div>Sex</div>
                    </th>

                    <th className='hidden md:table-cell'>Size</th>
                    <th className='hidden md:table-cell'>Quantity</th>

                    <th className='table-cell md:hidden'>
                      <div>Size /</div>
                      <div>Quantity</div>
                    </th>
                    {isDeleteEnabled && <th>Delete?</th>}
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
                      <td className='hidden md:table-cell'>
                        {specie.common_name}
                        {specie.common_name && specie.scientific_name
                          ? ' / '
                          : ''}
                        {specie.scientific_name}
                      </td>

                      {/* Price */}
                      <td className='hidden md:table-cell'>{sku.price}</td>

                      {/* Sex */}
                      <td className='hidden md:table-cell'>{sku.sex}</td>

                      {/* MOBILE */}
                      <td className='table-cell md:hidden'>
                        <div>${sku.price}</div>
                        <div>{sku.sex}</div>
                      </td>

                      {/* Size */}
                      <td className='hidden md:table-cell text-center'>{sku.size}</td>

                      {/* Quantity */}
                      <td className='hidden md:table-cell text-center'>{sku.quantity}</td>

                      {/* MOBILE */}
                      <td className='table-cell md:hidden'>
                        <div className='text-center'>{sku.size}</div>
                        <div className='text-center'>{sku.quantity}</div>
                      </td>

                      {/* actions */}
                      {isDeleteEnabled && (
                        <td>
                          {/* <input type="checkbox" name={sku.sku_id} value={sku.sku_id} /> */}
                          <button
                            className='btn btn-error'
                            type='submit'
                            action={sku.sku_id}
                            name='sku_id'
                            value={sku.sku_id}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      )}
      <div className='my-5 flex flex-row flex-wrap justify-center'>
        {children}
        <Link
          className='btn-solid btn btn-accent btn-wide mx-2 mt-3 md:mt-2'
          href={`/admin/sku/create/${specie.specie_id}`}
        >
          Add another SKU
        </Link>
      </div>
    </div>
  );
};

export default SkuList;
