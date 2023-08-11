import { useAtom } from "jotai";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import chevronDown from "~/assets/images/chevronDown.png";
import { yearAtom } from "~/utils/globalAtoms";
import { years } from "~/utils/collections";

export default function YearListbox() {
  const [year, setYear] = useAtom(yearAtom);

  return (
    <Listbox value={year} onChange={setYear}>
      <Listbox.Button className="flex flex-row items-center justify-start gap-2">
        <span>{year}</span>
        <Image src={chevronDown} alt="chevron" className="h-5 w-5" />
      </Listbox.Button>
      <Listbox.Options className="absolute left-3 top-8 z-50 gap-0.5 rounded-xl bg-blue-900">
        {years.map((yr) => (
          <Listbox.Option
            key={yr}
            value={yr}
            className="cursor-pointer px-4 hover:text-rose-300"
          >
            {yr}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
