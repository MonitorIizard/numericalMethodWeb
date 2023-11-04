-- CreateTable
CREATE TABLE `root_of_equation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equation` VARCHAR(191) NOT NULL,
    `answer` DOUBLE NOT NULL,
    `graph` JSON NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `iteration` BOOLEAN NOT NULL DEFAULT false,
    `x_start` JSON NOT NULL,
    `x_end` DOUBLE NOT NULL DEFAULT 0,
    `tolerance` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
