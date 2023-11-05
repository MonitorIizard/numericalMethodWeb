-- CreateTable
CREATE TABLE `linear_algebra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dimension` INTEGER NOT NULL,
    `matrixA` JSON NOT NULL,
    `matrixB` JSON NOT NULL,
    `matrixX` JSON NOT NULL,
    `error_criteria` DOUBLE NULL,
    `result` JSON NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
