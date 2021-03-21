/*
  Warnings:

  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `post_ibfk_3`;

-- DropTable
DROP TABLE `comment`;
