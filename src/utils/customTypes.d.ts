import type { Category } from "@prisma/client";

export type Month = {
  name: string;
  num: number;
  numDays: number;
};

export type ChartData = {
  date: Date;
  expense: number;
  income: number;
};

export type CategoryWithState = {
  category: Category;
  isActive: boolean;
};
