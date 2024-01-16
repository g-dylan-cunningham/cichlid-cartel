-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "zip" INTEGER,
    "email" TEXT,
    "state" TEXT,
    "street1" TEXT,
    "street2" TEXT,
    "city" TEXT,
    "country" TEXT,
    "is_seller" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);
