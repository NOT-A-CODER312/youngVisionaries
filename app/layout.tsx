"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar/NavBar";
import {
  Poppins,
  Space_Mono,
  Satisfy,
  Shadows_Into_Light,
  Press_Start_2P,
  Oswald,
} from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { CookiesProvider } from "react-cookie";
import Head from "next/head";
import { Suspense, useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-poppins",
});
const space_mono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-space_mono",
});
const satisfy = Satisfy({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-satisfy",
});
const press_start_2P = Press_Start_2P({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-press_start_2P",
});
const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-oswald",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${space_mono.variable} ${poppins.variable} ${satisfy.variable} ${press_start_2P.variable} ${oswald.variable} text-black`}
      >
        <SessionProvider>
          <NextUIProvider>
            <CookiesProvider>
              <NavBar />
              {children}
            </CookiesProvider>
          </NextUIProvider>
        </SessionProvider>
        <Script
          src="https://sandbox-cdn.transaction.cloud/latest/widget.sandbox.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
