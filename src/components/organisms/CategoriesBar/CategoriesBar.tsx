import CategoryCard from "~/components/molecules/CategoryCard/CategoryCard";
import { useAtom, useAtomValue } from "jotai";
import {
  categoriesAtom,
  categoryAtomsAtom,
} from "~/components/templates/MainDashboard/MainDashboard";
import { TrashIcon } from "@heroicons/react/24/solid";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

export default function CategoriesBar() {
  const [categoryAtoms] = useAtom(categoryAtomsAtom);
  const categories = useAtomValue(categoriesAtom);
  const ctx = api.useContext();

  const { mutate } = api.categories.delete.useMutation({
    onSuccess: () => {
      void ctx.categories.getByUser.invalidate();
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
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="flex h-6 w-full flex-row items-center justify-end gap-2">
        {categories.some((category) => category.isActive) ? (
          <button
            className="inset-y-0 right-0 flex items-center pr-2"
            onClick={() => {
              categories.forEach((category) => {
                if (category.isActive) mutate(category.category.id);
              });
            }}
          >
            <TrashIcon className="h-6 w-6 text-rose-200" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2">
        {categoryAtoms.map((categoryAtom, index) => (
          <CategoryCard key={index} categoryAtom={categoryAtom} />
        ))}
      </div>
    </div>
  );
}
