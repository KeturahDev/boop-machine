import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boop Machine",
  description: "Explore and figure it out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="valentine" lang="en">
      <body className={inter.className}>
        <main className="flex flex-col justify-center">
          <div className="flex justify-center items-center mt-4">
            <Link href={"/"}>
              <div className="btn">🏠</div>
            </Link>
          </div>
          <div className="m-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
