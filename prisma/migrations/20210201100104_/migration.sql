/*
  Warnings:

  - Added the required column `uuid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN     `uuid` VARCHAR(191) NOT NULL,
    ADD COLUMN     `avatarUrl` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Circle` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `picUrl` VARCHAR(191) NOT NULL,
    `memberCount` INT NOT NULL,
    `userId` INT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Circle` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
