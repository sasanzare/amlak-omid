-- CreateEnum
CREATE TYPE "requestStatus" AS ENUM ('accepted', 'pending', 'denied');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'agencyOwner', 'agencyAgent', 'normal');

-- CreateEnum
CREATE TYPE "assignmentType" AS ENUM ('rental', 'forSale', 'fastSale');

-- CreateEnum
CREATE TYPE "propertyType" AS ENUM ('commercial', 'apartment', 'villaGarden', 'land', 'independents');

-- CreateTable
CREATE TABLE "tempUser" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,

    CONSTRAINT "tempUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "name" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "nationalCode" INTEGER,
    "address" TEXT,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agencyRatingInterface" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "agencyId" TEXT,
    "rate" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agencyRatingInterface_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agentInterface" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "agentInterface_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agency" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "status" "requestStatus" NOT NULL DEFAULT 'pending',
    "cityAreaId" TEXT NOT NULL,

    CONSTRAINT "agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cityArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cityArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realEstate" (
    "id" TEXT NOT NULL,
    "agencyId" TEXT,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "roomCount" INTEGER NOT NULL,
    "Photos" TEXT[],
    "assignmentType" "assignmentType" NOT NULL,
    "type" "propertyType" NOT NULL,
    "price" BIGINT NOT NULL,
    "areaName" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "cityAreaId" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "realEstate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "text" TEXT NOT NULL,
    "normalName" TEXT,
    "articleImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contactFrom" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contactFrom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tempUser_id_key" ON "tempUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tempUser_phoneNumber_key" ON "tempUser"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "agencyRatingInterface_id_key" ON "agencyRatingInterface"("id");

-- CreateIndex
CREATE UNIQUE INDEX "agentInterface_id_key" ON "agentInterface"("id");

-- CreateIndex
CREATE UNIQUE INDEX "agency_id_key" ON "agency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "city_id_key" ON "city"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cityArea_id_key" ON "cityArea"("id");

-- CreateIndex
CREATE UNIQUE INDEX "realEstate_id_key" ON "realEstate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "article_id_key" ON "article"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contactFrom_id_key" ON "contactFrom"("id");

-- AddForeignKey
ALTER TABLE "agencyRatingInterface" ADD CONSTRAINT "agencyRatingInterface_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agencyRatingInterface" ADD CONSTRAINT "agencyRatingInterface_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agentInterface" ADD CONSTRAINT "agentInterface_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agentInterface" ADD CONSTRAINT "agentInterface_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency" ADD CONSTRAINT "agency_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency" ADD CONSTRAINT "agency_cityAreaId_fkey" FOREIGN KEY ("cityAreaId") REFERENCES "cityArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cityArea" ADD CONSTRAINT "cityArea_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realEstate" ADD CONSTRAINT "realEstate_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realEstate" ADD CONSTRAINT "realEstate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realEstate" ADD CONSTRAINT "realEstate_cityAreaId_fkey" FOREIGN KEY ("cityAreaId") REFERENCES "cityArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
