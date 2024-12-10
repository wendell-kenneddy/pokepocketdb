"use client";

import { AccordionTrigger, AccordionTriggerProps } from "@radix-ui/react-accordion";
import { usePathname } from "next/navigation";
import { forwardRef, ReactNode, Ref } from "react";
import { FiChevronDown } from "react-icons/fi";

interface SidebarAccordionTriggerProps extends AccordionTriggerProps {
  path: string;
  children: ReactNode;
}

export const SidebarAccordionTrigger = forwardRef(
  (props: SidebarAccordionTriggerProps, forwardedRef: Ref<HTMLButtonElement>) => {
    const pathname = usePathname();
    const textCss = pathname.includes(props.path) ? "text-teal-400 font-medium" : "text-gray-100";

    return (
      <AccordionTrigger
        className={`flex items-center gap-4 ${textCss}`}
        {...props}
        ref={forwardedRef}
      >
        {props.children}

        <FiChevronDown size={16} className="group-data-[state=open]:rotate-180" />
      </AccordionTrigger>
    );
  }
);
