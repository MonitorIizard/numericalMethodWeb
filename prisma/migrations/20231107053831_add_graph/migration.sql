/*
  Warnings:

  - Added the required column `graph` to the `integrated` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `integrated` ADD COLUMN `graph` JSON NOT NULL;
