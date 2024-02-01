import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

// validation input on create Activity
export const ActivityCreateInput = z.object({
  username: z.string().min(1, { message: "required" }),
  profileImage: z.string(),
  postContent: z.string().max(200, { message: "max length 200 characters" }),
  likeCount: z.number().optional()
}) satisfies z.Schema<Prisma.ActivityUncheckedCreateInput>;

export const prisma = new PrismaClient().$extends({
  query: {
    activity: {
      create({ args, query }) {
        args.data = ActivityCreateInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = ActivityCreateInput.partial().parse(args.data);
        return query(args);
      }
    }
  }
});
