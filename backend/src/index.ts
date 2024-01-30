import express from "express";
import cors from "cors";
import { setTimeout } from "timers/promises";
import { Prisma } from "@prisma/client";

import { prisma } from "./validator";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/activity", async (req, res) => {
  const { user, offset, limit } = req.query;

  const userQuery = user
    ? {
        username: {
          equals: user as string,
          mode: "insensitive"
        }
      }
    : {};

  const skip = offset ? Number(offset) : 0;
  const take = limit ? Number(limit) : 50;

  const activities = await prisma.activity.findMany({
    where: userQuery as Prisma.ActivityWhereInput,
    skip: skip,
    take: take,
    orderBy: { timeStamp: "desc" } // show latest activity by default
  });

  await setTimeout(1000); // the api on local is too fast, so I have to slow it down

  res.json(activities);
});

app.post(`/activity`, async (req, res) => {
  const { username, profileImage, postContent } = req.body;

  try {
    const result = await prisma.activity.create({
      data: {
        username,
        profileImage,
        postContent
      }
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default app;

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
