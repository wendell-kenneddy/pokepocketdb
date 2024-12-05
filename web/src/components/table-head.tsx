import { ReactNode } from "react";

interface TableHeadProps {
  children: ReactNode;
}

export function TableHead({ children }: TableHeadProps) {
  return (
    <th className="last-of-type:rounded-tr-md last-of-type:border-t-transparent first-of-type:border-t-transparent first-of-type:rounded-tl-md border-b border-b-teal-400 bg-gray-900 text-nowrap py-2 px-1">
      {children}
    </th>
  );
}
