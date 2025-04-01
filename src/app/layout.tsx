import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const firaSans = Fira_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fira-sans",
});

export const metadata: Metadata = {
  title: "Anime List",
  description: "Create and share your personalized anime list!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaSans.variable} m-auto bg-neutral-900 text-white antialiased md:px-0`}
      >
        <header>
          <Nav />
        </header>
        <div className="container m-auto px-10 md:px-0">{children}</div>
      </body>
    </html>
  );
}
