/*
  Warnings:

  - You are about to drop the column `step_size` on the `derivative` table. All the data in the column will be lost.
  - You are about to drop the column `x_to_find` on the `derivative` table. All the data in the column will be lost.
  - Added the required column `stepSize` to the `derivative` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xToFind` to the `derivative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `derivative` DROP COLUMN `step_size`,
    DROP COLUMN `x_to_find`,
    ADD COLUMN `stepSize` DOUBLE NOT NULL,
    ADD COLUMN `xToFind` DOUBLE NOT NULL;
