'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AdminLink from './AdminLink';
import { enumArr, enumMap } from '@/app/config';

const NavBar = ({}) => {
  const [isFishExpanded, setIsFishExpanded] = useState(false);
  const { categoryList } = enumArr;
  const { categoryMap } = enumMap;
  // console.log(categoryMap, categoryList);
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
          >
            <AdminLink />
            <li>
              <Link href='/'>Fish</Link>
              {/* <ul className='p-2'>
                <li key={0}>
                  <Link href={`/shop`}>All</Link>
                </li>
                {categoryList.map((category) => (
                  <li key={category}>
                    <Link href={`/shop?category=${category}`}>
                      {categoryMap[category]}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </li>
            <li>
              <Link href='/'>Ordering</Link>
            </li>
            <li>
              <Link href='/'>About</Link>
            </li>
          </ul>
        </div>
        {/* <Link href='/' className='btn btn-ghost text-xl'>
          Cichlid Cartel
        </Link> */}
      </div>

      {/* NON MOBILE */}
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <AdminLink />
          <li>
          <Link href='/shop'>Fish</Link>
            {/* <details
              open={isFishExpanded}
              onClick={() => {
                console.log('toggle', isFishExpanded);
                setIsFishExpanded(!isFishExpanded);
                console.log('toggle2', isFishExpanded);
              }}
              className='z-10'
            > */}
              {/* <summary>Fish</summary> */}
              {/* <ul className='p-2'>
                <li key={0}>
                  <Link href={`/shop`}>All</Link>
                </li>
                {categoryList.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/shop?category=${category}`}
                      onClick={() => {
                        console.log('clicked', isFishExpanded);
                        setIsFishExpanded(false);
                        console.log('clicked2', isFishExpanded);
                      }}
                    >
                      {categoryMap[category]}
                    </Link>
                  </li>
                ))}
              </ul> */}
            {/* </details> */}
          </li>
          <li>
            <Link href='/'>Item 1</Link>
          </li>

          <li>
            <Link href='/'>Item 3</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        {/* <Link href='/' className='btn'>
          Button
        </Link> */}
      </div>
    </div>
  );
};

export default NavBar;
