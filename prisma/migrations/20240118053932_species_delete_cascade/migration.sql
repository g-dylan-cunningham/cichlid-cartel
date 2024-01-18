/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `zip` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_specie_id_fkey";

-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_specie_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ALTER COLUMN "zip" SET NOT NULL,
ALTER COLUMN "zip" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_specie_id_fkey" FOREIGN KEY ("specie_id") REFERENCES "species"("specie_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_specie_id_fkey" FOREIGN KEY ("specie_id") REFERENCES "species"("specie_id") ON DELETE CASCADE ON UPDATE CASCADE;
