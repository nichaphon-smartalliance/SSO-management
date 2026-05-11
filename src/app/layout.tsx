import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/context/query";
import { NextAuthProvider } from "@/context/auth";

export const metadata: Metadata = {
  title: "ระบบ SSO Management",
  description: "Single Sign-On Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <NextAuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
