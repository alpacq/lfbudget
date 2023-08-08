import { Disclosure } from "@headlessui/react";
import type { ReactElement, ReactNode } from "react";
import chevronDown from "~/assets/images/chevronDown.png";
import Image from "next/image";
import MonthListbox from "~/components/molecules/Listbox/MonthListbox";
import YearListbox from "~/components/molecules/Listbox/YearListbox";

export default function AccordionWrapper({
  children,
  isYear,
}: {
  children: ReactElement | ReactNode[] | null | undefined;
  isYear?: boolean;
}) {
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
            {isYear ? <YearListbox /> : <MonthListbox />}
          </div>
          <Disclosure.Panel className="flex w-full flex-row items-start justify-start gap-4 text-rose-200">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
