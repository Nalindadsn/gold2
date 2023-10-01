"use client";

import { FormProvider } from "../components/FormContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <div className={`${inter.className} bg-gray-200/50`}>
        <FormProvider>{children}</FormProvider>
      </div>
    </div>
  );
}
