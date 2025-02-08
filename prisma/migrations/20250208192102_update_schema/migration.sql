-- AlterTable
ALTER TABLE `user` ADD COLUMN `goals` JSON NULL,
    ADD COLUMN `insights` JSON NULL,
    ADD COLUMN `socialMetrics` JSON NULL;
