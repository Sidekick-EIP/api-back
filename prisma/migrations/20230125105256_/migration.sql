-- AlterTable
ALTER TABLE "meals" ALTER COLUMN "period" SET DEFAULT 'dinner';

-- AlterTable
ALTER TABLE "users_data" ALTER COLUMN "birthDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "username" SET DEFAULT '';
