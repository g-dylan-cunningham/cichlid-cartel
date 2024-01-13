import prisma from '@/modules/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Main } from '@/app/components';
import styles from './styles.module.css';

const Admin = async () => {
  const species = await prisma.species.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      skus: {
        orderBy: { created_at: 'desc' },
      },
      images: {
        where: {
          is_primary: true,
          is_thumbnail: true,
        },
      },
    },
  });
  return (
    <Main>
      <h1 className='mb-4 text-4xl'>DASHBOARD</h1>
      <div className='overflow-x-auto'>
        <table className='table table-pin-rows table-pin-cols table-xs'>
          {/* head */}
          <thead className='hidden md:table-header-group'>
            <tr className='m-6'>
              <th className='hidden md:table-cell'>
                <label></label>
              </th>
              <th className='hidden md:table-cell'>Species</th>
              <th className='hidden md:table-cell'>Description</th>
              <th className='hidden md:table-cell'>
                Sizes
                <img
                  id={styles.sizeInfoIcon}
                  src='/iconInfo.svg'
                  className='h-4 w-4'
                  alt='size chart'
                  title='size chart'
                />
                <div className={styles.sizeInfo}>
                  MY INFO SKDJFHSKDJHFKSJHDF{' '}
                </div>
              </th>
              <th className='hidden md:table-cell'>Price</th>
              <th className='hidden md:table-cell'>Sex</th>
              <th className='hidden md:table-cell'>Quantity</th>
              <th className='hidden md:table-cell'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {species.map((specie) => (
              // DESKTOP
              <tr key={specie.specie_id}>
                <td className='DESKTOP hidden md:table-cell'>
                  <Link
                    href={`/admin/species/${specie.specie_id}`}
                    className='badge badge-ghost badge-sm hover:bg-blue-400 hover:font-bold hover:underline'
                  >
                    EDIT
                  </Link>
                </td>
                <td className='DESKTOP hidden md:table-cell'>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <Image
                          src={specie.images[0]?.thumbnail_url}
                          alt=''
                          width={30}
                          height={30}
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>{specie.common_name}</div>
                      <div className='text-sm opacity-50'>
                        {specie.scientific_name}
                      </div>
                    </div>
                  </div>
                </td>

                <td
                  className='hidden md:table-cell'
                  style={{ maxWidth: '10vw' }}
                >
                  {specie.description}
                </td>
                <td className='hidden md:table-cell'>
                  <TableElement specie={specie} property='size' />
                </td>
                <td className='hidden md:table-cell'>
                  <TableElement specie={specie} property='price' />
                </td>
                <td className='hidden md:table-cell'>
                  <TableElement specie={specie} property='sex' />
                </td>
                <td className='hidden md:table-cell'>
                  <TableElement specie={specie} property='quantity' />
                </td>
                <td className='hidden md:table-cell'>
                  <Link
                    href={`/admin/sku//create/${specie.specie_id}`}
                    className='badge badge-accent badge-sm block hover:bg-green-200 hover:font-bold hover:underline'
                  >
                    Add SKU
                  </Link>
                </td>

                {/* // MOBILE */}
                <td className='pt-2 align-top md:hidden'>
                  <Link
                    href={`/admin/species/${specie.specie_id}`}
                    className='badge badge-ghost badge-sm py-3'
                  >
                    EDIT
                  </Link>
                  <Link
                    href={`/admin/sku//create/${specie.specie_id}`}
                    className='badge badge-accent badge-sm mt-2 py-2'
                  >
                    ADD
                  </Link>
                </td>
                <td className='pt-2 align-top md:hidden'>
                  {specie.common_name ? (
                    <div className='font-bold'>{specie.common_name}</div>
                  ) : (
                    <div className='font-bold'>{specie.scientific_name}</div>
                  )}
                </td>
                {/* className="table-cell md:hidden" */}
                <td className='space-between flex w-full align-top md:hidden'>
                  <table>
                    <tbody className='w-full'>
                      <tr className='w-full'>
                        <td className='w-1/4'>
                          <TableElement
                            specie={specie}
                            property='size'
                            isMobile={true}
                          />
                        </td>
                        <td className='w-1/4'>
                          <TableElement
                            specie={specie}
                            property='price'
                            isMobile={true}
                          />
                        </td>
                        <td className='w-1/4'>
                          <TableElement
                            specie={specie}
                            property='sex'
                            isMobile={true}
                          />
                        </td>
                        <td className='w-1/4'>
                          <TableElement
                            specie={specie}
                            property='quantity'
                            isMobile={true}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
        <div className='mt-3 flex w-full justify-center'>
          <Link href={`/admin/species/create`} className='link link-primary'>
            Add New Species
          </Link>
        </div>
      </div>

      <div className='divider m-12'></div>
    </Main>
  );
};

const TableElement = ({ specie, property, isMobile }) => {
  if (isMobile) {
    return (
      <ul className='flex flex-col'>
        {specie.skus.map((sku, i) => {
          return (
            <li className='grow' key={sku.sku_id}>
              {property === 'price' && '$'}
              {sku[property]}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul>
      {specie.skus.map((sku, i) => {
        return (
          <li key={sku.sku_id}>
            <Link
              href={`/admin/sku/${sku.sku_id}`}
              className='badge badge-ghost badge-sm'
            >
              {property === 'price' && '$'}
              {sku[property]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Admin;
