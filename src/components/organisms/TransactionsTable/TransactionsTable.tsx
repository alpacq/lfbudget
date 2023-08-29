import { useAtomValue } from "jotai";
import { TrashIcon } from "@heroicons/react/20/solid";
import CategoryCard from "~/components/molecules/CategoryCard/CategoryCard";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { filterTransactionsByActiveCategory } from "~/utils/helpers";
import {
  categoriesAtom,
  categoryAtomsAtom,
  monthAtom,
  transactionsAtom,
  yearAtom,
} from "~/utils/globalAtoms";

export default function TransactionsTable({ isYear }: { isYear?: boolean }) {
  const transactions = useAtomValue(transactionsAtom);
  const categories = useAtomValue(categoriesAtom);
  const categoryAtoms = useAtomValue(categoryAtomsAtom);
  const year = useAtomValue(yearAtom);
  const month = useAtomValue(monthAtom);
  const ctx = api.useContext();

  const { mutate } = api.transactions.delete.useMutation({
    onSuccess: () => {
      void ctx.transactions.getByUser.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to add! Please try again later.");
      }
    },
  });

  return (
    <div className="h-max-96 flex w-1/3 flex-col items-center justify-center gap-2 overflow-y-auto overflow-x-hidden py-2">
      <table className="w-full table-fixed">
        <thead className="w-full text-left text-base font-medium text-rose-200">
          <tr>
            <th className="w-1/3 py-2 pr-4">Transaction</th>
            <th className="w-1/3 py-2 pr-4">Category</th>
            <th className="w-1/6 py-2 pr-4">Amount</th>
            <th className="w-1/6 py-2 pr-2"></th>
          </tr>
        </thead>
        <tbody className="text-left text-xs font-medium text-rose-200">
          {filterTransactionsByActiveCategory(
            categories,
            transactions,
            year,
            month,
            isYear
          ).map((transaction) => {
            const categoryAtom =
              categoryAtoms[
                categories.findIndex(
                  (c) => c.category.id === transaction.categoryId
                )
              ];
            const amount = transaction.amount.toString();
            if (categoryAtom) {
              return (
                <tr key={transaction.id}>
                  <td className="py-1 pr-2">{transaction.description}</td>
                  <td className="py-1 pr-4">
                    <CategoryCard isSmall categoryAtom={categoryAtom} />
                  </td>
                  <td
                    className={`${
                      transaction.type === "EXPENSE"
                        ? "text-red-400"
                        : "text-green-500"
                    } py-1 pr-4`}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}
                    {amount.includes(".") ? amount : amount + ".00"}
                  </td>
                  <td className="py-1 pr-2">
                    <button
                      className="inset-y-0 right-0 flex items-center pr-2"
                      onClick={() => {
                        mutate(transaction.id);
                      }}
                    >
                      <TrashIcon
                        className="w-5s h-5 text-rose-200"
                        aria-hidden="true"
                      />
                    </button>
                  </td>
                </tr>
              );
            } else return null;
          })}
          <tr>
            <td className="py-1 pr-2">SUM</td>
            <td className="py-1 pr-4" />
            <td
              className={`${
                filterTransactionsByActiveCategory(
                  categories,
                  transactions,
                  year,
                  month,
                  isYear
                ).reduce(
                  (a, t) =>
                    (a =
                      a + Number(t.amount) * (t.type === "EXPENSE" ? -1 : 1)),
                  0
                ) >= 0
                  ? "text-green-500"
                  : "text-red-400"
              } py-1 pr-4`}
            >
              {filterTransactionsByActiveCategory(
                categories,
                transactions,
                year,
                month,
                isYear
              )
                .reduce(
                  (a, t) =>
                    (a =
                      a + Number(t.amount) * (t.type === "EXPENSE" ? -1 : 1)),
                  0
                )
                .toFixed(2)}
            </td>
            <td className="py-1 pr-2" />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
