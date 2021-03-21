-- AlterTable
ALTER TABLE `Post` ADD COLUMN     `interactId` INT;

-- CreateTable
CREATE TABLE `Interact` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `postId` INT,
    `valueCount` INT,
    `interestCount` INT,
    `hateCount` INT,
    `thinkCount` INT,
    `handCount` INT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`interactId`) REFERENCES `Interact`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
