import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollRestorer } from "@/components/ScrollRestorer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Turan Hidayatov | Full-Stack Web Developer",
  description: "Full-Stack Web Developer - Modern web applications",
  icons: {
    icon: "/images/turanly-icon.svg",
    shortcut: "/images/turanly-favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} overflow-x-hidden`}>
      <body className="min-h-screen font-sans antialiased overflow-x-hidden">
        <ScrollRestorer />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
