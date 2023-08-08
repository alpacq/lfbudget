import { atom, useAtom, useAtomValue } from "jotai";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import chevronDown from "~/assets/images/chevronDown.png";
import { yearAtom } from "~/components/molecules/Listbox/YearListbox";

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

export const monthAtom = atom<Month | undefined>(
  months[new Date(Date.now()).getMonth()]
);

export default function MonthListbox() {
  const [month, setMonth] = useAtom(monthAtom);
  const year = useAtomValue(yearAtom);

  return (
    <Listbox value={month} onChange={setMonth}>
      <Listbox.Button className="flex flex-row items-center justify-start gap-2">
        <span>
          {month?.name} {year}
        </span>
        <Image src={chevronDown} alt="chevron" className="h-5 w-5" />
      </Listbox.Button>
      <Listbox.Options className="absolute left-3 top-8 z-50 gap-0.5 rounded-xl bg-blue-900">
        {months.map((mth) => (
          <Listbox.Option
            key={mth?.num}
            value={mth}
            className="cursor-pointer px-4 hover:text-rose-300"
          >
            {mth?.name} {year}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
