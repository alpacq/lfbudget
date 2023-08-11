import { atom } from "jotai";
import type { CategoryWithState, Month } from "~/utils/customTypes";
import type { Transaction } from "@prisma/client";
import { splitAtom } from "jotai/utils";
import { months } from "~/utils/collections";
import type { ChartData } from "~/utils/customTypes";

export const monthAtom = atom<Month | undefined>(
  months[new Date(Date.now()).getMonth()]
);
export const yearAtom = atom<number>(new Date(Date.now()).getFullYear());
export const transactionsAtom = atom<Transaction[]>([]);
export const categoriesAtom = atom<CategoryWithState[]>([]);
export const categoryAtomsAtom = splitAtom(categoriesAtom);
export const categoryModalAtom = atom<boolean>(false);
export const transactionModalAtom = atom<boolean>(false);
export const chartDataDailyAtom = atom<ChartData[]>([]);
export const chartDataMonthlyAtom = atom<ChartData[]>([]);
export const isCumulativeDailyAtom = atom<boolean>(true);
export const isCumulativeMonthlyAtom = atom<boolean>(false);
