import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audiophile Ecommerce",
  description: "FrontEnd Mentor Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased font-sans text-body`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
