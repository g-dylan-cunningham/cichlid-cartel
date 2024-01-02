import React from 'react';
import Link from 'next/link'
import prisma from '@/modules/prisma';
import SkuList from '@/app/admin/components/SkuList';
// renders all skus for a species

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = 'force-dynamic';
export const revalidate = true;
export const fetchCache = 'force-no-store';

const Skus = async ({ params: { specie_id } }) => {
  const specie = await prisma.species.findUnique({
    where: {
      specie_id,
    },
    include: {
      skus: {
        orderBy: { created_at: 'desc' },
      },
    }
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
  );
};

export default Skus;
