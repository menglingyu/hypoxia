/*
  Warnings:

  - Made the column `content` on table `Post` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `title` VARCHAR(191);
