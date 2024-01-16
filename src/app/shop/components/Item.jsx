'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { getMinSkuPrice } from '@/app/utils';
import Modal from '../Modal';

const Item = ({ specie, isModalOpen }) => {
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9
  const containerClass = `${styles.itemImage} p-4 flex flex-col justify-between bg-slate-200`;
  const labelClass = '';

  return (
    <div key={specie.specie_id} className={containerClass}>
      <Link
        href={`/shop/specie/${specie.specie_id}`}
        className='flex w-full justify-center'
      >
        <Image
          src={specie.images[0]?.full_image_url}
          height={350 / ratio}
          width={350}
          // layout={'fixed'}
          // objectFit={'contain'}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
          alt='fish profile pic'
          style={specie.skus.length === 0 ? { opacity: "0.4"} : {}}
        />
      </Link>
      <div className='mt-2'>
        <div className={labelClass}>specie: {specie.common_name}</div>
        <div>{specie.skus.length > 0 ? `From: ${getMinSkuPrice(specie.skus)}` : <div>Out of Stock</div>}</div>
      </div>
      {isModalOpen && <Modal specie={specie} />}
    </div>
  );
};

export default Item;
