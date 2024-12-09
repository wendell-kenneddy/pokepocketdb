import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-900 h-full w-full border-b border-b-gray-800">
      <div className="w-[90%] h-full mx-auto max-w-[720px] flex items-center justify-center">
        <Link href="/dashboard">
          <Image src="/logo-admin.svg" alt="Logo" priority width={170} height={24} />
        </Link>
      </div>
    </header>
  );
}
