/*
  Warnings:

  - You are about to drop the column `iteration` on the `root_of_equation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `root_of_equation` DROP COLUMN `iteration`,
    ADD COLUMN `openMethod` BOOLEAN NOT NULL DEFAULT false;
