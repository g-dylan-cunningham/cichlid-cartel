import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};
const prisma = globalThis.prisma ?? prismaClientSingleton();
/*
 `??` is the `nullish coalescing operator`
 It evaluates like this:
  - is value left of ?? null or undefined
    - if so, return value on right
    - if not, return value on left
*/

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
