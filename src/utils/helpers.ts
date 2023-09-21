import type { Transaction } from "@prisma/client";
import type { CategoryWithState, Month } from "~/utils/customTypes";
import type { TransactionType } from ".prisma/client";
import type { ChartData } from "~/utils/customTypes";
import { months } from "~/utils/collections";

export const filterTransactionsByActiveCategory = (
  categories: CategoryWithState[],
  transactions: Transaction[],
  year: number,
  month: Month | undefined,
  isYear?: boolean
): Transaction[] => {
  return categories.some((c) => c.isActive)
    ? transactions.filter(
        (t) =>
          categories.find((c) => c.category.id === t.categoryId)?.isActive &&
          (isYear
            ? t.date.getFullYear() === year
            : t.date.getMonth() + 1 === month?.num &&
              t.date.getFullYear() === year)
      )
    : transactions.filter((t) =>
        isYear
          ? t.date.getFullYear() === year
          : t.date.getMonth() + 1 === month?.num &&
            t.date.getFullYear() === year
      );
};

export const sumTransactionsByCategory = (
  category: CategoryWithState,
  transactions: Transaction[],
  year: number,
  month: Month | undefined
): number => {
  return transactions
    .filter(
      (t) =>
        t.categoryId === category.category.id &&
        t.date.getFullYear() === year &&
        t.date.getMonth() + 1 === month?.num
    )
    .reduce((a, t) => (a = a + Number(t.amount)), 0);
};

export const sumTransactionsBySavings = (
  categories: CategoryWithState[],
  transactions: Transaction[],
  year: number,
  month: Month | undefined,
  isSavings: boolean
): number => {
  return transactions
    .filter(
      (t) =>
        categories.find((c) => c.category.id === t.categoryId)?.category
          .isSavings === isSavings &&
        t.date.getFullYear() === year &&
        t.date.getMonth() + 1 === month?.num
    )
    .reduce((a, t) => (a = a + Number(t.amount)), 0);
};

export const filterTransactionsByType = (
  transactions: Transaction[],
  transactionType: TransactionType
): Transaction[] => {
  return transactions.filter((t) => t.type === transactionType);
};

export const prepareChartDataDaily = (
  categories: CategoryWithState[],
  transactions: Transaction[],
  year: number,
  month: Month | undefined,
  isCumulative: boolean
) => {
  const data: ChartData[] = [];
  const preFiltered = filterTransactionsByActiveCategory(
    categories,
    transactions,
    year,
    month,
    false
  );
  if (month !== undefined) {
    for (let i = 1; i <= month.numDays; i++) {
      const date: Date = new Date(year, month.num - 1, i);
      const newChartData: ChartData = {
        date: i.toString(),
        expense: filterTransactionsByType(preFiltered, "EXPENSE").reduce(
          (a, t) =>
            isCumulative
              ? t.date.getDate() <= date.getDate()
                ? (a += Number(t.amount))
                : a
              : t.date.getDate() === date.getDate()
              ? (a += Number(t.amount))
              : a,
          0
        ),
        income: filterTransactionsByType(preFiltered, "INCOME").reduce(
          (a, t) =>
            isCumulative
              ? t.date.getDate() <= date.getDate()
                ? (a += Number(t.amount))
                : a
              : t.date.getDate() === date.getDate()
              ? (a += Number(t.amount))
              : a,
          0
        ),
      };
      data.push(newChartData);
    }
  }
  return data;
};

export const prepareChartDataMontly = (
  categories: CategoryWithState[],
  transactions: Transaction[],
  year: number,
  isCumulative: boolean
) => {
  const data: ChartData[] = [];
  const preFiltered = filterTransactionsByActiveCategory(
    categories,
    transactions,
    year,
    undefined,
    true
  );
  for (let i = 0; i < 12; i++) {
    const mth = months[i]?.name;
    const newChartData: ChartData = {
      date: mth ? mth : "",
      expense: filterTransactionsByType(preFiltered, "EXPENSE").reduce(
        (a, t) =>
          isCumulative
            ? t.date.getMonth() <= i
              ? (a += Number(t.amount))
              : a
            : t.date.getMonth() === i
            ? (a += Number(t.amount))
            : a,
        0
      ),
      income: filterTransactionsByType(preFiltered, "INCOME").reduce(
        (a, t) =>
          isCumulative
            ? t.date.getMonth() <= i
              ? (a += Number(t.amount))
              : a
            : t.date.getMonth() === i
            ? (a += Number(t.amount))
            : a,
        0
      ),
    };
    data.push(newChartData);
  }
  return data;
};
