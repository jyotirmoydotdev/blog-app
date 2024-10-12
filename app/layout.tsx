import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { publication } from "@/data";
import { Toaster } from "@/components/ui/toaster"
import { App } from "./app";
import { BlogProvider } from "@/context/BlogContext";
import AuthProvider from "@/context/AuthProvider";

const outfit = Outfit({ subsets: ["latin"], weight:["400", "500", "600", "700"] });


export const metadata: Metadata = {
  title: publication.name,
  description: publication.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <App>
      <BlogProvider>
        <AuthProvider>
          <html lang="en">
            <body className={outfit.className}>
              <main>
                  {children}
              </main>
              <Toaster />
            </body>
          </html>
        </AuthProvider>
      </BlogProvider>
    </App>
  );
}
