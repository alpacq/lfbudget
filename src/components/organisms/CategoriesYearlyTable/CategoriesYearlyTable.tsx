import { useAtomValue } from "jotai";
import {
  categoriesAtom,
  categoryAtomsAtom,
  monthAtom,
  transactionsAtom,
  yearAtom,
} from "~/utils/globalAtoms";
import CategoryCard from "~/components/molecules/CategoryCard/CategoryCard";
import { sumTransactionsByCategory } from "~/utils/helpers";

export default function CategoriesYearlyTable({
  isSavings,
}: {
  isSavings?: boolean;
}) {
  const transactions = useAtomValue(transactionsAtom);
  const categories = useAtomValue(categoriesAtom);
  const categoryAtoms = useAtomValue(categoryAtomsAtom);
  const month = useAtomValue(monthAtom);
  const year = useAtomValue(yearAtom);

  return (
    <div className="h-max-96 flex w-1/3 flex-col items-center justify-center gap-2 overflow-y-auto overflow-x-hidden py-2">
      <h5 className="w-full text-left text-xs font-medium text-rose-200">
        Categories - {isSavings ? "savings" : "daily"} - monthly
      </h5>
      <table className="w-full table-fixed">
        <tbody className="text-left text-xs font-medium text-rose-200">
          {categories
            .filter((c) =>
              isSavings ? c.category.isSavings : !c.category.isSavings
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
                      {diff >= 0.0 ? "" : "-" + diff.toFixed(2)}
                    </td>
                  </tr>
                );
              } else return null;
            })}
        </tbody>
      </table>
    </div>
  );
}
