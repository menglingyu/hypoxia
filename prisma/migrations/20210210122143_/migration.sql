/*
  Warnings:

  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Made the column `published` on table `Post` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Post` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `published` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `uuid`,
    DROP COLUMN `avatarUrl`,
    DROP COLUMN `password`;
