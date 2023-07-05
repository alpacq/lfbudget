import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const transactionsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),

  getByUser: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const transactions = await opts.ctx.prisma.transaction.findMany({
      where: { userId: input },
    });

    return transactions;
  }),
});
