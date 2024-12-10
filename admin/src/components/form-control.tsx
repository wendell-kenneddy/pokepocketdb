import { ComponentProps, InputHTMLAttributes } from "react";

interface FormControlProps extends ComponentProps<"input"> {
  label: string;
  labelFor: string;
}

export function FormControl({ label, labelFor, ...props }: FormControlProps) {
  return (
    <div className="w-full">
      <label htmlFor={labelFor} className="sr-only">
        {label}
      </label>

      <input
        className="w-full px-4 py-2 text-gray-100 bg-gray-900 outline-none ring-1 ring-gray-950 focus:bg-gray-950 focus:ring-teal-400 invalid:ring-red-400"
        {...props}
      />
    </div>
  );
}
