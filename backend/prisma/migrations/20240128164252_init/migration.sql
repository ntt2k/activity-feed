-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "profileImage" TEXT,
    "postContent" TEXT,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
