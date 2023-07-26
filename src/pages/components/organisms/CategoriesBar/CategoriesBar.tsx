import { api } from "~/utils/api";
import CategoryCard from "~/pages/components/molecules/CategoryCard/CategoryCard";

export default function CategoriesBar() {
  const { data, isLoading } = api.categories.getAll.useQuery();
  return (
    <div className="flex w-full flex-row flex-wrap items-start justify-start gap-2">
      {!data && isLoading
        ? "Loading"
        : !data
        ? "Error."
        : data?.map((category, index) => (
            <CategoryCard name={category.name} key={index} />
          ))}
    </div>
  );
}
