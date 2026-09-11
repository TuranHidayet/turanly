import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollRestorer } from "@/components/ScrollRestorer";
import { defaultLocale } from "@/lib/i18n";

const SET_HTML_LANG_SCRIPT = `
(function () {
  var m = location.pathname.match(/^\\/(az|en|ru)(\\/|$)/);
  if (m) document.documentElement.lang = m[1];
})();
`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://turanly.com"),
  title: "Turan Hidayatov | Full-Stack Web Developer",
  description: "Full-Stack Web Developer - Modern web applications",
  verification: {
    google: "tcP06p7lL1b_s5bjuzqVS28r61F3Y8hioCsFt-reg80",
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/svg+xml" },
      { url: "/images/turanly-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/turanly-favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={defaultLocale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} overflow-x-hidden`}
    >
      <body className="min-h-screen font-sans antialiased overflow-x-hidden">
        <script dangerouslySetInnerHTML={{ __html: SET_HTML_LANG_SCRIPT }} />
        <ScrollRestorer />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
