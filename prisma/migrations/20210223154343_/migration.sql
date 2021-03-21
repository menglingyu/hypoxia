/*
  Warnings:

  - You are about to drop the column `momentId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the `article_comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `momentId` ON `comment`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_ibfk_1`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `momentId`,
    DROP COLUMN `date`,
    DROP COLUMN `content`;

-- DropTable
DROP TABLE `article_comment`;
