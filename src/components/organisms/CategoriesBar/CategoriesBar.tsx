import CategoryCard from "~/components/molecules/CategoryCard/CategoryCard";
import { useAtom } from "jotai";
import { categoryAtomsAtom } from "~/components/templates/MainDashboard/MainDashboard";

export default function CategoriesBar() {
  const [categoryAtoms] = useAtom(categoryAtomsAtom);

  return (
    <div className="flex w-full flex-row flex-wrap items-start justify-start gap-2">
      {categoryAtoms.map((categoryAtom, index) => (
        <CategoryCard
          key={index}
          categoryAtom={categoryAtom}
          // remove={() => dispatch({ type: "remove", atom: categoryAtom })}
        />
      ))}
    </div>
  );
}
