/*
  Warnings:

  - Added the required column `calAnswer` to the `derivative` table without a default value. This is not possible if the table is not empty.
  - Added the required column `derivativeEquation` to the `derivative` table without a default value. This is not possible if the table is not empty.
  - Added the required column `error` to the `derivative` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realAnswer` to the `derivative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `derivative` ADD COLUMN `calAnswer` DOUBLE NOT NULL,
    ADD COLUMN `derivativeEquation` VARCHAR(191) NOT NULL,
    ADD COLUMN `error` DOUBLE NOT NULL,
    ADD COLUMN `realAnswer` DOUBLE NOT NULL;
