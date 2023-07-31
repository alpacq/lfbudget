import CategoryCard from "~/pages/components/molecules/CategoryCard/CategoryCard";
import { useAtom } from "jotai";
import { categoriesAtom } from "~/pages/components/templates/MainDashboard/MainDashboard";
import { splitAtom } from "jotai/utils";

export default function CategoriesBar() {
  const categoryAtomsAtom = splitAtom(categoriesAtom);
  const [categoryAtoms, dispatch] = useAtom(categoryAtomsAtom);

  return (
    <div className="flex w-full flex-row flex-wrap items-start justify-start gap-2">
      {!categoryAtoms
        ? "Error."
        : categoryAtoms.map((categoryAtom, index) => (
            <CategoryCard
              key={index}
              categoryAtom={categoryAtom}
              remove={() => dispatch({ type: "remove", atom: categoryAtom })}
            />
          ))}
    </div>
  );
}
