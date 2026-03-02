/*
  Warnings:

  - You are about to drop the column `sessionDate` on the `booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "sessionDate",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "totalPrice" INTEGER,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "bookingId" TEXT NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tutorProfile" ADD COLUMN     "image" TEXT,
ALTER COLUMN "isFeatured" DROP NOT NULL,
ALTER COLUMN "isFeatured" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "review_bookingId_key" ON "review"("bookingId");

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
