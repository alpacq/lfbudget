import { Disclosure } from "@headlessui/react";
import type { ReactElement, ReactNode } from "react";
import chevronDown from "~/assets/images/chevronDown.png";
import Image from "next/image";

export default function AccordionWrapper({
  children,
}: {
  children: ReactElement | ReactNode[] | null | undefined;
}) {
  return (
    <Disclosure as="div" className="gap-2">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full flex-row items-center justify-start gap-2 text-left text-2xl font-black text-rose-200">
            <Image
              src={chevronDown}
              alt="chevron"
              className={`${open ? "" : "-rotate-90 transform"} h-5 w-5`}
            />
            <span>July 2023</span>
          </Disclosure.Button>
          <Disclosure.Panel className="flex w-full flex-row items-start justify-start gap-4 text-rose-200">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
