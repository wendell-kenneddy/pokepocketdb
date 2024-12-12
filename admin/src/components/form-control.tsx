import { ComponentProps, InputHTMLAttributes } from "react";

interface FormControlProps extends ComponentProps<"input"> {
  labelFor: string;
  labelVisible?: boolean;
}

export function FormControl({ children, labelFor, labelVisible, ...props }: FormControlProps) {
  const labelStyles = labelVisible ? "text-start" : "sr-only";
  const containerStyles = labelVisible ? "w-full grid grid-cols-[30%_70%] items-center" : "w-full";

  return (
    <div className={containerStyles}>
      <label htmlFor={labelFor} className={labelStyles}>
        {children}
      </label>

      <input
        className="w-full px-4 h-10 text-gray-100 bg-gray-900 outline-none ring-1 ring-gray-950 focus:bg-gray-950 focus:ring-teal-400 invalid:ring-red-400"
        {...props}
      />
    </div>
  );
}
