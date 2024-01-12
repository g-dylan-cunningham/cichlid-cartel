export const dynamic = 'force-dynamic';
export const revalidate = true;
export const fetchCache = 'force-no-store';

import React from 'react';
import Link from 'next/link'
import prisma from '@/modules/prisma';
import SkuList from '@/app/admin/components/SkuList';
import { BackButton, Main } from '@/app/components'
// renders all skus for a species

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
    <Main>
      <BackButton />
      {/* <Link href={`/admin`} className='link link-primary'>
        Dashboard
      </Link> */}

      <SkuList specie={specie} isDeleteEnabled={true}>
        <Link // link is additonal button at bottom of page
          className='btn btn-outline btn-secondary btn-wide mt-2'
          href={`/admin/species/${specie.specie_id}`}
        >
          Species Details
        </Link>
      </SkuList>
    </Main>
  );
};

export default Skus;
