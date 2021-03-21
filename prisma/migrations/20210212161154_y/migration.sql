/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[postId]` on the table `Interact`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Interact.postId_unique` ON `Interact`(`postId`);
