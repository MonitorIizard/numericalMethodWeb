-- CreateTable
CREATE TABLE `derivative` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `equation` VARCHAR(191) NOT NULL,
    `x_to_find` DOUBLE NOT NULL,
    `step_size` DOUBLE NOT NULL,
    `derivativeOrder` INTEGER NOT NULL,
    `direction` VARCHAR(191) NOT NULL,
    `Accuracy` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
