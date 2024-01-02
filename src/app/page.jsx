import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/modules/prisma';

export default async function Home({ searchParams }) {
  
  return (
    <main className='flex min-h-screen flex-row flex-wrap content-around items-center justify-evenly overflow-auto p-24'>
      Home - info page (need a few images)
    </main>
  );
}
