import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
          <div className="m-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
