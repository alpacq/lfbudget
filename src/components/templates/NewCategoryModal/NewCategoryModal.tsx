import { Combobox, Dialog, Switch, Transition } from "@headlessui/react";
import { atom, useAtom } from "jotai";
import { Hanken_Grotesk } from "next/font/google";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { categoryModalAtom } from "~/utils/globalAtoms";
import Image from "next/image";
import chevronDown from "~/assets/images/chevronDown.png";
import { Fragment } from "react";

const savingsAtom = atom<boolean>(false);
const nameAtom = atom<string>("");
const limitAtom = atom<string>("0");
const typeAtom = atom<string>("Expense");

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const NewCategoryModal = () => {
  const [isOpen, setIsOpen] = useAtom(categoryModalAtom);
  const [transactionType, setTransactionType] = useAtom(typeAtom);
  const [isSavings, setIsSavings] = useAtom(savingsAtom);
  const [name, setName] = useAtom(nameAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const transactionTypes: string[] = ["Expense", "Income"];
  const ctx = api.useContext();

  const { mutate } = api.categories.create.useMutation({
    onSuccess: () => {
      setIsOpen(false);
      setName("");
      setIsSavings(false);
      setLimit("0");
      setTransactionType("Expense");
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
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-full items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel
          className={`${hanken.variable} mx-auto flex h-fit w-3/12 flex-col items-center justify-start gap-8 rounded-2xl bg-indigo-900 p-8 font-sans shadow-md`}
          style={{ fontFamily: "var(--font-hanken" }}
        >
          <Dialog.Title className="text-left font-sans text-2xl font-black text-rose-200">
            New category
          </Dialog.Title>
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <div className="grid w-full grid-cols-3 grid-rows-4 items-center gap-5 p-0">
              <label className="text-left text-base font-medium text-rose-200">
                Type
              </label>
              <Combobox value={transactionType} onChange={setTransactionType}>
                <div className="relative col-span-2 rounded-xl border border-rose-200 bg-transparent p-2 text-left text-base font-medium text-rose-200 outline-0">
                  <div className="relative">
                    <Combobox.Input className="w-full bg-transparent outline-0" />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <Image src={chevronDown} alt="chevron down" />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Combobox.Options className="absolute -left-0.5 w-full gap-2 rounded-xl border border-rose-200 bg-indigo-900 p-2 text-left text-base font-medium text-rose-200 outline-0">
                      {transactionTypes.map((tp) => (
                        <Combobox.Option
                          key={tp}
                          className={({ active }) =>
                            `relative cursor-pointer select-none bg-transparent p-2 text-left text-base font-medium outline-0 ${
                              active ? "text-rose-300" : "text-rose-200"
                            }`
                          }
                          value={tp}
                        >
                          {tp}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
              <label className="text-left text-base font-medium text-rose-200">
                Name
              </label>
              <input
                className="col-span-2 rounded-xl border border-rose-200 bg-transparent p-2 text-left text-base font-medium text-rose-200 outline-0"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="text-left text-base font-medium text-rose-200">
                Monthly limit
              </label>
              <input
                className="col-span-2 rounded-xl border border-rose-200 bg-transparent p-2 text-left text-base font-medium text-rose-200 outline-0"
                placeholder="Limit"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
              <label className="text-left text-base font-medium text-rose-200">
                Is from savings
              </label>
              <Switch
                checked={isSavings}
                onChange={setIsSavings}
                className={`${isSavings ? "bg-rose-400" : "bg-rose-300"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${isSavings ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <button
              className="flex h-fit w-fit items-center justify-center gap-4 self-end rounded-2xl bg-rose-700 px-4 py-1 text-left text-xl font-black text-rose-200 shadow-md"
              onClick={() =>
                mutate({
                  isSavings,
                  name,
                  limit: parseFloat(limit.replace(",", ".")),
                  transactionType,
                })
              }
            >
              Add
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default NewCategoryModal;
