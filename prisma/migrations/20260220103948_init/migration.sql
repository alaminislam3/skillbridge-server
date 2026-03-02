/*
  Warnings:

  - The values [PETOWNER,SITTER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,SUSPENDED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('STUDENT', 'TUTOR', 'ADMIN');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('BAN', 'UNBAN');
ALTER TABLE "public"."users" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'UNBAN';
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'UNBAN';
