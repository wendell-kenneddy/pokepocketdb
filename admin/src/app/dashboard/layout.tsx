import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function DasboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-rows-1 grid-cols-[20%_80%] h-full">
      <Sidebar />

      <div className="h-full w-full overflow-y-auto">{children}</div>
    </div>
  );
}
