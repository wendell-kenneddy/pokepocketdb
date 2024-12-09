import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB | Admin",
  description: "A Pokémon TCG Pocket personal match history.",
};

export default function Page() {
  return (
    <main className="w-[90%] max-w-[720px] grid place-items-center py-4 h-full mx-auto">
      <form
        action="#"
        className="w-full max-w-[500px] p-4 rounded-md bg-gray-900 flex flex-col items-center gap-4"
      >
        <div className="w-full">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            className="w-full px-4 py-2 text-gray-100 bg-gray-900 outline-none ring-1 ring-gray-950 focus:bg-gray-950 focus:ring-teal-400 invalid:ring-red-400"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            minLength={5}
          />
        </div>

        <div className="w-full">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            className="w-full px-4 py-2 text-gray-100 bg-gray-900 outline-none ring-1 ring-gray-950 focus:bg-gray-950 focus:ring-teal-400 invalid:ring-red-400"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            minLength={5}
          />
        </div>

        <button className="w-full bg-teal-600 flex items-center justify-center py-2 px-4 font-medium hover:bg-teal-400 rounded-md cursor-pointer">
          Sign in
        </button>
      </form>
    </main>
  );
}
