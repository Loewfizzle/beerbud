import type { Metadata } from "next";
import "./globals.css";
import { Beer } from "lucide-react";

export const metadata: Metadata = {
  title: "Beer Buddy | Find the perfect beer for what you're eating",
  description: "AI-powered beer and food pairing. Tell us what you're eating and we'll recommend the best beers.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0c0804] text-white antialiased">
        {children}
      </body>
    </html>
  );
}