import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TransactionType } from ".prisma/client";

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

  create: protectedProcedure
    .input(
      z.object({
        categoryId: z.string(),
        isReturnable: z.boolean(),
        amount: z.number(),
        description: z.string(),
        transactionType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const transaction = await ctx.prisma.transaction.create({
        data: {
          userId,
          categoryId: input.categoryId,
          isReturnable: input.isReturnable,
          amount: input.amount,
          description: input.description,
          type:
            input.transactionType === "Expense"
              ? TransactionType.EXPENSE
              : TransactionType.INCOME,
        },
      });

      return transaction;
    }),
});
