-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "passwordHash" TEXT,
    "hashedRefreshToken" TEXT,
    "authProvider" TEXT NOT NULL DEFAULT 'LOCAL',
    "accountStatus" TEXT NOT NULL DEFAULT 'ACTIVE',
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentRegistration" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "currentYear" TEXT NOT NULL,
    "graduationYear" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "guidanceAreas" TEXT NOT NULL,
    "helpMessage" TEXT NOT NULL,
    "linkedIn" TEXT,
    "github" TEXT,
    "resumeFileName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "type" TEXT NOT NULL DEFAULT 'STUDENT_PLACEMENT_GUIDANCE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_accountStatus_idx" ON "User"("email", "accountStatus");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "StudentRegistration_email_idx" ON "StudentRegistration"("email");
