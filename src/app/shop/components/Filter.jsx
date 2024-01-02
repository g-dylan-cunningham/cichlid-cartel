'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { enumArr, enumMap } from '@/app/config';

const Filter = () => {
  const { categoryList, sizeList } = enumArr;
  const { categoryMap, sizeMap } = enumMap;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryArr = useMemo(() => {
    return searchParams.get('category')?.split(',') || categoryList; // if no query strings, select all categories
  }, [searchParams]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const querystring = Object.keys(checked)
      .filter((cat) => checked[cat])
      .join(',');
    router.push(pathname + `?category=${querystring}`);
  };

  return (
    <div>
      <h5>Filter by Category:</h5>
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
                <label>{categoryMap[category]}</label>
              </li>
            );
          })}
        </ul>
        <button className='btn btn-primary' type='submit'>
          apply
        </button>
      </form>
    </div>
  );
};

export default Filter;
