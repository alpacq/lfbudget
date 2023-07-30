import CategoryCard from "~/pages/components/molecules/CategoryCard/CategoryCard";
import { useAtom } from "jotai";
import { categoriesAtom } from "~/pages/components/templates/MainDashboard/MainDashboard";

export default function CategoriesBar() {
  const [categories, setCategories] = useAtom(categoriesAtom);

  return (
    <div className="flex w-full flex-row flex-wrap items-start justify-start gap-2">
      {!categories
        ? "Error."
        : categories?.map((category, index) => (
            <CategoryCard
              name={category.category.name}
              key={index}
              isActive={category.isActive}
              idx={index}
            />
          ))}
    </div>
  );
}
