import { ReactNode } from "react";

interface TableDataProps {
  children: ReactNode;
}

export function TableData({ children }: TableDataProps) {
  return <td className="text-center bg-gray-800 py-2 gap-1 text-nowrap">{children}</td>;
}
