import type { Category } from "@prisma/client";

export type Month = {
  name: string;
  num: number;
  numDays: number;
};

export type ChartData = {
  date: string;
  expense: number;
  income: number;
};

export type CategoryWithState = {
  category: Category;
  isActive: boolean;
};
