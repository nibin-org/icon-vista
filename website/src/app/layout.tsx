import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "icon-vista — Beautiful icons, instantly typed",
  description: "Search across 200,000+ open-source icons. Click any icon to instantly generate a strictly-typed React component in your codebase.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans min-h-screen selection:bg-brand-purple/30`}>
        {children}
      </body>
    </html>
  );
}
