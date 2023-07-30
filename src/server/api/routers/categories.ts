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

  create: protectedProcedure
    .input(
      z.object({
        isSavings: z.boolean(),
        limit: z.number(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const category = await ctx.prisma.category.create({
        data: {
          userId,
          isSavings: input.isSavings,
          limit: input.limit,
          name: input.name,
        },
      });

      return category;
    }),
});

// limit: Prisma.Decimal