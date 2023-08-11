import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import type { CategoryWithState } from "~/utils/customTypes";

export default function CategoryCard({
  isSmall,
  categoryAtom,
}: {
  isSmall?: boolean;
  categoryAtom: PrimitiveAtom<CategoryWithState>;
}) {
  const [category, setCategory] = useAtom(categoryAtom);

  return (
    <div
      onClick={(e) => {
        setCategory((oldValue) => ({
          category: oldValue.category,
          isActive: !oldValue.isActive,
        }));
      }}
      className={`${
        isSmall ? "text-xs font-medium" : "text-xl font-semibold"
      } ${
        category.isActive && !isSmall ? "bg-rose-400" : "bg-rose-300"
      } flex h-fit w-fit cursor-pointer items-center justify-center gap-4 rounded-2xl px-4 py-1 text-left text-indigo-900 shadow-md`}
    >
      {category.category.name}
    </div>
  );
}
