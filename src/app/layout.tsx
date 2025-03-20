import type { Metadata } from "next";
import { Fira_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      <body className={`${firaSans.variable}  antialiased m-auto container`}>
        {children}
      </body>
    </html>
  );
}
