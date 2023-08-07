import { Disclosure, Listbox } from "@headlessui/react";
import type { ReactElement, ReactNode } from "react";
import chevronDown from "~/assets/images/chevronDown.png";
import Image from "next/image";
import { atom, useAtom } from "jotai";

export type Month = {
  name: string;
  num: number;
};

const months: Month[] = [
  { name: "January", num: 1 },
  { name: "February", num: 2 },
  { name: "March", num: 3 },
  { name: "April", num: 4 },
  { name: "May", num: 5 },
  { name: "June", num: 6 },
  { name: "July", num: 7 },
  { name: "August", num: 8 },
  { name: "September", num: 9 },
  { name: "October", num: 10 },
  { name: "November", num: 11 },
  { name: "December", num: 12 },
];

export const convertNumberToMonth = (num: number): Month | undefined => {
  return months.find((m) => m.num === num);
};

export const monthAtom = atom<Month | undefined>(
  months[new Date(Date.now()).getMonth() + 1]
);

export default function AccordionWrapper({
  children,
}: {
  children: ReactElement | ReactNode[] | null | undefined;
}) {
  const [month, setMonth] = useAtom(monthAtom);

  return (
    <Disclosure as="div" className="gap-2" defaultOpen>
      {({ open }) => (
        <>
          <div className="relative flex w-full flex-row items-center justify-start gap-2 text-left text-2xl font-black text-rose-200">
            <Disclosure.Button className="flex w-fit flex-row items-center justify-start gap-2 text-left text-2xl font-black text-rose-200">
              <Image
                src={chevronDown}
                alt="chevron"
                className={`${open ? "" : "-rotate-90 transform"} h-5 w-5`}
              />
            </Disclosure.Button>
            <Listbox value={month} onChange={setMonth}>
              <Listbox.Button className="flex flex-row items-center justify-start gap-2">
                <span>
                  {month?.name} {new Date(Date.now()).getFullYear()}
                </span>
                <Image src={chevronDown} alt="chevron" className="h-5 w-5" />
              </Listbox.Button>
              <Listbox.Options className="absolute left-6 top-8 z-50 gap-0.5 rounded-xl bg-blue-900">
                {months.map((mth) => (
                  <Listbox.Option
                    key={mth?.num}
                    value={mth}
                    className="cursor-pointer px-4 hover:text-rose-300"
                  >
                    {mth?.name} {new Date(Date.now()).getFullYear()}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <Disclosure.Panel className="flex w-full flex-row items-start justify-start gap-4 text-rose-200">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
