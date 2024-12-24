import { SigninForm } from "@/components/signin-form";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "pokepocketDB Admin",
  description: "A Pokémon TCG Pocket personal match history.",
};

export default async function Page() {
  const { get } = await cookies();
  const accessToken = get("access-token");
  const refreshToken = get("refresh-token");
  if (accessToken && refreshToken) return redirect("/dashboard");

  return (
    <main className="w-[90%] max-w-[720px] grid place-items-center py-4 h-full mx-auto">
      <SigninForm />
    </main>
  );
}
