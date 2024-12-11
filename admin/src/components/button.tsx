import { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonStyles = tv({
  base: "flex items-center justify-center py-2 px-4 font-medium cursor-pointer hover:opacity-70",
  variants: {
    colorScheme: {
      primary: "bg-teal-400",
      danger: "bg-red-500",
    },
    w: {
      max: "w-full",
    },
    borderRadius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  },
  defaultVariants: {
    colorScheme: "primary",
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

interface ButtonProps extends ComponentProps<"button">, ButtonVariants {}

export function Button({ w, colorScheme, borderRadius, children, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonStyles({ w, colorScheme, borderRadius })}>
      {children}
    </button>
  );
}
