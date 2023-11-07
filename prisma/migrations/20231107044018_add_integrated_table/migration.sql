-- CreateTable
CREATE TABLE `integrated` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `equation` VARCHAR(191) NOT NULL,
    `x_start` DOUBLE NOT NULL,
    `x_end` DOUBLE NOT NULL,
    `n` INTEGER NOT NULL,
    `calAnswer` DOUBLE NOT NULL,
    `realAnswer` DOUBLE NOT NULL,
    `error` DOUBLE NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
