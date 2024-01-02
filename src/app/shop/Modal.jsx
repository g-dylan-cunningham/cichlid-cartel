'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Carousel from './Carousel';
import SkuList from './components/SkuList';

const Modal = ({ specie }) => {
  const slides = useMemo(
    () =>
      specie.images.reduce((accum, cur) => {
        return [...accum, { src: cur.full_image_url }];
      }, []),
    [specie]
  );

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
      <div className='relative mx-auto my-6 h-screen w-screen p-2 md:p-10'>
        <div className='relative flex w-full flex-col rounded-lg border border-solid border-black bg-white p-3 shadow-lg md:flex-row'>
          <div className='absolute right-4 top-1'>
            {/* close modal icon */}

            <Link href='/shop' style={{ fontSize: '20px' }}>
              x
            </Link>
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='h-6 w-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
          <XMarkIcon className='h-6 w-6 text-blue-500' />
          <Carousel slides={slides} />
          <section className='w-full p-10'>
            <h1>{specie.common_name}</h1>
            <h2>{specie.scientific_name}</h2>
            <p>{specie.description}</p>
            <SkuList skus={specie.skus} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Modal;
