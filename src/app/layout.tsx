import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "Fullstack Developer Project",
  description: "A project showcasing the skills of a fullstack developer using Next.js and React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body     
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
