/*
  Warnings:

  - You are about to drop the `goal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `insights` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `signup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `social` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `socialmetrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `goal` DROP FOREIGN KEY `Goal_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `insights` DROP FOREIGN KEY `Insights_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `social` DROP FOREIGN KEY `Social_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `socialmetrics` DROP FOREIGN KEY `SocialMetrics_user_id_fkey`;

-- DropTable
DROP TABLE `goal`;

-- DropTable
DROP TABLE `insights`;

-- DropTable
DROP TABLE `signup`;

-- DropTable
DROP TABLE `social`;

-- DropTable
DROP TABLE `socialmetrics`;
