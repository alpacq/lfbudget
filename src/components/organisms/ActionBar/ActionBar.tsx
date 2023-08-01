import { signOut } from "next-auth/react";
import { atom, useSetAtom } from "jotai";
import NewTransactionModal from "~/components/templates/NewTransactionModal/NewTransactionModal";
import NewCategoryModal from "~/components/templates/NewCategoryModal/NewCategoryModal";

export const categoryModalAtom = atom<boolean>(false);
export const transactionModalAtom = atom<boolean>(false);

export default function ActionBar() {
  const setCategoryAtom = useSetAtom(categoryModalAtom);
  const setTransactionAtom = useSetAtom(transactionModalAtom);

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <h2 className="text-left text-4xl font-black text-rose-200">
        LFBudget App
      </h2>
      <div className="flex flex-row items-center justify-center gap-6">
        <button
          className="btn flex h-fit w-fit items-center justify-center gap-4 rounded-2xl bg-rose-700 px-4 py-1 text-left text-2xl font-black text-rose-200 shadow-md"
          onClick={() => setCategoryAtom(true)}
        >
          + New category
        </button>
        <button
          className="btn flex h-fit w-fit items-center justify-center gap-4 rounded-2xl bg-rose-700 px-4 py-1 text-left text-2xl font-black text-rose-200 shadow-md"
          onClick={() => setTransactionAtom(true)}
        >
          + New transaction
        </button>
        <button
          className="shadow-mdshadow-md flex h-fit w-fit items-center justify-center gap-4 rounded-2xl bg-rose-900 px-4 py-1 text-left text-2xl font-black text-rose-200"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      </div>
      <NewTransactionModal />
      <NewCategoryModal />
    </div>
  );
}
