/*
  Warnings:

  - You are about to drop the column `x_interpolation` on the `interpolation` table. All the data in the column will be lost.
  - Added the required column `answer` to the `interpolation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xToFind` to the `interpolation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `interpolation` DROP COLUMN `x_interpolation`,
    ADD COLUMN `answer` DOUBLE NOT NULL,
    ADD COLUMN `xToFind` DOUBLE NOT NULL;
