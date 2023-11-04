/*
  Warnings:

  - You are about to drop the column `openMethod` on the `root_of_equation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `root_of_equation` DROP COLUMN `openMethod`,
    ADD COLUMN `isOpenMethod` BOOLEAN NOT NULL DEFAULT false;
