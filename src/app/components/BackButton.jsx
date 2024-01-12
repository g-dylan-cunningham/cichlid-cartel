'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const BackButton = ({ href = '', children }) => {
  const router = useRouter();
  return (
    <div style={{ top: '0vh', left: '5vw', position: 'absolute' }}>
      <button
        onClick={() => {
          href
            ? router.push(href)
            : router.back()
        }}
        className='relative z-50 m-1 rounded-full border-4 border-blue-600 bg-white p-1 hover:border-blue-300'
      >
        {children ? (
          children
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-12 w-12'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default BackButton;
