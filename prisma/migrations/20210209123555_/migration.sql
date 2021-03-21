-- AlterTable
ALTER TABLE `Post` MODIFY `published` BOOLEAN DEFAULT false,
    MODIFY `title` VARCHAR(191);

-- CreateTable
CREATE TABLE `article_comment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `tid` INT DEFAULT 0,
    `authorid` INT DEFAULT 0,
    `author` VARCHAR(191),
    `content` VARCHAR(191),
    `yesapi_whatsns_article_comment_time` INT DEFAULT 0,
    `aid` INT,
    `state` INT DEFAULT 1,
INDEX `state`(`state`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `toId` INT NOT NULL DEFAULT 0,
    `userId` INT NOT NULL,
    `momentId` INT NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` VARCHAR(191) NOT NULL,
INDEX `momentId`(`momentId`),
INDEX `toId`(`toId`),
INDEX `userId`(`userId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `question_content` VARCHAR(191) NOT NULL,
    `question_detail` VARCHAR(191) NOT NULL,
    `published_uid` INT NOT NULL,
    `answer_count` INT NOT NULL DEFAULT 0,
    `answer_users` INT NOT NULL DEFAULT 0,
    `view_count` INT NOT NULL DEFAULT 0,
    `focus_count` INT NOT NULL DEFAULT 0,
    `comment_count` INT NOT NULL DEFAULT 0,
    `category_id` INT NOT NULL DEFAULT 0,
    `agree_count` INT NOT NULL DEFAULT 0,
    `against_count` INT NOT NULL DEFAULT 0,
    `yesapi_question_lock` BOOLEAN NOT NULL DEFAULT false,
    `anonymous` BOOLEAN NOT NULL DEFAULT false,
    `thanks_count` INT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `topic` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `topic_title` VARCHAR(191),
    `discuss_count` INT DEFAULT 0,
    `topic_description` VARCHAR(191),
    `topic_pic` VARCHAR(191),
    `topic_lock` INT DEFAULT 0,
    `focus_count` INT DEFAULT 0,
    `seo_title` VARCHAR(191),
    `parent_id` INT DEFAULT 0,
    `is_parent` BOOLEAN DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
