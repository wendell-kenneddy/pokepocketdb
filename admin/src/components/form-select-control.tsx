import { ComponentProps } from "react";

export interface SelectOption {
  value: string;
  displayValue: string;
}

export interface FormSelectControlProps extends ComponentProps<"select"> {
  labelFor: string;
  options: SelectOption[];
}

export function FormSelectControl({
  labelFor,
  options,
  children,
  ...props
}: FormSelectControlProps) {
  return (
    <div className="w-full grid grid-cols-[20%_70%] items-center justify-between">
      <label htmlFor={labelFor} className="w-full text-nowrap flex items-center justify-start">
        {children}
      </label>

      <select
        {...props}
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 h-10 text-gray-100 bg-gray-900 outline-none ring-1 ring-gray-950 focus:bg-gray-950 focus:ring-teal-400 invalid:ring-red-400"
      >
        {options.map(({ value, displayValue }) => (
          <option key={value} value={value}>
            {displayValue}
          </option>
        ))}
      </select>
    </div>
  );
}
