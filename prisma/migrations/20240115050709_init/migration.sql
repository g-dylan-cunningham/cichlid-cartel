-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PEACOCK', 'HAP', 'TANGANYIKA', 'OTHER');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'VARIETY');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'UNSEXED', 'BREEDINGGROUP');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('MALAWI', 'VICTORIA', 'TANGANYIKA', 'NEW_WORLD', 'OTHER');

-- CreateEnum
CREATE TYPE "Subgroup" AS ENUM ('OTHER');

-- CreateTable
CREATE TABLE "species" (
    "specie_id" TEXT NOT NULL,
    "region" "Region" NOT NULL DEFAULT 'OTHER',
    "subgroup" "Subgroup" NOT NULL DEFAULT 'OTHER',
    "category" "Category" NOT NULL DEFAULT 'OTHER',
    "common_name" TEXT NOT NULL,
    "scientific_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("specie_id")
);

-- CreateTable
CREATE TABLE "skus" (
    "sku_id" TEXT NOT NULL,
    "specie_id" TEXT NOT NULL,
    "size" "Size" NOT NULL DEFAULT 'M',
    "price" TEXT NOT NULL,
    "sex" "Sex" NOT NULL DEFAULT 'UNSEXED',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "is_available" BOOLEAN NOT NULL DEFAULT false,
    "is_oos" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skus_pkey" PRIMARY KEY ("sku_id")
);

-- CreateTable
CREATE TABLE "images" (
    "image_id" TEXT NOT NULL,
    "specie_id" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "is_secondary" BOOLEAN NOT NULL DEFAULT false,
    "is_thumbnail" BOOLEAN NOT NULL DEFAULT false,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "full_image_url" TEXT,
    "full_image_key" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("image_id")
);

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_specie_id_fkey" FOREIGN KEY ("specie_id") REFERENCES "species"("specie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_specie_id_fkey" FOREIGN KEY ("specie_id") REFERENCES "species"("specie_id") ON DELETE RESTRICT ON UPDATE CASCADE;
