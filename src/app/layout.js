"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { MainContext } from "../context/MainContext";
import { useState } from "react";
import { AuthContextProvider } from "../context/AuthContext";
import { SocketContextProvider } from "../context/socketcontext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [uniqueIdentity, setUniqueIdentity] = useState("");
  return (
    <MainContext.Provider
      value={{ loginEmail, setLoginEmail, uniqueIdentity, setUniqueIdentity }}
    >
      <AuthContextProvider>
        <SocketContextProvider>
          <html lang="en">
            <Toaster position="bottom-center" />

            <body className={inter.className}>{children}</body>
          </html>
        </SocketContextProvider>
      </AuthContextProvider>
    </MainContext.Provider>
  );
}
