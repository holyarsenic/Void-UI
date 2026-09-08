/*
  Warnings:

  - The values [ollama,openai] on the enum `AIProvider` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AIProvider_new" AS ENUM ('gemini');
ALTER TABLE "public"."Generation" ALTER COLUMN "provider" DROP DEFAULT;
ALTER TABLE "Generation" ALTER COLUMN "provider" TYPE "AIProvider_new" USING ("provider"::text::"AIProvider_new");
ALTER TYPE "AIProvider" RENAME TO "AIProvider_old";
ALTER TYPE "AIProvider_new" RENAME TO "AIProvider";
DROP TYPE "public"."AIProvider_old";
ALTER TABLE "Generation" ALTER COLUMN "provider" SET DEFAULT 'gemini';
COMMIT;

-- AlterTable
ALTER TABLE "Generation" ALTER COLUMN "provider" SET DEFAULT 'gemini';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "razorpayCustomerId" TEXT,
ADD COLUMN     "razorpaySubscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" TEXT;
