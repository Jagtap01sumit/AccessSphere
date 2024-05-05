"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { MainContext } from "../context/MainContext";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [loginEmail, setLoginEmail] = useState("");
  return (
    <MainContext.Provider value={{ loginEmail, setLoginEmail }}>
      <html lang="en">
        <Toaster position="bottom-center" />

        <body className={inter.className}>{children}</body>
      </html>
    </MainContext.Provider>
  );
}
