import { UserSession } from "@/data/types";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

interface HeaderProps {
  session?: UserSession;
}

export function Header({ session }: HeaderProps) {
  const justify = session ? "justify-between" : "justify-center";

  return (
    <header className="bg-gray-900 h-full w-full border-b border-b-gray-800">
      <div className={`w-[90%] h-full mx-auto max-w-[720px] flex items-center ${justify}`}>
        <Link href="/dashboard">
          <Image src="/logo-admin.svg" alt="Logo" priority width={170} height={24} />
        </Link>

        {session && (
          <div className="flex items-center justify-start gap-2">
            <span className="text-sm">{session.email}</span>

            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
}
