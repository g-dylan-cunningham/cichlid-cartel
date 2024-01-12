import Link from 'next/link';
import prisma from '@/modules/prisma';
import Item from './components/Item';
import Filter from './components/Filter';
import { Main } from '@/app/components'
import { enumArr } from '@/app/config';

export default async function Shop({ searchParams }) {
  const { categoryList } = enumArr;

  const getCategoryArr = () => { // supports multi value filter query strings via comma separation. ie ?category=HAP,PEACOCK
    if (!searchParams.category) return categoryList; // if no category, search all categories
    if (typeof searchParams.category === 'string') return searchParams.category.split(',')
    return [] // should not get here
  }

  const species = await prisma.species.findMany({
    orderBy: { created_at: 'desc' },
    where: {

      category: {
        in: getCategoryArr()
      }

      // AND: [
      //   { filters: { some: { category: searchParams?.category }}}
      // ]


      // category: searchParams?.category,
    },
    include: {
      skus: {
        // where: {
        //   size: searchParams?.size,
        // },
        orderBy: { price: 'desc' },
      },
      images: {
        // gets list of all thumbnails. Zeroth is primary
        orderBy: { is_primary: 'desc' },
        where: {
          is_thumbnail: true,
        },
      },
    },
  });
  return (
    <Main>
    {/* <main> */}
      <div className='flex md:flex-row flex-col'>
        <Filter />

        {species.length === 0 ? (
          <div className='container flex'>
            <h1 className='mx-auto mt-5 text-xl'>Sorry No availabilty</h1>
          </div>
        ) : (
          <div className='grid gap-4 p-8 md:grid-cols-2 lg:grid-cols-4'>
            {species.map((specie, i) => (
              <Item
                key={specie.specie_id}
                specie={specie}
                i={i}
                isModalOpen={searchParams.specie === specie.specie_id}
              />
            ))}
          </div>
        )}
      </div>
    </Main>
  );
}
