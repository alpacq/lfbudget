import { useAtom, useAtomValue } from "jotai";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import chevronDown from "~/assets/images/chevronDown.png";
import { monthAtom, yearAtom } from "~/utils/globalAtoms";
import { months } from "~/utils/collections";

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
      <Listbox.Options className="absolute left-3 top-8 z-50 w-56 gap-0.5 rounded-xl bg-blue-900">
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
