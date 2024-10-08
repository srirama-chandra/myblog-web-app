/*
  Warnings:

  - You are about to drop the column `date` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "date",
ADD COLUMN     "publishedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
