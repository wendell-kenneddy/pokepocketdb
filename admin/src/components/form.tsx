import { ComponentProps, FormHTMLAttributes } from "react";

interface FormProps extends ComponentProps<"form"> {}

export function Form({ children, ...props }: FormProps) {
  return (
    <form
      className="w-full max-w-[600px] p-4 rounded-md bg-gray-900 flex flex-col items-center gap-4"
      {...props}
    >
      {children}
    </form>
  );
}
