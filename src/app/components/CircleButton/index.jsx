import React from 'react';
import styles from './style.module.css';
import Link from 'next/link'

const CircleButton = ({href = "/", children, label}) => {
  // console.log('styles', styles);
  return (
    <div className='mx-5'>
      <div className={`${styles.buttonWrap}`}>
        <Link href={href} className={styles.circle}>
          <div className='flex flex-row justify-center h-full'>
          <div className='flex flex-col justify-center h-full'>
            <div className='flex flex-row justify-center active:animate-spin'>{children}</div>
            <label>{label}</label>
          </div>
          </div>
        </Link>
        <div className={styles.outerCircle}></div>
      </div>
      
    </div>
  );
};

export default CircleButton;
