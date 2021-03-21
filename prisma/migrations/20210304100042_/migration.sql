/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[commentId]` on the table `Interact`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Interact.commentId_unique` ON `Interact`(`commentId`);
