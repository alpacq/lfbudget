import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),

  getByUser: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const categories = await opts.ctx.prisma.category.findMany({
      where: { userId: input },
    });

    return categories;
  }),
});
