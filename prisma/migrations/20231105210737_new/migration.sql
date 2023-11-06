-- CreateTable
CREATE TABLE `interpolation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `numberOfPoint` INTEGER NOT NULL,
    `x` JSON NOT NULL,
    `y` JSON NOT NULL,
    `x_interpolation` DOUBLE NOT NULL,
    `graph` JSON NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
