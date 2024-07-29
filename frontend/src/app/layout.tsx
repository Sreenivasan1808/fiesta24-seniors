import type { Metadata } from "next";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});



export const metadata: Metadata = {
  title: "Fiesta'24",
  description: "Intra college cultural event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={josefin_sans.className}>
        {" "}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
