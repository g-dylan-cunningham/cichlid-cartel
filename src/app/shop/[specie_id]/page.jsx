// 'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/modules/prisma';

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
  return (
    <div className='flex flex-row'>
      <div className='basis-1/2'>
        <div className='carousel w-full'>
          {specie.images.map((image, i) => {
            console.log('image', image);
            console.log('asdfasdf', specie.images.length, i)
            return (
              <div
                key={image.full_image_key}
                id={image.full_image_key}
                className='carousel-item relative w-full'
              >
                <img src={image.full_image_url} className='w-full' />
                <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
                  <a href={"#"+specie.images[i-1]?.full_image_key}
                    className='btn btn-circle'
                    disabled={!i}
                  >
                    ❮
                  </a>
                  <a href={"#"+specie.images[i+1]?.full_image_key} className='btn btn-circle' disabled={specie.images.length-1 !== i+1}>
                    ❯
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {/* <Image
    src={specie.images[0]?.full_image_url}
    height={600}
    width={600}
    className="w-full rounded-md object-contain"
    alt='asdf'
  /> */}
      </div>
      <div className='basis-1/12'>{}</div>
      <div className='basis-5/12'>03</div>
    </div>
  );
};

export default SpecieDetail;
