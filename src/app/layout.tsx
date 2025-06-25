import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { ClerkProvider } from '@clerk/nextjs'; // Apenas o provider é necessário aqui

const inter = Inter({ subsets: ["latin"] });

import { ptBR, enUS } from "@clerk/localizations";
import MapsProvider from "./components/MapsProvider";

const userLanguage = typeof navigator !== 'undefined' ? navigator.language || "pt-BR" : "pt-BR";

const localization = userLanguage.startsWith("pt") ? ptBR : enUS;

export const metadata: Metadata = {
  title: "Socó",
  description: "Mova-se livremente por Saquarema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={localization}>
      <MapsProvider>
        <html lang="pt-BR" suppressHydrationWarning>
          <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </MapsProvider>
    </ClerkProvider>
  );
}