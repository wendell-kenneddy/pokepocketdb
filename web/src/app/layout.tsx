import { Header } from "@/components/header";
import "../styles/./globals.css";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  creator: "Wendell Kenneddy",
  icons: [
    { rel: "icon", url: "/favicon.ico", sizes: "any" },
    { rel: "icon", url: "/icon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", type: "image/png" },
  ],
  other: { "theme-color": "#111827" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-gray-950 text-gray-100 antialiased`}>
        <div className="w-full h-[10vh]">
          <Header />
        </div>

        <div className="w-full h-[80vh]">{children}</div>

        <div className="w-full h-[10vh]">
          <Footer />
        </div>
      </body>
    </html>
  );
}
