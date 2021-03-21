/*
  Warnings:

  - You are about to drop the column `commentId` on the `Interact` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[commentId]` on the table `Interact`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX `Interact.commentId_unique` ON `Interact`;

-- AlterTable
ALTER TABLE `Interact` DROP COLUMN `commentId`,
    ADD COLUMN     `commentId` INT;

-- CreateIndex
CREATE UNIQUE INDEX `Interact.commentId_unique` ON `Interact`(`commentId`);
