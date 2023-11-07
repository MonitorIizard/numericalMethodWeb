-- CreateTable
CREATE TABLE `regression` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `numberOfPoint` INTEGER NOT NULL,
    `x` JSON NOT NULL,
    `y` JSON NOT NULL,
    `xToFind` JSON NOT NULL,
    `answer` DOUBLE NOT NULL,
    `graph` JSON NULL,
    `morder` INTEGER NOT NULL DEFAULT 1,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
