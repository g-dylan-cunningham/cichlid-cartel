import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/modules/prisma';
import Carousel from '@/app/shop/Carousel';
import SkuList from '@/app/shop/components/SkuList';
import { Main, BackButton } from '@/app/components';

const SpecieDetail = async ({ params: { specie_id } }) => {
  const specie = await prisma.species.findFirst({
    where: {
      specie_id,
    },
    include: {
      skus: {
        orderBy: { created_at: 'desc' },
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


  const slides = specie.images.reduce((accum, cur) => {
    return [...accum, { src: cur.full_image_url }];
  }, []);

  return (
    <Main>
      <BackButton />
    <div className='flex lg:flex-row flex-col justify-between'>
      {/* <div className='basis-1/2'> */}
      <div className='flex justify-center'>
        <Carousel slides={slides} />
      </div>
      <section className='w-full p-10'>
          <h1>{specie.common_name}</h1>
          <h2>{specie.scientific_name}</h2>
          <p>{specie.description}</p>
          <SkuList skus={specie.skus} />
        </section>
    </div>
    </Main>
  );
};

export default SpecieDetail;
