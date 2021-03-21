/*
  Warnings:

  - You are about to drop the column `valueCount` on the `Interact` table. All the data in the column will be lost.
  - You are about to drop the column `interestCount` on the `Interact` table. All the data in the column will be lost.
  - You are about to drop the column `hateCount` on the `Interact` table. All the data in the column will be lost.
  - You are about to drop the column `thinkCount` on the `Interact` table. All the data in the column will be lost.
  - You are about to drop the column `handCount` on the `Interact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Interact` DROP COLUMN `valueCount`,
    DROP COLUMN `interestCount`,
    DROP COLUMN `hateCount`,
    DROP COLUMN `thinkCount`,
    DROP COLUMN `handCount`,
    ADD COLUMN     `valueUid` VARCHAR(191),
    ADD COLUMN     `interestUid` VARCHAR(191),
    ADD COLUMN     `hateUid` VARCHAR(191),
    ADD COLUMN     `thinkUid` VARCHAR(191),
    ADD COLUMN     `handUid` VARCHAR(191);
