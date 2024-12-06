import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant: "neutral" | "winner" | "loser";
}

const VARIANTS_ENUM = {
  neutral: "bg-gray-900",
  winner: "bg-teal-600",
  loser: "bg-red-600",
};

export function Badge({ children, variant }: BadgeProps) {
  return (
    <span
      className={`rounded-md font-medium flex items-center justify-center py-2 px-4 text-nowrap ${VARIANTS_ENUM[variant]}`}
    >
      {children}
    </span>
  );
}
