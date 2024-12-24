import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Dashboard",
  description: "Access and manage all your data.",
};

export default async function Dashboard() {
  return (
    <main className="w-[90%] max-w-[500px] mx-auto flex flex-col items-start py-4 gap-4">
      <h1 className="sr-only">Dashboard page</h1>

      <p className="text-justify">
        Here you can access and manage all data from pokepocketDB. Not sure where to start? Maybe{" "}
        <Link
          className="text-teal-400 underline hover:no-underline"
          href="/dashboard/expansions/create"
        >
          try creating an Expansion first
        </Link>
        .
      </p>
    </main>
  );
}
