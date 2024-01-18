'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { enumArr, enumMap } from '@/app/config';

const Filter = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { categoryList, sizeList } = enumArr;
  const { categoryMap, sizeMap } = enumMap;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryArr = useMemo(() => {
    return searchParams.get('category')?.split(',') || categoryList; // if no query strings, select all categories
  }, [searchParams, categoryList]);

  const [checked, setChecked] = useState(
    categoryArr.reduce((accum, cur) => {
      accum[cur] = true;
      return accum;
    }, {})
  );

  const handleChecked = (category) => {
    const newChecked = {
      ...checked,
      [category]: !checked[category],
    };
    setChecked(newChecked);
  };

  const handleSubmit = (e, override) => {
    e.preventDefault();
    console.log('override', override, checked);
    const querystring = Object.keys(!!override || checked)
      .filter((cat) => checked[cat])
      .join(',');
    console.log('querystring', !!querystring);
    router.push(pathname + !querystring ? `?category=${querystring}` : '');
  };

  const setAllChecked = (e) => {
    const allChecked = categoryList.reduce((accum, cur) => {
      accum[cur] = true;
      return accum;
    }, {});
    setChecked(allChecked);
    handleSubmit(e, allChecked);
  };

  return (
    <div className='my-6 mx-3'>
      <button type='button' onClick={() => setIsVisible(!isVisible)} className='hidden md:inline-block'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
          />
        </svg>
      </button>

      <div
        style={{
          transition: 'transform .5s,opacity .5s .2s,width .4s',
          willChange: 'transform,opacity,width',
          overflow: 'hidden',
          flex: '0 0 auto',
          opacity: isVisible ? 1 : 0,
          width: isVisible ? '200px' : '0px',
          height: isVisible ? 'auto' : '0px',
          transform: "translate('-20px')"
        }}
      >
        <h5 className='mt-1'>Search Categories:</h5>
        <form onSubmit={handleSubmit}>
          <ul className='ml-2 list-none'>
            {categoryList.map((category) => {
              return (
                <li key={category}>
                  <input
                    type='checkbox'
                    value={categoryMap[category]}
                    checked={!!checked[category]}
                    onChange={() => handleChecked(category)}
                  />
                  <label className='ml-3'>{categoryMap[category]}</label>
                </li>
              );
            })}
          </ul>
          <div className='space-between flex flex-row'>
            <button className='btn btn-primary' type='submit'>
              Search
            </button>
            <button
              className='btn btn-outline btn-secondary ml-1'
              onClick={setAllChecked}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
