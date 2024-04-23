-- CreateEnum
CREATE TYPE "MovimentationType" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('UNITY', 'KG', 'L');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "measurement" "MeasurementType" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentation" (
    "id" SERIAL NOT NULL,
    "type" "MovimentationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "id_employee" INTEGER NOT NULL,

    CONSTRAINT "Movimentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductMovimentation" (
    "id" SERIAL NOT NULL,
    "id_product" INTEGER NOT NULL,
    "id_movimentation" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ProductMovimentation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movimentation" ADD CONSTRAINT "Movimentation_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMovimentation" ADD CONSTRAINT "ProductMovimentation_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMovimentation" ADD CONSTRAINT "ProductMovimentation_id_movimentation_fkey" FOREIGN KEY ("id_movimentation") REFERENCES "Movimentation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
