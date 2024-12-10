import { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonStyles = tv({
  base: "flex items-center justify-center py-2 px-4 font-medium rounded-md cursor-pointer hover:opacity-70",
  variants: {
    colorScheme: {
      primary: "bg-teal-400",
      danger: "bg-red-500",
    },
    w: {
      max: "w-full",
    },
  },
  defaultVariants: {
    colorScheme: "primary",
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

interface ButtonProps extends ComponentProps<"button">, ButtonVariants {}

export function Button({ w, colorScheme, children, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonStyles({ w, colorScheme })}>
      {children}
    </button>
  );
}
