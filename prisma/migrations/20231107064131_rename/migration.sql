/*
  Warnings:

  - You are about to drop the column `Accuracy` on the `derivative` table. All the data in the column will be lost.
  - Added the required column `accuracy` to the `derivative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `derivative` DROP COLUMN `Accuracy`,
    ADD COLUMN `accuracy` VARCHAR(191) NOT NULL;
