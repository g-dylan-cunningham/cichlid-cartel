import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/modules/prisma';
import CircleButton from '@/app/components/CircleButton';

export default async function Home({ searchParams }) {
  return (
    <main className='relative flex min-h-screen flex-col items-center justify-between'>
      <section
        style={{
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage: 'url(/saphire.jpg)',
        }}
        className='flex w-full flex-row justify-center p-5'
      >
        <div className='flex h-full flex-col justify-center'>
          <h1 className='text-center text-5xl text-white sm:text-7xl md:text-9xl'>
            Cichlid Cartel of AZ
          </h1>
        </div>
      </section>
      <div className='absolute bottom-0'>
        <nav className='space-between flex flex-row'>
          <div className='space-between flex w-full flex-row'>
            <CircleButton href='/shop?category=PEACOCK' label='PEACOCKS'>
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
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
            </CircleButton>
            <CircleButton href='/shop?category=HAP' label='HAPS'>
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
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>

          
              
              
            </CircleButton>
          </div>

          {/* <Link href="/fish?category=PEACOCK">Peacocks</Link> */}
        </nav>
      </div>
    </main>
  );
}
