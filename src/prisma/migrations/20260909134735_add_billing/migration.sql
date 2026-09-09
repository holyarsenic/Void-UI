/*
  Warnings:

  - You are about to drop the column `razorpayCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `razorpaySubscriptionId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "razorpayCustomerId",
DROP COLUMN "razorpaySubscriptionId",
ADD COLUMN     "CustomerId" TEXT,
ADD COLUMN     "SubscriptionId" TEXT;
