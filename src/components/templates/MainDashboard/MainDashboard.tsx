import { api } from "~/utils/api";
import LoadingScreen from "~/components/templates/LoadingScreen/LoadingScreen";
import ErrorScreen from "~/components/templates/ErrorScreen/ErrorScreen";
import ActionBar from "~/components/organisms/ActionBar/ActionBar";
import CategoriesBar from "~/components/organisms/CategoriesBar/CategoriesBar";
import { useSession } from "next-auth/react";
import { atom, useSetAtom } from "jotai";
import type { Category, Transaction } from "@prisma/client";
import { splitAtom } from "jotai/utils";
import TransactionsTable from "~/components/organisms/TransactionsTable/TransactionsTable";
import AccordionWrapper from "~/components/templates/AccordionWrapper/AccordionWrapper";
import { useEffect } from "react";
import ExpenseIncomeChart from "~/components/organisms/ExpenseIncomeChart/ExpenseIncomeChart";

export type CategoryWithState = { category: Category; isActive: boolean };

export const transactionsAtom = atom<Transaction[]>([]);
export const categoriesAtom = atom<CategoryWithState[]>([]);
export const categoryAtomsAtom = splitAtom(categoriesAtom);

export default function MainDashboard() {
  const { data: sessionData } = useSession();
  const { data: transactions, isLoading: isTransactionsLoading } =
    api.transactions.getByUser.useQuery(
      sessionData ? sessionData?.user?.id : "0"
    );
  const { data: categories, isLoading: isCategoriesLoading } =
    api.categories.getByUser.useQuery(
      sessionData ? sessionData?.user?.id : "0"
    );
  const setTransactions = useSetAtom(transactionsAtom);
  const setCategories = useSetAtom(categoriesAtom);

  useEffect(() => {
    if (transactions && !isTransactionsLoading) setTransactions(transactions);
  }, [transactions, isTransactionsLoading, setTransactions]);
  useEffect(() => {
    if (categories && !isCategoriesLoading) {
      const categoriesWithState: CategoryWithState[] = categories.map(
        (category: Category) => {
          return { category: category, isActive: false };
        }
      );
      setCategories(categoriesWithState);
    }
  }, [categories, isCategoriesLoading, setCategories]);

  if (
    (!transactions || !categories) &&
    (isTransactionsLoading || isCategoriesLoading)
  )
    return <LoadingScreen />;

  if (!transactions || !categories) return <ErrorScreen />;

  return (
    <div className="px-26 gap:12 flex min-h-screen w-full flex-col items-start justify-start py-12 md:gap-24 md:px-52 md:py-24">
      <ActionBar />
      <CategoriesBar />
      <AccordionWrapper>
        <ExpenseIncomeChart />
        <TransactionsTable />
      </AccordionWrapper>
      <AccordionWrapper isYear>
        <ExpenseIncomeChart isYear />
        <TransactionsTable isYear />
      </AccordionWrapper>
    </div>
  );
}
