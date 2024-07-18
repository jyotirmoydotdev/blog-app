import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Publication } from "../data";
import { ThemeProvider } from "../components/theme-provider"

const outfit = Outfit({ subsets: ["latin"], weight:["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: Publication.publicationName,
  description: Publication.about,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
