import React from 'react';
import Link from 'next/link'
import prisma from '@/modules/prisma';
import SkuList from '@/app/admin/components/SkuList';
// renders all skus for a species


const Skus = async ({ params: { specie_id }}) => {
    const specie = await prisma.species.findUnique({
    where: {
      specie_id,
    },
    include: { skus: true }
  });
  return (
    <main className='flex min-h-screen flex-col md:items-center'>
    <Link href={`/admin`} className='link link-primary'>
      Dashboard
    </Link>

    <SkuList specie={specie} isDeleteEnabled={true}>
    <Link // link is additonal button at bottom of page
        className='btn btn-outline btn-secondary btn-wide'
        href={`/admin/species/${specie.specie_id}`}
      >
        Species Details
      </Link>
    </SkuList>
    </main>
  )
}

export default Skus