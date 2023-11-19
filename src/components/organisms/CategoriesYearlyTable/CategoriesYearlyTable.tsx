import { useAtomValue } from "jotai";
import {
  categoriesAtom,
  categoryAtomsAtom,
  transactionsAtom,
  yearAtom,
} from "~/utils/globalAtoms";
import CategoryCard from "~/components/molecules/CategoryCard/CategoryCard";
import { sumTransactionsByCategory } from "~/utils/helpers";
import { months } from "~/utils/collections";

export default function CategoriesYearlyTable({
  isSavings,
  isIncome,
}: {
  isSavings?: boolean;
  isIncome?: boolean;
}) {
  const transactions = useAtomValue(transactionsAtom);
  const categories = useAtomValue(categoriesAtom);
  const categoryAtoms = useAtomValue(categoryAtomsAtom);
  const year = useAtomValue(yearAtom);
  const monthlySums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 overflow-hidden py-2">
      <h5 className="w-full text-left text-xs font-medium text-rose-200">
        Categories - {isSavings ? "savings" : isIncome ? "incomes" : "daily"} -
        monthly
      </h5>
      <table className="w-full table-fixed">
        <tbody className="text-left text-xs font-medium text-rose-200">
          <tr>
            <td className="w-48 py-1 pr-4" />
            {months.map((mth, index) => (
              <td className="py-1 pr-2" key={index}>
                {mth.abbreviation}
              </td>
            ))}
            <td className="py-1 pr-2">SUM</td>
          </tr>
          {categories
            .filter(
              (c) =>
                (isSavings ? c.category.isSavings : !c.category.isSavings) &&
                (isIncome
                  ? c.category.type === "INCOME"
                  : c.category.type === "EXPENSE")
            )
            .map((c) => {
              const categoryAtom =
                categoryAtoms[
                  categories.findIndex(
                    (cat) => cat.category.id === c.category.id
                  )
                ];
              if (categoryAtom) {
                let categorySum = 0;
                return (
                  <tr key={c.category.id}>
                    <td className="w-48 py-1 pr-4">
                      <CategoryCard isSmall categoryAtom={categoryAtom} />
                    </td>
                    {months.map((mth, index) => {
                      const sum = sumTransactionsByCategory(
                        c,
                        transactions,
                        year,
                        mth
                      );
                      const diff =
                        c.category.type === "EXPENSE"
                          ? Number(c.category.limit) - sum
                          : sum;
                      monthlySums[index] += diff;
                      categorySum += diff;
                      return (
                        <td
                          key={index}
                          className={`${
                            diff >= 0 ? "text-green-500" : "text-red-400"
                          } py-1 pr-2`}
                        >
                          {diff.toFixed(2)}
                        </td>
                      );
                    })}
                    <td
                      className={`${
                        categorySum >= 0 ? "text-green-500" : "text-red-400"
                      } py-1 pr-2`}
                    >
                      {categorySum.toFixed(2)}
                    </td>
                  </tr>
                );
              } else return null;
            })}
          <tr>
            <td className="w-48 py-2 pr-4">SUM</td>
            {monthlySums.map((_mth, index) => {
              const sum = monthlySums ? monthlySums[index] : 0;
              if (sum) {
                return (
                  <td
                    className={`${
                      sum >= 0 ? "text-green-500" : "text-red-400"
                    } py-2 pr-2`}
                    key={index}
                  >
                    {monthlySums[index]?.toFixed(2)}
                  </td>
                );
              } else
                return (
                  <td className="py-2 pr-2 text-green-500" key={index}>
                    0.00
                  </td>
                );
            })}
            <td
              className={`${
                monthlySums.reduce((a, t) => (a = a + t)) >= 0
                  ? "text-green-500"
                  : "text-red-400"
              } py-2 pr-2`}
            >
              {monthlySums.reduce((a, t) => (a = a + t)).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
