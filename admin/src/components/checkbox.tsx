import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { type CheckboxProps as RadixCheckboxProps } from "@radix-ui/react-checkbox";
import { ReactNode } from "react";
import { FiCheck } from "react-icons/fi";

interface CheckboxProps extends RadixCheckboxProps {
  id: string;
  children: ReactNode;
}

export function Checkbox({ id, children, disabled, ...props }: CheckboxProps) {
  const labelStyles = disabled ? "opacity-50" : "";

  return (
    <div className="flex items-center gap-2">
      <RadixCheckbox.Root
        className="disabled:opacity-50 disabled:cursor-not-allowed flex size-6 appearance-none items-center justify-center rounded bg-gray-900 ring-1 ring-teal-400 outline-none [&:not(:disabled)]:hover:bg-gray-950 focus:shadow-[0_0_0_2px_black]"
        id={id}
        disabled={disabled}
        {...props}
      >
        <RadixCheckbox.Indicator className="text-violet11">
          <FiCheck size={16} className="text-teal-400" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      <label className={`text-sm text-nowrap ${labelStyles}`} htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
