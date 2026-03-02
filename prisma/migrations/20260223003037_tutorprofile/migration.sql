-- CreateTable
CREATE TABLE "TutorProfile" (
    "id" TEXT NOT NULL,
    "isGraduated" BOOLEAN NOT NULL DEFAULT true,
    "last_institution" TEXT,
    "exprience" INTEGER NOT NULL,
    "university_name" TEXT,
    "userId" TEXT NOT NULL,
    "price" INTEGER,
    "rating" TEXT,

    CONSTRAINT "TutorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfile_userId_key" ON "TutorProfile"("userId");

-- AddForeignKey
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
