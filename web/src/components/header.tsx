import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-900 h-full w-full border-b border-b-gray-800">
      <div className="w-[90%] h-full mx-auto max-w-[720px] flex items-center justify-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" priority width={111} height={19} />
        </Link>
      </div>
    </header>
  );
}
