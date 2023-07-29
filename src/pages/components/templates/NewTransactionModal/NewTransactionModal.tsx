import { Combobox, Dialog, Switch, Transition } from "@headlessui/react";
import { atom, useAtom } from "jotai";
import { transactionModalAtom } from "~/pages/components/organisms/ActionBar/ActionBar";
import { Hanken_Grotesk } from "next/font/google";
// import type { TransactionType } from "@prisma/client";
import { Fragment } from "react";
import Image from "next/image";
import chevronDown from "~/assets/images/chevronDown.png";

const returnableAtom = atom<boolean>(false);
const typeAtom = atom<string>("Expense");

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const NewTransactionModal = () => {
  const [isOpen, setIsOpen] = useAtom(transactionModalAtom);
  const [isReturnable, setIsReturnable] = useAtom(returnableAtom);
  const [transactionType, setTransactionType] = useAtom(typeAtom);
  const transactionTypes: string[] = ["Expense", "Income"];

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-full items-center justify-center gap-8 p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel
          className={`${hanken.variable} mx-auto flex h-fit w-3/12 flex-col items-center justify-center gap-8 rounded-2xl bg-indigo-900 p-8 font-sans shadow-md`}
          style={{ fontFamily: "var(--font-hanken" }}
        >
          <Dialog.Title className="text-left font-sans text-2xl font-black text-rose-200">
            New transaction
          </Dialog.Title>
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <div className="grid w-full grid-cols-3 grid-rows-5 items-center gap-5 p-0">
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
                Description
              </label>
              <input
                className="col-span-2 rounded-xl border border-rose-200 bg-transparent p-2 text-left text-base font-medium text-rose-200 outline-0"
                placeholder="Description"
              />
              <label className="text-left text-base font-medium text-rose-200">
                Amount
              </label>
              <input
                className="col-span-2 rounded-xl border border-rose-200 bg-transparent p-2 text-left text-base font-medium text-rose-200 outline-0"
                placeholder="Amount"
              />
              <label className="text-left text-base font-medium text-rose-200">
                Category
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
                    <Combobox.Options className="absolute -left-0.5 z-10 w-full gap-2 rounded-xl border border-rose-200 bg-indigo-900 p-2 text-left text-base font-medium text-rose-200 outline-0">
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
                Possible return
              </label>
              <Switch
                checked={isReturnable}
                onChange={setIsReturnable}
                className={`${isReturnable ? "bg-rose-400" : "bg-rose-300"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    isReturnable ? "translate-x-9" : "translate-x-0"
                  }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <button
              className="flex h-fit w-fit items-center justify-center gap-4 self-end rounded-2xl bg-rose-700 px-4 py-1 text-left text-xl font-black text-rose-200 shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Add
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default NewTransactionModal;
