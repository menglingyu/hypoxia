/*
  Warnings:

  - You are about to drop the column `commentsId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN     `text` VARCHAR(191) NOT NULL,
    ADD COLUMN     `userId` INT,
    ADD COLUMN     `toUid` INT,
    ADD COLUMN     `postId` INT;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `commentsId`;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
