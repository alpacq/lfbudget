import { useAtomValue } from "jotai";
import {
  categoriesAtom,
  categoryAtomsAtom,
  monthAtom,
  transactionsAtom,
  yearAtom,
} from "~/utils/globalAtoms";
import {
  sumTransactionsByCategory,
  sumTransactionsBySavings,
} from "~/utils/helpers";
import CategoryCard from "~/components/molecules/CategoryCard/CategoryCard";

export default function CategoriesMonthlyTable({
  isSavings,
}: {
  isSavings?: boolean;
}) {
  const transactions = useAtomValue(transactionsAtom);
  const categories = useAtomValue(categoriesAtom);
  const categoryAtoms = useAtomValue(categoryAtomsAtom);
  const month = useAtomValue(monthAtom);
  const year = useAtomValue(yearAtom);

  const limitsSum = categories
    .filter(
      (c) =>
        c.category.isSavings === (isSavings ? isSavings : false) &&
        c.category.type === "EXPENSE"
    )
    .reduce((a, c) => (a = a + Number(c.category.limit)), 0);

  const expensesSum = sumTransactionsBySavings(
    categories.filter((c) => c.category.type === "EXPENSE"),
    transactions,
    year,
    month,
    isSavings ? isSavings : false
  );

  const differenceSum = limitsSum - expensesSum;

  return (
    <div className="h-max-96 flex w-1/3 flex-col items-center justify-center gap-2 overflow-y-auto overflow-x-hidden py-2">
      <h5 className="w-full text-left text-xs font-medium text-rose-200">
        Categories - {isSavings ? "savings" : "daily"}
      </h5>
      <table className="w-full table-fixed">
        <tbody className="text-left text-xs font-medium text-rose-200">
          {categories
            .filter(
              (c) =>
                (isSavings ? c.category.isSavings : !c.category.isSavings) &&
                c.category.type === "EXPENSE"
            )
            .map((c) => {
              const categoryAtom =
                categoryAtoms[
                  categories.findIndex(
                    (cat) => cat.category.id === c.category.id
                  )
                ];
              const sum = sumTransactionsByCategory(
                c,
                transactions,
                year,
                month
              );
              const diff = Number(c.category.limit) - sum;
              if (categoryAtom) {
                return (
                  <tr key={c.category.id}>
                    <td className="w-48 py-1 pr-4">
                      <CategoryCard isSmall categoryAtom={categoryAtom} />
                    </td>
                    <td className="py-1 pr-2">
                      {Number(c.category.limit).toFixed(2)}
                    </td>
                    <td className="py-1 pr-2">{sum.toFixed(2)}</td>
                    <td
                      className={`${
                        diff >= 0 ? "text-green-500" : "text-red-400"
                      } py-1 pr-2`}
                    >
                      {diff.toFixed(2)}
                    </td>
                  </tr>
                );
              } else return null;
            })}
          <tr>
            <td className="w-48 py-2 pr-4">SUM</td>
            <td className="py-2 pr-2">{limitsSum.toFixed(2)}</td>
            <td className="py-2 pr-2">{expensesSum.toFixed(2)}</td>
            <td
              className={`${
                differenceSum >= 0 ? "text-green-500" : "text-red-400"
              } py-2 pr-2`}
            >
              {differenceSum.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
