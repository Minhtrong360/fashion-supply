"use client";

import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./Header";
import Footer from "./Footer";
import { Provider } from "react-redux";
import store from "@/store/store";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <title>Thuê thời trang - JunHy</title>
        <meta name="description" content="Thuê thời trang, mang phong cách." />
        <meta charSet="utf-8" />
      </head>
      <body
        className={cn(
          "bg-background min-w-screen scrollbar-thumb-rounded flex min-h-screen font-sans antialiased scrollbar-thin scrollbar-thumb-gray-500",
          fontSans.variable
        )}
      >
        <main className="flex-grow">
          <Provider store={store}>
            <Header />

            {children}
            <Footer />
          </Provider>
        </main>
      </body>
    </html>
  );
}
