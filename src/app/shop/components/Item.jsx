'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css'
import { getMinSkuPrice } from '@/app/utils';
import Modal from '../Modal';

const Item = ({ specie, isModalOpen }) => {
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9
  const containerClass = `${styles.itemImage} p-4 flex flex-col justify-between bg-slate-200`;
  const imageClass = 'max-h-36 rounded-md';
  const labelClass = '';

  return (
    <div
      key={specie.specie_id}
      className={containerClass}
    >
      <Link href={`/shop/specie/${specie.specie_id}`} className='w-full flex justify-center'>
        <Image
          
          src={specie.images[0]?.full_image_url}
          height={350 / ratio}
          width={350}
          // layout={'fixed'}
          // objectFit={'contain'}
          // className={imageClass}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
          // className='z-0'
          alt='asdf'
        />
      </Link>
      <div className="mt-2">
        <div className={labelClass}>specie: {specie.common_name}</div>
        <div>From: ${getMinSkuPrice(specie.skus)}</div>
      </div>
      {isModalOpen && <Modal specie={specie} />}
    </div>
  );
};

export default Item;
