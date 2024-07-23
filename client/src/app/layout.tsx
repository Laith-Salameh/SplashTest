import type { Metadata } from "next";
import "./globals.css";
import { SocketProvider } from "@/context/SocketContext";

export const metadata: Metadata = {
  title: "Splash Game",
  description: "This is an assigment for Splash Software LLC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
       <html lang="en">
        <body className="bg-accent lg:px-20 lg:py-4 md:p-12 p-4 min-h-screen">{children}</body>
      </html>
    </SocketProvider>
  );
}
